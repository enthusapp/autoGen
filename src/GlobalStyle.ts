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
  span {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
  }

  a {
    text-decoration: none;
  }

  code {
    background-color: #eee;
    border-radius: 3px;
    font-family: 'Courier New';
    font-size: 0.8em;
    padding: 0.1em;
    color: #000
  }

  div.sourceCode {
    background-color: #eee;
    border-radius: 3px;
    padding: 0.2em;
  }

  iframe {
    margin: 0 -10px;
  }
`;

export default GlobalStyle;
