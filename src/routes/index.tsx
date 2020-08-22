import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import BookInformation from '../pages/BookInformation';
import NewBook from '../pages/NewBook';
import NewWish from '../pages/NewWish';
import ConfirmNewWish from '../pages/NewWish/ConfirmNewWish';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/cadastrar" component={SignUp} />

    <Route path="/inicio" component={Dashboard} isPrivate />

    <Route path="/livro/:isbn" component={BookInformation} isPrivate />

    <Route path="/novoLivro" component={NewBook} isPrivate />

    <Route path="/novoDesejo" component={NewWish} isPrivate />
    <Route
      path="/confirmarNovoDesejo/:isbn"
      component={ConfirmNewWish}
      isPrivate
    />
  </Switch>
);

export default Routes;
