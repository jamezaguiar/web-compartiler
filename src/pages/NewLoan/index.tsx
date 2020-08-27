import React, { useState, useEffect, useCallback } from 'react';

import { FiBookOpen } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import Header from '../../components/Header';
import Button from '../../components/Button';

import { PageTitle, Container, BooksTable } from './styles';

import api from '../../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
}

interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  synopsis: string;
  cover_url: string;
  owner: User;
}

const NewLoan: React.FC = () => {
  const [availableBooks, setAvailableBooks] = useState<Book[]>([{} as Book]);
  const [searchDone, setSearchDone] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    api.get<Book[]>(`/books/listAvailable/${user.id}`).then(response => {
      setAvailableBooks(response.data);
      setSearchDone(true);
    });
  }, [user.id]);

  const handleRequestLoan = useCallback(() => {
    console.log('handleRequestLoan');
  }, []);

  return (
    <>
      <Header />
      <PageTitle>
        Novo <span>empréstimo</span>
      </PageTitle>
      <Container>
        <BooksTable>
          <tr>
            <th>Capa</th>
            <th>Titulo</th>
            <th>Dono</th>
            <th>Solicitar</th>
          </tr>

          {searchDone &&
            availableBooks.map(book => (
              <tr>
                <td>
                  <img src={book.cover_url} alt="Capa do livro" />
                </td>
                <td>
                  <strong>{book.title}</strong>
                </td>
                <td>{book.owner.name}</td>
                <td>
                  <Button>Solicitar</Button>
                </td>
              </tr>
            ))}
        </BooksTable>
      </Container>
    </>
  );
};

export default NewLoan;
