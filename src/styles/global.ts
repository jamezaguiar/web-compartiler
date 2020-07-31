import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
    color: #12130F;
  }

  body {
    background: #E8D6CB;
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
  }
`;
