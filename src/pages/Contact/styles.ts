import styled from 'styled-components';

export const PageTitle = styled.h1`
  font-family: 'Merienda One', cursive;
  text-align: center;

  margin: 32px 0;

  font-size: 48px;

  span {
    font-family: 'Merienda One', cursive;
    color: #ff3c38;
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    span {
      color: #ff3c38;
    }
  }

  div {
    display: flex;
    align-items: center;

    a {
      text-decoration: none;
      margin-top: 16px;

      button {
        display: flex;
        align-items: center;

        padding: 16px;
        width: auto;

        svg {
          margin-right: 8px;
          fill: #e6e6e6;
        }
      }
      & + a {
        margin-left: 8px;
      }
    }
  }
`;

export const BookContainer = styled.div`
  display: flex;
  align-items: center;

  padding: 16px;

  img {
    height: 50vh;
  }
`;

export const BookInformation = styled.div`
  width: 100%;
  height: auto;

  padding: 16px;

  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

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
      font-size: 48px;
    }
    svg {
      margin-right: 8px;
    }
  }

  p {
    font-size: 24px;
  }
`;
