import React, { useState, useRef, useCallback } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { FiBook } from 'react-icons/fi';

import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/toast';

import { Container, Background, CardContainer, TextContainer } from './styles';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

interface RegisterBookFormData {
  isbn: string;
}

interface Book {
  isbn: string;
  title: string;
  author: string;
  cover_url: string;
  synopsis: string;
}

const NewBook: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: RegisterBookFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          isbn: Yup.string()
            .required('Digite o ISBN do seu livro.')
            .min(10, 'O ISBN pode ter de 10 a 13 dígitos.')
            .max(13, 'O ISBN pode ter de 10 a 13 dígitos.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post<Book>(
          'http://localhost:3333/books/register',
          {
            isbn: data.isbn,
          },
        );

        history.push('/inicio');

        addToast({
          title: 'Livro adicionado com sucesso!',
          type: 'success',
          description: `O livro "${response.data.title}" foi adicionado!`,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no registro',
          description:
            'Ocorreu um erro ao registar livro, verifique o ISBN e tente novamente',
        });
      }
    },
    [addToast],
  );

  return (
    <>
      <Header />
      <Container>
        <Background />
        <CardContainer>
          <TextContainer>
            <p>
              Digite abaixo o ISBN do seu livro. Você pode encontrá-lo conforme
              a imagem ao lado.
            </p>
          </TextContainer>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="isbn" icon={FiBook} placeholder="ISBN do seu livro" />

            <Button type="submit">Registrar</Button>
          </Form>
        </CardContainer>
      </Container>
    </>
  );
};

export default NewBook;
