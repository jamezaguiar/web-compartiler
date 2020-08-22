import styled from 'styled-components';
import { shade } from 'polished';

export const SearchContainer = styled.div`
  display: flex;

  align-items: center;

  margin: 16px 16px 0 16px;

  form {
    display: flex;

    width: 100%;

    input {
      flex: 1;
    }
  }

  button {
    width: 150px;
    height: 58px;
    margin: 0 0 0 8px;
  }
`;

export const BooksContainer = styled.div`
  display: flex;
  align-items: center;

  margin: 16px 16px 0 16px;

  overflow: auto;
`;

export const Book = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 400px;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;

    h1 {
      text-align: center;
      margin: 8px 0;
    }

    border: 2px solid #666360;
    min-width: 350px;
    width: auto;
    height: 70vh;

    margin-right: 8px;

    background-color: ${shade(0.075, '#e8d6cb')};
    border-radius: 4px;

    img {
      margin: 8px 0;
      width: 128px;
    }
  }
`;

export const SynopsisText = styled.p`
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  margin: 8px;
`;
