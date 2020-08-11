import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Container, Background, CardContainer, TextContainer } from './styles';

import { FiUser, FiMail, FiLock, FiSmartphone, FiLogOut } from 'react-icons/fi';

import Button from '../../components/Button';
import Input from '../../components/Input';

interface SignUpFormData {
  name: string;
  email: string;
  whatsapp?: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((data: SignUpFormData) => {
    console.log(data);
  }, []);

  return (
    <Container>
      <CardContainer>
        <TextContainer>
          <h1>
            Comparti<span>ler</span>
          </h1>
          <p>
            Encontre um livro que você quer ler e alguém que queira o emprestar.
            <br></br>
            <span>Saiba mais.</span>
          </p>
        </TextContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="whatsapp"
            icon={FiSmartphone}
            placeholder="Whatsapp (opcional)"
          />
          <Input
            type="password"
            icon={FiLock}
            name="password"
            placeholder="Senha"
          />
          <Button type="submit">Cadastre-se</Button>
        </Form>

        <Link to="/">
          <FiLogOut size={20} />
          Voltar
        </Link>
      </CardContainer>
      <Background />
    </Container>
  );
};

export default SignUp;
