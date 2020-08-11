import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { Container, TextLogo, InfoContainer } from './styles';

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <TextLogo>
        <Link to="/inicio">
          <h1>Compartiler</h1>
        </Link>
      </TextLogo>
      <InfoContainer>{user.name}</InfoContainer>
    </Container>
  );
};

export default Header;
