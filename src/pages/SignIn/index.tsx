import React from 'react';

import {
  Container,
  ImageContainer,
  Image,
  CardContainer,
  TextContainer,
} from './styles';

import signInBackgroundImage from '../../assets/reading_time.svg';

const SignIn: React.FC = () => {
  return (
    <Container>
      <ImageContainer>
        <Image src={signInBackgroundImage} alt="Reading Time" />
      </ImageContainer>
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
          <input type="text" name="" id="" placeholder="Email" />
          <input type="text" name="" id="" placeholder="Senha" />
          <button type="submit">Login</button>
        </form>

        <span>Cadastre-se</span>
      </CardContainer>
    </Container>
  );
};

export default SignIn;
