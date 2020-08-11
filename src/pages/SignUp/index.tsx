import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

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

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório.'),
        email: Yup.string()
          .required('E-mail obrigatório.')
          .email('Digite um e-mail válido.'),
        whatsapp: Yup.string().min(11, 'Ex: 85912345678'),
        password: Yup.string()
          .required('Senha obrigatória.')
          .min(8, 'Sua senha deve ter no mínimo 8 caracteres.'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
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
