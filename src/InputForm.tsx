import React from 'react';
import { getId, getTimes, Inputs } from './Utils';

interface Props {
  inputs: Inputs;
  setInputs: (e: (draft: Inputs) => void) => void;
}

function InputForm({ inputs, setInputs }: Props) {
  const { zeroToMax, stepTime } = getTimes(inputs);
  const { step, sceneMax, wait } = inputs;

  return (
    <div>
      <h2>입력</h2>
      <h3>Dimming 제로백 시간 단계 설정</h3>
      <select
        name="step"
        value={step}
        onChange={({ target: { value } }) =>
          setInputs((draft) => {
            draft.step = String(value);
          })
        }
      >
        {Array.from({ length: 255 }).map((_, i) => (
          <option key={getId()}>{i + 1}</option>
        ))}
      </select>
      <p>{`제로백 시간: ${step} X 250 ms = ${zeroToMax} ms`}</p>
      <p>{`Dimming 1 단계 변화 시간: ${step} X (250 / 255) ms = ${Math.round(
        stepTime,
      )} ms`}</p>
      <h3>Scene 전환 대기 시간</h3>
      <select
        name="wait"
        value={wait}
        onChange={({ target: { value } }) =>
          setInputs((draft) => {
            draft.wait = String(value);
          })
        }
      >
        {Array.from({ length: 255 }).map((_, i) => (
          <option key={getId()}>{i}</option>
        ))}
      </select>
      <p>{`${wait} X ${stepTime}ms = ${Math.round(
        Number(wait) * stepTime,
      )} ms`}</p>
      <h3>Scene 개수</h3>
      <select
        value={sceneMax}
        onChange={({ target: { value } }) =>
          setInputs((draft) => {
            draft.sceneMax = String(value);
          })
        }
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
