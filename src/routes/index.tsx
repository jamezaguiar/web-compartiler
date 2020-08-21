import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import NewBook from '../pages/NewBook';
import NewWish from '../pages/NewWish';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/cadastrar" component={SignUp} />

    <Route path="/inicio" component={Dashboard} isPrivate />
    <Route path="/novoLivro" component={NewBook} isPrivate />
    <Route path="/novoDesejo" component={NewWish} isPrivate />
  </Switch>
);

export default Routes;
