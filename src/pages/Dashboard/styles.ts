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
  justify-content: space-between;

  margin: 16px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    margin-right: 8px;
  }
`;

export const LoanOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;

    color: #ea7317;
    transition: color 0.2s;
    &:hover {
      color: ${shade(0.2, '#ea7317')};
    }
    svg {
      stroke: #ea7317;
      transition: stroke 0.2s;
      &:hover {
        stroke: ${shade(0.2, '#ea7317')};
      }
    }
  }
`;

export const BooksContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 80vh;
  width: 35vw;

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

    height: auto;
    border: 1px solid ${shade(0.1, '#e6e6e6')};
    padding: 8px;

    img {
      height: 64px;
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
  width: 35vw;

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
  justify-content: space-around;

  height: 80vh;
  width: 20vw;

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
