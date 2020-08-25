import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';

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
}

const LoansRequests: React.FC = () => {
  const { params } = useRouteMatch<LoansRequestsParams>();

  const [loans, setLoans] = useState<Loan[]>([{} as Loan]);
  const [searchDone, setSearchDone] = useState(false);

  useEffect(() => {
    api
      .get<Loan[]>(`/loans/requestedLoans/${params.user_id}`)
      .then(response => {
        console.log(response.data);
        setLoans(response.data);
        setSearchDone(true);
      });
  }, [params.user_id]);

  return (
    <>
      <Header />
      {searchDone &&
        loans.map(loan => <h1 key={loan.id}>{loan.book.title}</h1>)}
    </>
  );
};

export default LoansRequests;
