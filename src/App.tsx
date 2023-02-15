import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useImmer } from 'use-immer';

import Result from './Result';
import InputForm from './InputForm';
import { Inputs } from './Utils';
import Description from './Description';

function App() {
  const [search] = useSearchParams();
  const colorsMax = search.get('colorsMax') || '6';
  const colorArray = search.getAll('color');
  const colors =
    colorArray.length > 0
      ? Array.from({ length: Number(colorsMax) }).map(
          (_, i) => colorArray[i] || '#000000',
        )
      : ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff'];

  const whiteArray = search.getAll('white');
  const whites =
    whiteArray.length > 0
      ? Array.from({ length: Number(colorsMax) }).map(
          (_, i) => whiteArray[i] || '255',
        )
      : ['255', '255', '255', '255', '255', '255'];

  const [inputs, setInputs] = useImmer<Inputs>({
    colorsMax,
    colorChangeTime: search.get('colorChangeTime') || '2.0',
    sceneChangeWaitTime: search.get('sceneChangeWaitTime') || '2.5',
    colors,
    use4ChannelWhite: !!search.get('use4ChannelWhite'),
    whites,
  });

  return (
    <>
      <Description />
      <InputForm inputs={inputs} setInputs={setInputs} />
      <Result inputs={inputs} />
    </>
  );
}

export default App;
