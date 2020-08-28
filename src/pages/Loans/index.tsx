import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { parseISO, formatRelative } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

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
  status: 'requested' | 'accepted' | 'rejected' | 'delivered' | 'returned';
  received_at: string;
  returned_at: string;
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
  const { addToast } = useToast();

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

  const handleDeliverBook = useCallback(
    async loan_id => {
      try {
        const response = await api.put<Loan>(`/loans/deliverBook/${loan_id}`);
        const book_title = response.data.book.title;
        const requester_name = response.data.requester.name;

        api.get<Loan[]>(`/loans/listUserLoans/${user.id}`).then(res => {
          setUserLoans(res.data);
          setSearchUserLoansDone(true);
        });

        api
          .get<Loan[]>(`/loans/listUserRequestedLoans/${user.id}`)
          .then(res => {
            setUserRequestedLoans(res.data);
            setSearchRequestedLoansDone(true);
          });

        addToast({
          type: 'success',
          title: 'Entregue!',
          description: `Você entregou o livro ${book_title} para ${requester_name}`,
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro',
          description: 'Não foi possível fazer entrega livro, tente novamente',
        });
      }
    },
    [addToast, user.id],
  );
  const handleReceiveBook = useCallback(
    async loan_id => {
      try {
        const response = await api.put<Loan>(`/loans/receiveBook/${loan_id}`);
        const book_title = response.data.book.title;
        const requester_name = response.data.requester.name;

        api.get<Loan[]>(`/loans/listUserLoans/${user.id}`).then(res => {
          setUserLoans(res.data);
          setSearchUserLoansDone(true);
        });

        api
          .get<Loan[]>(`/loans/listUserRequestedLoans/${user.id}`)
          .then(res => {
            setUserRequestedLoans(res.data);
            setSearchRequestedLoansDone(true);
          });

        addToast({
          type: 'success',
          title: 'Recebido!',
          description: `Você recebeu de volta o livro ${book_title} de ${requester_name}`,
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro',
          description: 'Não foi possível receber livro, tente novamente',
        });
      }
    },
    [addToast, user.id],
  );

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
            <th>Ação</th>
          </tr>
          {searchUserLoansDone &&
            userLoans
              .filter(
                loan =>
                  loan.status === 'accepted' || loan.status === 'delivered',
              )
              .map(loan => (
                <tr key={loan.id}>
                  <td>
                    <img src={loan.book.cover_url} alt="Capa do livro" />
                  </td>
                  <td>
                    <strong>{loan.book.title}</strong>
                  </td>
                  <td>
                    <Link to={`/contato/${loan.id}`}>
                      {loan.requester.name}
                    </Link>
                  </td>
                  <td>
                    {loan.received_at &&
                      formatRelative(parseISO(loan.received_at), new Date(), {
                        locale: ptBR,
                      })}
                  </td>
                  <td>
                    <Button
                      hidden={loan.status === 'delivered'}
                      onClick={() => {
                        handleDeliverBook(loan.id);
                      }}
                    >
                      Entreguei
                    </Button>
                    <Button
                      hidden={loan.status === 'returned'}
                      onClick={() => {
                        handleReceiveBook(loan.id);
                      }}
                    >
                      Recebi
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
          </tr>
          {searchRequestedLoansDone &&
            userRequestedLoans
              .filter(
                loan =>
                  loan.status === 'accepted' || loan.status === 'delivered',
              )
              .map(loan => (
                <tr key={loan.id}>
                  <td>
                    <img src={loan.book.cover_url} alt="Capa do livro" />
                  </td>
                  <td>
                    <strong>{loan.book.title}</strong>
                  </td>
                  <td>{loan.book_owner.name}</td>
                  <td>
                    {loan.received_at &&
                      formatRelative(parseISO(loan.received_at), new Date(), {
                        locale: ptBR,
                      })}
                  </td>
                </tr>
              ))}
        </LoansTable>
      </Container>
    </>
  );
};

export default Loans;
