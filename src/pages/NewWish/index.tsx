import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from '../../services/api';

import Header from '../../components/Header';
import Button from '../../components/Button';

import { SearchContainer, InputContainer } from './styles';

interface BookStatusDTO {
  success: boolean;
  code: number;
  message?: string;
}

interface BookDataDTO {
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
          }}
        >
          Buscar
        </Button>
      </SearchContainer>
    </>
  );
};

export default NewWish;
