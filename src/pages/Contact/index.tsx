import React from 'react';

import { PageTitle } from './styles';

import Header from '../../components/Header';

const Contact: React.FC = () => {
  return (
    <>
      <Header />
      <PageTitle>
        Entre em <span>contato</span>
      </PageTitle>
    </>
  );
};

export default Contact;
