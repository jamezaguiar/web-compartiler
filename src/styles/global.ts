import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #E8D6CB;
    -webkit-font-smoothing: antialiased;
  }

  input, button {
    font: 16px 'Open Sans', sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
