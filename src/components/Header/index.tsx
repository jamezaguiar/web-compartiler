import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FiUser } from 'react-icons/fi';

import Popover from 'react-tiny-popover';
import { IconContext } from 'react-icons';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import {
  Container,
  TextLogo,
  InfoContainer,
  PopoverContent,
  PopoverButton,
  Option,
} from './styles';

const Header: React.FC = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { user, signOut } = useAuth();
  const { addToast } = useToast();

  return (
    <Container>
      <TextLogo>
        <Link to="/inicio">
          <h1>Compartiler</h1>
        </Link>
      </TextLogo>
      <InfoContainer>
        <p>{user.name}</p>
        <Popover
          isOpen={isPopoverOpen}
          position={['bottom', 'right']}
          content={
            <PopoverContent>
              <Option>
                <Link to="/historico">Histórico</Link>
              </Option>
              <Option
                onClick={() => {
                  signOut();
                  addToast({
                    title: 'Você saiu.',
                    type: 'info',
                    description: 'Leia muitos livros enquanto está fora.',
                  });
                }}
              >
                Sair
              </Option>
            </PopoverContent>
          }
        >
          <PopoverButton onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
            <FiUser size={24} color="#e6e6e6" />
          </PopoverButton>
        </Popover>
      </InfoContainer>
    </Container>
  );
};

export default Header;
