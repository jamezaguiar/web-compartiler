import styled from 'styled-components';

import isbnExampleImage from '../../assets/isbn-example.png';

export const Container = styled.div`
  height: 92vh;
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

  margin: 32px 32px 32px 0;
  padding: 16px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 90%;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  p {
    font-size: 18px;
    margin-bottom: 16px;
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${isbnExampleImage}) no-repeat center;
  background-size: auto;
`;
