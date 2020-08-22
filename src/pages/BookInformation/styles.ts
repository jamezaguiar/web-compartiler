import styled from 'styled-components';

export const BookContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100vw;
  height: 92vh;

  padding: 16px;

  img {
    height: 75vh;
    margin-right: 8px;
  }
`;

export const BookInfo = styled.div`
  max-width: 70vw;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
      display: flex;
      align-items: center;

      text-decoration: none;
    }
    h1 {
      font-size: 60px;
    }
    svg {
      margin-right: 8px;
    }
  }

  button {
    margin-top: 32px;
  }
`;

export const SynopsisText = styled.p`
  text-align: justify;

  margin-top: 32px;
`;
