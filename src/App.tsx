import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useImmer } from 'use-immer';

import Result from './Result';
import InputForm from './InputForm';
import { Inputs } from './Utils';

function App() {
  const [inputs, setInputs] = useImmer<Inputs>({
    colorsMax: '2',
    colorChangeTime: '2.0',
    sceneChangeWaitTime: '2.5',
    colors: ['#ffffff', '#000000'],
  });

  return (
    <Router>
      <div>
        <Result inputs={inputs} />
        <br />
        <InputForm inputs={inputs} setInputs={setInputs} />
      </div>
    </Router>
  );
}

export default App;
