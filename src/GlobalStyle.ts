import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0 auto;
    padding: 10px;
    min-width: 355px;
    max-width: 1024px;
    width: 100%;
    font-size: 100%;
    background: #000;
    color: #fff;
  }

  div,
  span,
  pre {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
  }
`;

export default GlobalStyle;
