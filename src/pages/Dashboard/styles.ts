import styled from 'styled-components';
import { shade } from 'polished';

export const Content = styled.div`
  height: 92vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 32px;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 16px 0 16px 0;

  svg {
    margin-right: 8px;
  }
`;

export const BooksContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 80vh;
  width: 30vw;

  padding: 2px;

  border-radius: 8px;

  background-color: #e6e6e6;

  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export const Book = styled.div`
  & + div {
    margin-top: 8px;
  }

  a {
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    text-decoration: none;

    height: 10vh;
    border: 1px solid ${shade(0.1, '#e6e6e6')};
    padding: 8px;

    img {
      height: 100%;
    }

    div {
      margin: 0 8px;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 16px;
        color: #a8a8b3;
      }
    }

    svg {
      margin-left: auto;
    }
  }
`;

export const WishesContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 80vh;
  width: 30vw;

  padding: 2px;

  border-radius: 8px;

  background-color: #e6e6e6;

  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export const LoansContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 80vh;
  width: 30vw;

  padding: 2px;

  border-radius: 8px;

  background-color: #e6e6e6;

  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
