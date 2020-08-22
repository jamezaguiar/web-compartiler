import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';
import Header from '../../components/Header';

import { BookContainer, BookInfo, SynopsisText } from './styles';

import api from '../../services/api';

interface BookInformationParams {
  isbn: string;
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

const BookInformation: React.FC = () => {
  const { params } = useRouteMatch<BookInformationParams>();

  const [book, setBook] = useState<BookDataDTO>({} as BookDataDTO);
  const [searchDone, setSearchDone] = useState(false);

  useEffect(() => {
    api
      .get<APIResponseDTO>(`/externalAPI/searchBookByISBN?isbn=${params.isbn}`)
      .then(response => {
        setBook(response.data.books[0]);
        setSearchDone(true);
      });
  }, [params.isbn]);

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
          <BookInfo>
            <div>
              <h1>{book.titulo}</h1>
              <Link to="/inicio">
                <FiArrowLeft size={20} /> Voltar
              </Link>
            </div>
            <p>{`de ${book.contribuicao[0].nome} ${book.contribuicao[0].sobrenome}`}</p>
            <SynopsisText>
              <strong>Sinopse: </strong>
              <br />
              {book.sinopse}
            </SynopsisText>
          </BookInfo>
        </BookContainer>
      )}
    </>
  );
};

export default BookInformation;
