import React from 'react';

import Header from '../../components/Header';

import { PageTitle } from './styles';

const NewLoan: React.FC = () => {
  return (
    <>
      <Header />
      <PageTitle>
        Novo <span>empréstimo</span>
      </PageTitle>
    </>
  );
};

export default NewLoan;
