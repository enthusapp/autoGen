import React, { useState } from 'react';
import { getId } from './Utils';

function InputForm() {
  const [sceneMax, setSceneMax] = useState('7');
  const [step, setStep] = useState('10');
  const [wait, setWait] = useState('0');

  const stepTime = Number(step) * 0.25;

  return (
    <div>
      <h2>입력</h2>
      <h3>Dimming 밝기가 1 단계씩 높아지는 시간</h3>
      <select
        name="step"
        value={step}
        onChange={({ target: { value } }) => setStep(value)}
      >
        {Array.from({ length: 255 }).map((_, i) => (
          <option key={getId()}>{i + 1}</option>
        ))}
      </select>
      <p>{`${step} X 0.25s = ${stepTime} 초`}</p>
      <h3>Scene 전환 대기 시간</h3>
      <select
        name="wait"
        value={wait}
        onChange={({ target: { value } }) => setWait(value)}
      >
        {Array.from({ length: 255 }).map((_, i) => (
          <option key={getId()}>{i}</option>
        ))}
      </select>
      <p>{`${wait} X ${stepTime}s = ${Number(wait) * stepTime} 초`}</p>
      <h3>Scene 개수</h3>
      <select
        value={sceneMax}
        onChange={({ target: { value } }) => setSceneMax(value)}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <option key={getId()}>{i + 1}</option>
        ))}
      </select>
      <h3>Scene</h3>
      {Array.from({ length: Number(sceneMax) }).map(() => (
        <div>
          <input name="color" key={getId()} type="color" />
        </div>
      ))}
    </div>
  );
}

export default InputForm;
