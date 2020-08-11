import React from 'react';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <>
      <h1>Bem-vindo, {user.name}</h1>
      <p>Algumas informações sobre você:</p>
      <p>
        <strong>E-mail: </strong>
        {user.email}
      </p>
      <p>
        <strong>Whatsapp: </strong>
        {user.whatsapp}
      </p>
      <p>
        <strong>ID: </strong>
        {user.id}
      </p>
    </>
  );
};

export default Dashboard;
