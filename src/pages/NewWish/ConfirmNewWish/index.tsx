import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import Header from '../../../components/Header';

interface BookParams {
  isbn: string;
}

const ConfirmNewWish: React.FC = () => {
  const { params } = useRouteMatch<BookParams>();

  return (
    <>
      <Header />
      <h1>{params.isbn}</h1>
    </>
  );
};
export default ConfirmNewWish;
