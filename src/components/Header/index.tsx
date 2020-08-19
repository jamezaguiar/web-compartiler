import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FiUser } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import {
  Container,
  TextLogo,
  InfoContainer,
  PopoverContent,
  Option,
} from './styles';
import Popover from 'react-tiny-popover';

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
          <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
            <FiUser color="#e6e6e6" size={20} />
          </div>
        </Popover>
      </InfoContainer>
    </Container>
  );
};

export default Header;
