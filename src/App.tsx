import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useImmer } from 'use-immer';

import Result from './Result';
import InputForm from './InputForm';
import { Inputs } from './Utils';

function App() {
  const [inputs, setInputs] = useImmer<Inputs>({
    colorsMax: '7',
    changeTime: '2.5',
    waitTime: '1.0',
    colors: [
      [255, 255, 255],
      [0, 0, 0],
    ],
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
