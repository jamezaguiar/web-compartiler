import styled from 'styled-components';
import { shade } from 'polished';

export const PageTitle = styled.h1`
  font-family: 'Merienda One', cursive;
  text-align: center;

  margin: 32px 0;

  span {
    font-family: 'Merienda One', cursive;
    color: #ff3c38;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoansTable = styled.table`
  width: 100%;

  border-collapse: collapse;

  tr {
    background-color: #e6e6e6;
    height: 36px;

    th {
      border: 1px solid #ddd;
      background: #ea7317;
      color: #e6e6e6;
    }

    td {
      border: 1px solid #ddd;
      text-align: center;

      img {
        width: 128px;
        margin: 4px;
      }

      button {
        width: auto;
        padding: 16px;

        margin: 0;

        background: transparent;

        &:hover {
          background-color: transparent;
        }

        svg {
          stroke: #12130f;
        }

        & + button {
          margin-left: 8px;
        }
      }
    }
  }
  tr:nth-child(even) {
    background-color: ${shade(0.075, '#e6e6e6')};
  }
`;
