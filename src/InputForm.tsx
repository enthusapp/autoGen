import React from 'react';
import { getId, Inputs } from './Utils';

interface Props {
  inputs: Inputs;
  setInputs: (e: (draft: Inputs) => void) => void;
}

function InputForm({ inputs, setInputs }: Props) {
  const { colorChangeTime, colorsMax, sceneChangeTime } = inputs;

  return (
    <div>
      <h2>입력</h2>
      <h3>Dimming 변화 시간</h3>
      <select
        name="colorChangeTime"
        value={colorChangeTime}
        onChange={({ target: { value } }) =>
          setInputs((draft) => {
            draft.colorChangeTime = String(value);
          })
        }
      >
        {Array.from({ length: 255 }).map((_, i) => (
          <option key={getId()}>{(i / 10 + 0.2).toFixed(1)}</option>
        ))}
      </select>
      <h3>Scene 전환 대기 시간</h3>
      <select
        name="sceneChangeTime"
        value={sceneChangeTime}
        onChange={({ target: { value } }) =>
          setInputs((draft) => {
            draft.sceneChangeTime = String(value);
          })
        }
      >
        {Array.from({ length: 255 }).map((_, i) => (
          <option key={getId()}>{(i / 10 + 0.2).toFixed(1)}</option>
        ))}
      </select>
      <h3>Scene 개수</h3>
      <select
        value={colorsMax}
        onChange={({ target: { value } }) =>
          setInputs((draft) => {
            draft.colorsMax = String(value);
          })
        }
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <option key={getId()}>{i + 1}</option>
        ))}
      </select>
      <h3>Scene</h3>
      {Array.from({ length: Number(colorsMax) }).map(() => (
        <div>
          <input name="color" key={getId()} type="color" />
        </div>
      ))}
    </div>
  );
}

export default InputForm;
