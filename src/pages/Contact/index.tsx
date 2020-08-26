import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

import api from '../../services/api';

import { PageTitle } from './styles';

import Header from '../../components/Header';

interface ContactParams {
  loan_id: string;
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

const Contact: React.FC = () => {
  const { params } = useRouteMatch<ContactParams>();

  const [loan, setLoan] = useState<Loan>({} as Loan);
  const [searchDone, setSearchDone] = useState(false);

  useEffect(() => {
    api.get<Loan>(`/loans/list/${params.loan_id}`).then(response => {
      setLoan(response.data);
      setSearchDone(true);
    });
  }, [params.loan_id]);

  return (
    <>
      <Header />
      <PageTitle>
        Entre em <span>contato</span>
      </PageTitle>
      {searchDone && (
        <div>
          <h1>{loan.requester.name}</h1>
          <h1>{loan.requester.email}</h1>
          <h1>{loan.requester?.whatsapp}</h1>
          <h1>{loan.book.title}</h1>
        </div>
      )}
    </>
  );
};

export default Contact;
