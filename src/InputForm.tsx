import React, { useMemo } from 'react';
import styled from 'styled-components';
import { getId, Inputs } from './Utils';
import TitleAndItem from './TitleAndItem';
import Title from './Title';

const InputsWrap = styled.div`
  display: flex;

  @media (max-width: 660px) {
    flex-direction: column;
  }
`;

interface Props {
  inputs: Inputs;
  setInputs: (e: (draft: Inputs) => void) => void;
}

const Array255 = Array.from({ length: 255 });
const Array20 = Array.from({ length: 20 });

function InputForm({ inputs, setInputs }: Props) {
  const { white, colorChangeTime, colorsMax, sceneChangeWaitTime } = inputs;
  const colorInputArray = useMemo(
    () => Array.from({ length: Number(colorsMax) }),
    [colorsMax],
  );

  return (
    <>
      <Title>입력</Title>
      <InputsWrap>
        <TitleAndItem title="0 → 100 변화 시간" unit="초">
          <select
            name="colorChangeTime"
            value={colorChangeTime}
            onChange={({ target: { value } }) =>
              setInputs((draft) => {
                draft.colorChangeTime = value;
              })
            }
          >
            {Array255.map((_, i) => (
              <option key={getId()}>{(i / 10 + 0.2).toFixed(1)}</option>
            ))}
          </select>
        </TitleAndItem>
        <TitleAndItem title="Scene 전환 대기 시간" unit="초">
          <select
            name="sceneChangeWaitTime"
            value={sceneChangeWaitTime}
            onChange={({ target: { value } }) =>
              setInputs((draft) => {
                draft.sceneChangeWaitTime = value;
              })
            }
          >
            {Array255.map((_, i) => (
              <option key={getId()}>{(i / 10 + 0.2).toFixed(1)}</option>
            ))}
          </select>
        </TitleAndItem>
        <TitleAndItem title="4CH White 밝기">
          <select
            name="white"
            value={white}
            onChange={({ target: { value } }) =>
              setInputs((draft) => {
                draft.white = value;
              })
            }
          >
            <option>X</option>
            {Array255.map((_, i) => (
              <option key={getId()}>{i + 1}</option>
            ))}
          </select>
        </TitleAndItem>
        <TitleAndItem title="Scene 개수">
          <select
            value={colorsMax}
            onChange={({ target: { value } }) =>
              setInputs((draft) => {
                draft.colorsMax = value;
                draft.colors = Array.from({ length: Number(value) }).map(
                  (_, i) => draft.colors[i] || '#000000',
                );
              })
            }
          >
            {Array20.map((_, i) => (
              <option key={getId()}>{i + 1}</option>
            ))}
          </select>
        </TitleAndItem>
      </InputsWrap>
      <TitleAndItem title="Scenes">
        {colorInputArray.map((_, i) => (
          <input
            name="color"
            type="color"
            value={inputs.colors[i]}
            onChange={({ target: { value } }) =>
              setInputs((draft) => {
                draft.colors[i] = value;
              })
            }
          />
        ))}
      </TitleAndItem>
    </>
  );
}

export default InputForm;
