import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useImmer } from 'use-immer';
import styled from 'styled-components';

import Result from './Result';
import InputForm from './InputForm';
import { Inputs } from './Utils';
import Description from './Description';

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  const [inputs, setInputs] = useImmer<Inputs>({
    colorsMax: '6',
    colorChangeTime: '2.0',
    sceneChangeWaitTime: '2.5',
    colors: ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff'],
    white: 'X',
  });

  return (
    <Router>
      <Page>
        <Description />
        <InputForm inputs={inputs} setInputs={setInputs} />
        <Result inputs={inputs} />
      </Page>
    </Router>
  );
}

export default App;
