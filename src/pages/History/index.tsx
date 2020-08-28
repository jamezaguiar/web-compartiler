import React, { useState, useEffect, useCallback } from 'react';

import { parseISO, formatRelative } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { useAuth } from '../../hooks/auth';

import Header from '../../components/Header';

import { PageTitle, Container, LoansTable } from './styles';

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

interface APIResponse {
  loansByUser: Loan[];
  loansForUser: Loan[];
}

const History: React.FC = () => {
  const [userLoans, setUserLoans] = useState<APIResponse>({} as APIResponse);
  const [searchDone, setSearchDone] = useState(false);

  const { user } = useAuth();

  const formatLoanStatus = useCallback((status: string) => {
    switch (status) {
      case 'requested':
        return 'Requisitado';
      case 'accepted':
        return 'Aceito';
      case 'rejected':
        return 'Rejeitado';
      case 'delivered':
        return 'Entregue';
      case 'returned':
        return 'Devolvido';
      default:
        return null;
    }
  }, []);

  useEffect(() => {
    api
      .get<APIResponse>(`/loans/listUserAllLoans/${user.id}`)
      .then(response => {
        setUserLoans(response.data);
        setSearchDone(true);
      });
  }, [user.id]);

  return (
    <>
      <Header />
      <PageTitle>
        Histórico de <span>empréstimos</span>
      </PageTitle>
      <Container>
        <h2>Pedidos</h2>
        <LoansTable>
          <tr>
            <th>Capa</th>
            <th>Titulo</th>
            <th>Dono</th>
            <th>Resposta</th>
            <th>Recebido em</th>
            <th>Entregue em</th>
          </tr>
          {searchDone &&
            userLoans.loansByUser.map(loan => (
              <tr>
                <td>
                  <img src={loan.book.cover_url} alt="Capa do livro" />
                </td>
                <td>{loan.book.title}</td>
                <td>{loan.book_owner.name}</td>
                <td>{formatLoanStatus(loan.status)}</td>
                <td>{loan.received_at}</td>
                <td>{loan.returned_at}</td>
              </tr>
            ))}
        </LoansTable>
      </Container>
      <Container>
        <h2>Emprestados</h2>
        <LoansTable>
          <tr>
            <th>Capa</th>
            <th>Titulo</th>
            <th>Para</th>
            <th>Resposta</th>
            <th>Entregue em</th>
            <th>Recebido em</th>
          </tr>
          {searchDone &&
            userLoans.loansForUser.map(loan => (
              <tr>
                <td>
                  <img src={loan.book.cover_url} alt="Capa do livro" />
                </td>
                <td>{loan.book.title}</td>
                <td>{loan.requester.name}</td>
                <td>{formatLoanStatus(loan.status)}</td>
                <td>
                  {loan.received_at &&
                    formatRelative(parseISO(loan.received_at), new Date(), {
                      locale: ptBR,
                    })}
                </td>
                <td>
                  {loan.returned_at &&
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

export default History;
