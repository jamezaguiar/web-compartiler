import React, { useEffect, useState, useCallback } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';
import { useToast } from '../../../hooks/toast';

import Header from '../../../components/Header';
import Button from '../../../components/Button';
import { BookContainer, BookInformation, SynopsisText } from './styles';

import api from '../../../services/api';

interface NewWishParams {
  isbn: string;
}

interface Book {
  isbn: string;
  title: string;
  author: string;
  cover_url: string;
  synopsis: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Wish {}

interface RegisterWishResponseDTO {
  wish: Wish;
  book: Book;
}

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

const ConfirmNewWish: React.FC = () => {
  const { params } = useRouteMatch<NewWishParams>();

  const [book, setBook] = useState<BookDataDTO>({} as BookDataDTO);
  const [searchDone, setSearchDone] = useState(false);

  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    api
      .get<APIResponseDTO>(`/externalAPI/searchBookByISBN?isbn=${params.isbn}`)
      .then(response => {
        setBook(response.data.books[0]);
        setSearchDone(true);
      });
  }, [params.isbn]);

  const handleAddBookAsANewWish = useCallback(async () => {
    try {
      const response = await api.post<RegisterWishResponseDTO>(
        '/wishes/register',
        {
          isbn: params.isbn,
        },
      );

      addToast({
        type: 'success',
        title: 'Livro registrado com sucesso',
        description: `O livro "${response.data.book.title}" foi adicionado a sua lista de desejos!`,
      });

      history.push('/inicio');
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao registrar livro',
        description:
          'Não foi possível adicionar livro a sua lista de desejos, tente novamente.',
      });
    }
  }, [addToast, history, params.isbn]);

  return (
    <>
      <Header />
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
            <div>
              <h1>{book.titulo}</h1>
              <Link to="/novoDesejo">
                <FiArrowLeft size={20} /> Voltar
              </Link>
            </div>
            <p>{`de ${book.contribuicao[0].nome} ${book.contribuicao[0].sobrenome}`}</p>
            <SynopsisText>
              <strong>Sinopse: </strong>
              <br />
              {book.sinopse}
            </SynopsisText>
            <Button onClick={handleAddBookAsANewWish}>Adicionar</Button>
          </BookInformation>
        </BookContainer>
      )}
    </>
  );
};
export default ConfirmNewWish;
