import React from 'react';

import { Container, Background, CardContainer, TextContainer } from './styles';

import { FiMail, FiLock } from 'react-icons/fi';

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

        <span>Cadastre-se</span>
      </CardContainer>
    </Container>
  );
};

export default SignIn;
