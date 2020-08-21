import React, { useState } from 'react';
import api from '../../services/api';

import Header from '../../components/Header';

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
      <input
        type="text"
        placeholder="titulo do livro"
        value={searchTitle}
        onChange={event => {
          setSearchTitle(event.target.value);
        }}
      />
      <button
        type="submit"
        onClick={async () => {
          const response = await api.get(
            `/externalAPI/searchBooksByTitle?title=${searchTitle}`,
          );

          setFetchedBooks(response.data);
        }}
      >
        Buscar
      </button>
    </>
  );
};

export default NewWish;
