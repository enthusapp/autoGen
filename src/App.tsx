import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useImmer } from 'use-immer';

import Result from './Result';
import InputForm from './InputForm';
import { Inputs } from './Utils';
import Description from './Description';

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
      <Description />
      <InputForm inputs={inputs} setInputs={setInputs} />
      <Result inputs={inputs} />
    </Router>
  );
}

export default App;
