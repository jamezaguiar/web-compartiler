import React, { useState, useEffect, useCallback } from 'react';

import { useAuth } from '../../hooks/auth';

import Header from '../../components/Header';
import Button from '../../components/Button';

import { Container, LoansTable, PageTitle } from './styles';

import api from '../../services/api';

interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  synopsis: string;
  cover_url: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  whatsapp?: string;
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

const Loans: React.FC = () => {
  const [userLoans, setUserLoans] = useState<Loan[]>([{} as Loan]);
  const [userRequestedLoans, setUserRequestedLoans] = useState<Loan[]>([
    {} as Loan,
  ]);
  const [searchUserLoansDone, setSearchUserLoansDone] = useState(false);
  const [searchRequestedLoansDone, setSearchRequestedLoansDone] = useState(
    false,
  );

  const { user } = useAuth();

  useEffect(() => {
    api.get<Loan[]>(`/loans/listUserLoans/${user.id}`).then(response => {
      setUserLoans(response.data);
      setSearchUserLoansDone(true);
    });
  }, [user.id]);

  useEffect(() => {
    api
      .get<Loan[]>(`/loans/listUserRequestedLoans/${user.id}`)
      .then(response => {
        setUserRequestedLoans(response.data);
        setSearchRequestedLoansDone(true);
      });
  }, [user.id]);

  const handleReceiveBook = useCallback(() => {
    // TODO
  }, []);
  const handleReturnBook = useCallback(() => {
    // TODO
  }, []);

  return (
    <>
      <Header />
      <PageTitle>
        Livros que <span>emprestei</span>
      </PageTitle>
      <Container>
        <LoansTable>
          <tr>
            <th>Capa</th>
            <th>Titulo</th>
            <th>Pedido por</th>
            <th>Entregue</th>
            <th>Devolvido</th>
            <th>Ação</th>
          </tr>
          {searchUserLoansDone &&
            userLoans
              .filter(loan => loan.status === 'accepted')
              .map(loan => (
                <tr key={loan.id}>
                  <td>
                    <img src={loan.book.cover_url} alt="Capa do livro" />
                  </td>
                  <td>
                    <strong>{loan.book.title}</strong>
                  </td>
                  <td>{loan.requester.name}</td>
                  <td>{loan.received_at}</td>
                  <td>{loan.returned_at}</td>
                  <td>
                    <Button
                      onClick={() => {
                        console.log('handleReceiveBook');
                      }}
                    >
                      Recebido
                    </Button>
                  </td>
                </tr>
              ))}
        </LoansTable>
      </Container>
      <PageTitle>
        Livros que <span>peguei emprestado</span>
      </PageTitle>
      <Container>
        <LoansTable>
          <tr>
            <th>Capa</th>
            <th>Titulo</th>
            <th>Dono</th>
            <th>Recebi</th>
            <th>Devolvi</th>
            <th>Ação</th>
          </tr>
          {searchRequestedLoansDone &&
            userRequestedLoans
              .filter(loan => loan.status === 'accepted')
              .map(loan => (
                <tr key={loan.id}>
                  <td>
                    <img src={loan.book.cover_url} alt="Capa do livro" />
                  </td>
                  <td>
                    <strong>{loan.book.title}</strong>
                  </td>
                  <td>{loan.requester.name}</td>
                  <td>{loan.received_at}</td>
                  <td>{loan.returned_at}</td>
                  <td>
                    <Button
                      onClick={() => {
                        console.log('handleReturnBook');
                      }}
                    >
                      Devolver
                    </Button>
                  </td>
                </tr>
              ))}
        </LoansTable>
      </Container>
    </>
  );
};

export default Loans;
