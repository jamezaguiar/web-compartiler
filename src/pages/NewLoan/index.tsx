import React, { useState, useEffect, useCallback } from 'react';

import { FiBookOpen } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

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

interface Loan {
  id: string;
  requester_id: string;
  book_owner_id: string;
  book_isbn: string;
  book_id: string;
  status: 'accepted' | 'rejected' | 'returned' | 'requested';
  received_at: Date;
  returned_at: Date;
  book: Book;
  book_owner: User;
  requester: User;
}

interface RequestLoanResponseDTO {
  book: Book;
  loan: Loan;
}

const NewLoan: React.FC = () => {
  const [availableBooks, setAvailableBooks] = useState<Book[]>([{} as Book]);
  const [searchDone, setSearchDone] = useState(false);

  const { user } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    api.get<Book[]>(`/books/listAvailable/${user.id}`).then(response => {
      setAvailableBooks(response.data);
      setSearchDone(true);
    });
  }, [user.id]);

  const handleRequestLoan = useCallback(
    async (book_isbn, book_owner_id, book_owner_name) => {
      try {
        const response = await api.post<RequestLoanResponseDTO>(
          '/loans/request',
          {
            book_isbn,
            book_owner_id,
            requester_id: user.id,
          },
        );

        addToast({
          type: 'success',
          title: 'Solicitação feita',
          description: `Você solicitou o livro "${response.data.book.title}", aguarde a resposta de ${book_owner_name}.`,
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Algo deu errado',
          description:
            'Não conseguimos fazer a solicitação do livro, tente novamente.',
        });
      }
    },
    [addToast, user.id],
  );

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
                  <Button
                    onClick={() => {
                      handleRequestLoan(
                        book.isbn,
                        book.owner.id,
                        book.owner.name,
                      );
                    }}
                  >
                    Solicitar
                  </Button>
                </td>
              </tr>
            ))}
        </BooksTable>
      </Container>
    </>
  );
};

export default NewLoan;
