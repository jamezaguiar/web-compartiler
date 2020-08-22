import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from '../../services/api';

import Header from '../../components/Header';
import Button from '../../components/Button';

import {
  SearchContainer,
  InputContainer,
  BooksContainer,
  Book,
  SynopsisText,
} from './styles';

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

const NewWish: React.FC = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const [fetchedBooks, setFetchedBooks] = useState<APIResponseDTO>(
    {} as APIResponseDTO,
  );
  const [searchDone, setSearchDone] = useState(false);

  return (
    <>
      <Header />
      <SearchContainer>
        <InputContainer>
          <FiSearch size={20} />
          <input
            type="text"
            placeholder="Digite o titulo do livro que você quer buscar"
            value={searchTitle}
            onChange={event => {
              setSearchTitle(event.target.value);
            }}
          />
        </InputContainer>
        <Button
          type="submit"
          onClick={async () => {
            const response = await api.get(
              `/externalAPI/searchBooksByTitle?title=${searchTitle}`,
            );

            setFetchedBooks(response.data);
            setSearchDone(true);
          }}
        >
          Buscar
        </Button>
      </SearchContainer>
      <BooksContainer>
        {searchDone &&
          fetchedBooks.books.map(book => (
            <Book key={book.isbn}>
              <img
                src={book.imagens.imagem_primeira_capa.grande}
                alt="Capa do livro"
              />
              <h1>{book.titulo}</h1>
              <p>{`${book.contribuicao[0].nome} ${book.contribuicao[0].sobrenome}`}</p>
              <SynopsisText>
                <strong>Sinopse: </strong>
                <br />
                {book.sinopse}
              </SynopsisText>
            </Book>
          ))}
      </BooksContainer>
    </>
  );
};

export default NewWish;
