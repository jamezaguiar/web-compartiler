import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Background, CardContainer, TextContainer } from './styles';

import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

import Button from '../../components/Button';
import Input from '../../components/Input';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Background />
      <CardContainer>
        <TextContainer>
          <h1>
            Comparti<span>ler</span>
          </h1>
          <p>
            Ajude pessoas a adquirirem conhecimento através dos livros.<br></br>
            <span>Saiba mais.</span>
          </p>
        </TextContainer>
        <form action="">
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            type="password"
            icon={FiLock}
            name="password"
            placeholder="Senha"
          />
          <Button>Login</Button>
        </form>

        <Link to="/signup">
          <FiLogIn />
          Cadastre-se
        </Link>
      </CardContainer>
    </Container>
  );
};

export default SignIn;
