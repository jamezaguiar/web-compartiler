import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { Link } from 'react-router-dom';

import {
  FiChevronRight,
  FiBook,
  FiBookmark,
  FiShare2,
  FiPlus,
  FiBell,
} from 'react-icons/fi';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Header from '../../components/Header';

import {
  Content,
  Title,
  BooksContainer,
  Book,
  WishesContainer,
  LoansContainer,
  LoanOption,
} from './styles';

interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  synopsis: string;
  cover_url: string;
  borrowed: boolean;
  owner_id: string;
}

interface WishInfo {
  id: string;
  book_isbn: string;
  requester_id: string;
}

interface Wish {
  wish: WishInfo;
  book: {
    isbn: string;
    title: string;
    author: string;
    synopsis: string;
    cover_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [possibleLoans, setPossibleLoans] = useState<Book[]>([]);

  const { user } = useAuth();
  const { id, name } = user;

  const { addToast } = useToast();

  useEffect(() => {
    const socket = socketio('http://localhost:3333', {
      query: { id, name },
    });

    socket.on('check_possible_loans', (data: Book[]) => {
      setPossibleLoans(data);
    });
  }, []);

  useEffect(() => {
    api
      .get<Book[]>(`/books/list/${user.id}`)
      .then(response => {
        setBooks(response.data);
      })
      .catch(() => {
        addToast({
          title: 'Erro',
          type: 'error',
          description: 'Algo deu errado, tente novamente.',
        });
      });
  }, [addToast, user.id]);

  useEffect(() => {
    api
      .get<Wish[]>(`/wishes/list/${user.id}`)
      .then(response => {
        setWishes(response.data);
      })
      .catch(() => {
        addToast({
          title: 'Erro',
          type: 'error',
          description: 'Algo deu errado, tente novamente.',
        });
      });
  }, [addToast, user.id]);

  useEffect(() => {
    possibleLoans.forEach(possibility => {
      addToast({
        title: 'Opa!',
        type: 'info',
        description: `Algúem no Compartiler tem o livro "${possibility.title}"!`,
      });
    });
  }, [addToast, possibleLoans]);

  return (
    <>
      <Header />
      <Content>
        <BooksContainer>
          <Title>
            <div>
              <FiBook size={20} />
              <p>Seus livros</p>
            </div>
            <Link to="/novoLivro">
              <FiPlus size={20} />
            </Link>
          </Title>
          {books.map(book => (
            <Book key={book.id}>
              <Link to={`/livro/${book.isbn}`}>
                <img src={book.cover_url} alt="Capa do livro" />
                <div>
                  <strong>{book.title}</strong>
                  <p>{book.author}</p>
                </div>

                <FiChevronRight size={20} />
              </Link>
            </Book>
          ))}
        </BooksContainer>
        <WishesContainer>
          <Title>
            <div>
              <FiBookmark size={20} />
              <p>Sua lista de desejos</p>
            </div>
            <Link to="/novoDesejo">
              <FiPlus size={20} />
            </Link>
          </Title>
          {wishes.map(wish => (
            <Book key={wish.book.isbn}>
              <Link to={`/livro/${wish.book.isbn}`}>
                <img src={wish.book.cover_url} alt="Capa do livro" />
                <div>
                  <strong>{wish.book.title}</strong>
                  <p>{wish.book.author}</p>
                </div>

                <FiChevronRight size={20} />
              </Link>
            </Book>
          ))}
        </WishesContainer>
        <LoansContainer>
          <LoanOption>
            <Link to="/novoEmprestimo">
              <FiPlus size={64} />
              Novo empréstimo
            </Link>
          </LoanOption>
          <LoanOption>
            <Link to="/solicitacoesDeEmprestimos">
              <FiBell size={64} />
              Solicitações
            </Link>
          </LoanOption>
          <LoanOption>
            <Link to="/livrosEmprestados">
              <FiShare2 size={64} />
              Emprestados
            </Link>
          </LoanOption>
        </LoansContainer>
      </Content>
    </>
  );
};

export default Dashboard;
