import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  width: 100%;
  height: 48px;

  margin-top: 8px;

  font-size: 18px;

  border: none;
  border-radius: 8px;

  background-color: #ff3c38;
  color: #fff;

  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff3c38')};
  }
`;
