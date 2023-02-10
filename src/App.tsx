import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Result from './Result';
import InputForm from './InputForm';

function App() {
  return (
    <Router>
      <div>
        <Result />
        <br />
        <InputForm />
      </div>
    </Router>
  );
}

export default App;
