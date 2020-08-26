import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import api from '../../services/api';

import { PageTitle, ContactInfo, BookInfo } from './styles';

import Header from '../../components/Header';
import Button from '../../components/Button';

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
          <ContactInfo>
            <h1>
              Fale com <span>{loan.requester.name}</span> através de
            </h1>
            <div>
              <a
                href={`mailto:${loan.requester.email}?subject=Empréstimo%20confirmado!&body=Onde%20nos%20encontraremos%20para%20Compartiler?`}
                target="blank"
              >
                <Button>
                  <FaEnvelope size={20} />
                  E-mail
                </Button>
              </a>
              {loan.requester.whatsapp && (
                <a
                  href={`https://api.whatsapp.com/send?phone=${loan.requester.whatsapp}`}
                  target="blank"
                >
                  <Button>
                    <FaWhatsapp size={20} />
                    Whatsapp
                  </Button>
                </a>
              )}
            </div>
          </ContactInfo>
          <BookInfo>
            <h1>{loan.book.title}</h1>
          </BookInfo>
        </div>
      )}
    </>
  );
};

export default Contact;
