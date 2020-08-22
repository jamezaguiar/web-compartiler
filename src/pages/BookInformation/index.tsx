import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import Header from '../../components/Header';

interface BookInformationParams {
  isbn: string;
}

const BookInformation: React.FC = () => {
  const { params } = useRouteMatch<BookInformationParams>();

  return (
    <>
      <Header />
      <h1>Book ISBN: {params.isbn}</h1>
    </>
  );
};

export default BookInformation;
