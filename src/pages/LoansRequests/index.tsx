import React, { useEffect, useState, useCallback } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import Header from '../../components/Header';
import Button from '../../components/Button';

import { PageTitle, Container, LoansTable } from './styles';

interface LoansRequestsParams {
  user_id: string;
}

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

const LoansRequests: React.FC = () => {
  const { params } = useRouteMatch<LoansRequestsParams>();
  const history = useHistory();

  const [loans, setLoans] = useState<Loan[]>([{} as Loan]);
  const [searchDone, setSearchDone] = useState(false);

  const { addToast } = useToast();

  useEffect(() => {
    api
      .get<Loan[]>(`/loans/requestedLoans/${params.user_id}`)
      .then(response => {
        setLoans(response.data);
        setSearchDone(true);
      });
  }, [params.user_id]);

  const handleAcceptLoan = useCallback(
    async loan_id => {
      await api.put(`/loans/acceptLoan/${loan_id}`);

      api
        .get<Loan[]>(`/loans/requestedLoans/${params.user_id}`)
        .then(response => {
          setLoans(response.data);
          setSearchDone(true);
        });

      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: 'Redirecionar usuário para página de contato.',
      });
    },
    [addToast, params.user_id],
  );

  const handleRejectLoan = useCallback(
    async loan_id => {
      try {
        await api.put(`/loans/rejectLoan/${loan_id}`);

        api
          .get<Loan[]>(`/loans/requestedLoans/${params.user_id}`)
          .then(response => {
            setLoans(response.data);
            setSearchDone(true);
          });

        addToast({
          type: 'info',
          title: 'Rejeitado',
          description: 'Empréstimo rejeitado.',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro',
          description: 'Não foi possível rejeitar empréstimo, tente novamente.',
        });
      }
    },
    [addToast, params.user_id],
  );

  return (
    <>
      <Header />
      <PageTitle>
        Solicitações de <span>empréstimos</span>
      </PageTitle>
      <Container>
        <LoansTable>
          <tr>
            <th>Capa</th>
            <th>Titulo</th>
            <th>Pedido por:</th>
            <th>Resposta</th>
          </tr>
          {searchDone &&
            loans
              .filter(loan => loan.status === 'requested')
              .map(loan => (
                <tr key={loan.id}>
                  <td>
                    <img src={loan.book.cover_url} alt="Capa do livro" />
                  </td>
                  <td>
                    <strong>{loan.book.title}</strong>
                  </td>
                  <td>{loan.requester.name}</td>
                  <td>
                    <Button
                      onClick={() => {
                        handleAcceptLoan(loan.id);
                      }}
                    >
                      <FiCheckCircle size={24} style={{ stroke: '#3CB371' }} />
                    </Button>
                    <Button
                      onClick={() => {
                        handleRejectLoan(loan.id);
                      }}
                    >
                      <FiXCircle size={24} style={{ stroke: '#DC143C' }} />
                    </Button>
                  </td>
                </tr>
              ))}
        </LoansTable>
      </Container>
    </>
  );
};

export default LoansRequests;
