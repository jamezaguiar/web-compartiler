import styled from 'styled-components';

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

export const BookContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100vw;
  height: 80vh;

  padding: 16px;

  img {
    height: 75vh;
    margin-right: 8px;
  }
`;

export const BookInformation = styled.div`
  max-width: 70vw;
  max-height: 92vh;

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
      font-size: 60px;
    }
    svg {
      margin-right: 8px;
    }
  }

  button {
    margin-top: 32px;
    margin-bottom: 16px;
  }
`;

export const SynopsisText = styled.p`
  text-align: justify;

  margin-top: 32px;
`;
