import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useImmer } from 'use-immer';

import Result from './Result';
import InputForm from './InputForm';
import { Inputs } from './Utils';

function App() {
  const [inputs, setInputs] = useImmer<Inputs>({
    sceneMax: '7',
    step: '10',
    wait: '0',
  });

  return (
    <Router>
      <div>
        <Result />
        <br />
        <InputForm inputs={inputs} setInputs={setInputs} />
      </div>
    </Router>
  );
}

export default App;
