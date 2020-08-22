import React, { useState, useRef, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { FiSearch } from 'react-icons/fi';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/toast';

import {
  SearchContainer,
  SynopsisText,
  BookContainer,
  BookInformation,
} from './styles';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

interface BookStatusDTO {
  success: boolean;
  code: number;
  message?: string;
}

interface BookDataDTO {
  isbn: string;
  titulo: string;
  contribuicao: [
    {
      nome: string;
      sobrenome: string;
      tipo_de_contribuicao: string;
      codigo_contribuicao: string;
    },
  ];
  sinopse: string;
  imagens: {
    imagem_primeira_capa: {
      pequena: string;
      media: string;
      grande: string;
    };
  };
}

interface APIResponseDTO {
  books: BookDataDTO[];
  status: BookStatusDTO;
}

interface RegisterBookFormData {
  isbn: string;
}

interface Book {
  isbn: string;
  title: string;
  author: string;
  cover_url: string;
  synopsis: string;
}

const NewBook: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const { addToast } = useToast();

  const [book, setBook] = useState<BookDataDTO>({} as BookDataDTO);

  const [searchDone, setSearchDone] = useState(false);

  const handleSubmit = useCallback(
    async (data: RegisterBookFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          isbn: Yup.string()
            .required('Digite o ISBN do seu livro.')
            .min(10, 'O ISBN pode ter de 10 a 13 dígitos.')
            .max(13, 'O ISBN pode ter de 10 a 13 dígitos.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.get<APIResponseDTO>(
          `/externalAPI/searchBookByISBN?isbn=${data.isbn}`,
        );

        if (!response.data.status.success) {
          addToast({
            type: 'error',
            title: 'Livro não encontrado',
            description:
              'Não foram encontrados nenhum livro com esse ISBN, tente novamente.',
          });

          return;
        }

        setBook(response.data.books[0]);
        setSearchDone(true);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na busca',
          description:
            'Ocorreu um erro ao buscar livro, verifique o ISBN e tente novamente.',
        });
      }
    },
    [addToast],
  );

  return (
    <>
      <Header />
      <SearchContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="isbn"
            placeholder="Digite o ISBN do livro que você quer buscar"
            icon={FiSearch}
          />
          <Button type="submit">Buscar</Button>
        </Form>
      </SearchContainer>
      {searchDone && (
        <BookContainer>
          <img
            src={
              book.imagens.imagem_primeira_capa &&
              book.imagens.imagem_primeira_capa.grande
            }
            alt="Capa do livro"
          />
          <BookInformation>
            <h1>{book.titulo}</h1>
            <p>{`de ${book.contribuicao[0].nome} ${book.contribuicao[0].sobrenome}`}</p>
            <SynopsisText>
              <strong>Sinopse: </strong>
              <br />
              {book.sinopse}
            </SynopsisText>
            <Button
              onClick={() => {
                console.log('handleAddBookAsANewWish');
              }}
            >
              Adicionar
            </Button>
          </BookInformation>
        </BookContainer>
      )}
    </>
  );
};

export default NewBook;
