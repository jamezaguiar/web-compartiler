import React from 'react';

import Header from '../../components/Header';

import { PageTitle } from './styles';

const History: React.FC = () => {
  return (
    <>
      <Header />
      <PageTitle>
        Histórico de <span>empréstimos</span>
      </PageTitle>
    </>
  );
};

export default History;
