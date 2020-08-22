import styled from 'styled-components';
import { shade } from 'polished';

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;

  margin: 16px 16px 0 16px;

  button {
    width: 150px;
    height: 58px;
    margin-top: 0;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;

  padding: 16px;
  margin-right: 16px;

  background: ${shade(0.075, '#e8d6cb')};

  color: #12130f;

  border-radius: 8px;
  border: 2px solid #12130f;

  input {
    flex: 1;

    background: transparent;

    border: 0;

    color: #12130f;

    font-size: 16px;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
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

  border: 2px solid #666360;
  min-width: 25vw;
  max-width: 25vw;
  height: 70vh;

  margin-right: 8px;

  background-color: ${shade(0.075, '#e8d6cb')};
  border-radius: 4px;

  img {
    margin: 8px 0;
    width: 128px;
  }
`;

export const SynopsisText = styled.p`
  overflow: hidden;

  text-overflow: ellipsis;

  margin: 4px;
`;
