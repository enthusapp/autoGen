import React, { useMemo } from 'react';
import styled from 'styled-components';
import { getId, Inputs } from './Utils';
import { Title, SubTitle } from './Styles';

const Text = styled.div`
  font-size: 15px;
  margin-left: 5px;
`;

const Select = styled.select`
  font-size: 15px;
  width: 60px;
`;

const Items = styled.div`
  display: flex;
  align-items: center;
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
      <SubTitle>0 → 100 변화 시간</SubTitle>
      <Items>
        <Select
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
        </Select>
        <Text>초</Text>
      </Items>
      <SubTitle>Scene 전환 대기 시간</SubTitle>
      <Items>
        <Select
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
        </Select>
        <Text>초</Text>
      </Items>
      <SubTitle>4CH White 밝기</SubTitle>
      <Select
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
      </Select>
      <SubTitle>Scene 개수</SubTitle>
      <Select
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
      </Select>
      <SubTitle>Scenes</SubTitle>
      <Items>
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
      </Items>
    </>
  );
}

export default InputForm;
