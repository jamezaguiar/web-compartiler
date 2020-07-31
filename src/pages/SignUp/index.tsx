import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Background, CardContainer, TextContainer } from './styles';

import { FiUser, FiMail, FiLock, FiSmartphone, FiLogOut } from 'react-icons/fi';

import Button from '../../components/Button';
import Input from '../../components/Input';

const SignUp: React.FC = () => {
  return (
    <Container>
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
          <Button>Cadastre-se</Button>
        </form>

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
