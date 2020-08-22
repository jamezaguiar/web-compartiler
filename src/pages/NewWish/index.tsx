import React, { useState, useCallback, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { FiSearch } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { SearchContainer, BooksContainer, Book, SynopsisText } from './styles';

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

interface NewWishFormData {
  title: string;
}

const NewWish: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const { addToast } = useToast();

  const [fetchedBooks, setFetchedBooks] = useState<APIResponseDTO>(
    {} as APIResponseDTO,
  );
  const [searchDone, setSearchDone] = useState(false);

  const handleSubmit = useCallback(
    async (data: NewWishFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required(
            'Digite o titulo do livro que quer buscar',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.get<APIResponseDTO>(
          `/externalAPI/searchBooksByTitle?title=${data.title}`,
        );

        if (!response.data.status.success) {
          addToast({
            type: 'error',
            title: 'Livro não encontrado',
            description:
              'Não foram encontrados livros com esse titulo, tente novamente.',
          });

          return;
        }

        setFetchedBooks(response.data);
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
            'Ocorreu um erro ao buscar livro, verifique o titulo e tente novamente.',
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
            name="title"
            placeholder="Digite o titulo do livro que você quer buscar"
            icon={FiSearch}
          />
          <Button type="submit">Buscar</Button>
        </Form>
      </SearchContainer>
      <BooksContainer>
        {searchDone &&
          fetchedBooks.books.map(book => (
            <Book key={book.isbn}>
              <Link to={`/confirmarNovoDesejo/${book.isbn}`}>
                <img
                  src={
                    book.imagens.imagem_primeira_capa &&
                    book.imagens.imagem_primeira_capa.grande
                  }
                  alt="Capa do livro"
                />
                <h1>{book.titulo}</h1>
                <p>{`${book.contribuicao[0].nome} ${book.contribuicao[0].sobrenome}`}</p>
                <SynopsisText>
                  <strong>Sinopse: </strong>
                  <br />
                  {book.sinopse}
                </SynopsisText>
              </Link>
            </Book>
          ))}
      </BooksContainer>
    </>
  );
};

export default NewWish;
