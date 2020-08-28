import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';

import NewBook from '../pages/NewBook';
import BookInformation from '../pages/BookInformation';

import NewWish from '../pages/NewWish';
import ConfirmNewWish from '../pages/NewWish/ConfirmNewWish';

import LoansRequests from '../pages/LoansRequests';
import Contact from '../pages/Contact';
import NewLoan from '../pages/NewLoan';
import Loans from '../pages/Loans';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/cadastrar" component={SignUp} />

    <Route path="/inicio" component={Dashboard} isPrivate />

    <Route path="/novoLivro" component={NewBook} isPrivate />
    <Route path="/livro/:isbn" component={BookInformation} isPrivate />

    <Route path="/novoDesejo" component={NewWish} isPrivate />
    <Route
      path="/confirmarNovoDesejo/:isbn"
      component={ConfirmNewWish}
      isPrivate
    />

    <Route
      path="/solicitacoesDeEmprestimos/:user_id"
      component={LoansRequests}
      isPrivate
    />
    <Route path="/contato/:loan_id" component={Contact} isPrivate />
    <Route path="/novoEmprestimo" component={NewLoan} isPrivate />
    <Route path="/emprestimos" component={Loans} isPrivate />
  </Switch>
);

export default Routes;
