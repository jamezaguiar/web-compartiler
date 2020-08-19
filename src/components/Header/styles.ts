import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 8vh;
  width: 100vw;

  padding: 0 16px;

  background-color: #ea7317;
`;

export const TextLogo = styled.div`
  a {
    text-decoration: none;

    h1 {
      color: #e6e6e6;
      font-family: 'Merienda One', cursive;
      font-size: 24px;
    }
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
  }

  p {
    color: #e6e6e6;
    font-weight: 600;
  }

  svg {
    margin-left: 8px;
    cursor: pointer;
  }
`;

export const PopoverContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PopoverButton = styled.div`
  svg {
    stroke: #e6e6e6;
  }
`;

export const Option = styled.button`
  a {
    text-decoration: none;
    color: #a0a0a0;
    transition: color 0.2s;
    &:hover {
      color: #ea7317;
    }
  }

  font-size: 14px;
  font-weight: 600;

  height: 36px;
  width: 84px;

  border: none;
  border-radius: 2px;

  background-color: #fff;
  color: #a0a0a0;

  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background: #fadecb;
    color: #ea7317;
  }
`;
