import styled from 'styled-components';
import { shade } from 'polished';

import signInBackgroundImage from '../../assets/friends_online.svg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 500px;

  background-color: #fff;

  border: 4px solid #e6e6e6;
  border-radius: 16px;

  margin: 32px 0px 32px 32px;
  padding: 16px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 90%;
  }

  a {
    display: flex;
    align-items: center;
    font-weight: 600;
    text-decoration: none;

    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#12130F')};
    }

    > svg {
      margin-right: 8px;
    }
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  h1 {
    font-size: 40px;
    font-family: 'Merienda One', cursive;

    span {
      font-family: 'Merienda One', cursive;
      color: #ff3c38;
    }
  }
  p {
    font-size: 18px;
    margin-top: 2px;

    span {
      cursor: pointer;
      font-size: 12px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImage}) no-repeat center;
  background-size: cover;
`;
