import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Container, Background, CardContainer, TextContainer } from './styles';

import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

import Button from '../../components/Button';
import Input from '../../components/Input';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((data: SignInFormData) => {
    console.log(data);
  }, []);

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
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            type="password"
            icon={FiLock}
            name="password"
            placeholder="Senha"
          />
          <Button type="submit">Login</Button>
        </Form>

        <Link to="/signup">
          <FiLogIn size={20} />
          Cadastre-se
        </Link>
      </CardContainer>
    </Container>
  );
};

export default SignIn;
