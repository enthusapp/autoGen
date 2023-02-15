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

const Array255 = Array.from({ length: 256 });
const Array20 = Array.from({ length: 20 });

function InputForm({ inputs, setInputs }: Props) {
  const {
    whites,
    use4ChannelWhite,
    colorChangeTime,
    colorsMax,
    sceneChangeWaitTime,
  } = inputs;
  const colorInputArray = useMemo(
    () => Array.from({ length: Number(colorsMax) }),
    [colorsMax],
  );

  return (
    <form>
      <Title>입력</Title>
      <button type="submit">공유링크 생성</button>
      <a href="/autoGen">
        <button type="button">초기화</button>
      </a>
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
        <TitleAndItem title="Scene 개수">
          <select
            name="colorsMax"
            value={colorsMax}
            onChange={({ target: { value } }) =>
              setInputs((draft) => {
                draft.colorsMax = value;
                draft.colors = Array.from({ length: Number(value) }).map(
                  (_, i) => draft.colors[i] || '#000000',
                );
                draft.whites = Array.from({ length: Number(value) }).map(
                  (_, i) => draft.whites[i] || '255',
                );
              })
            }
          >
            {Array20.map((_, i) => (
              <option key={getId()}>{i + 1}</option>
            ))}
          </select>
        </TitleAndItem>
        <TitleAndItem title="4CH White 사용">
          <label htmlFor="use4ChannelWhite">
            <input
              id="use4ChannelWhite"
              type="checkbox"
              name="use4ChannelWhite"
              checked={use4ChannelWhite}
              onChange={({ target: { checked } }) =>
                setInputs((draft) => {
                  draft.use4ChannelWhite = !!checked;
                })
              }
            />
            사용
          </label>
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
      {use4ChannelWhite && (
        <TitleAndItem title="Whites">
          {colorInputArray.map((_, i) => (
            <select
              name="white"
              value={whites[i]}
              onChange={({ target: { value } }) =>
                setInputs((draft) => {
                  draft.whites[i] = value;
                })
              }
            >
              {Array255.map((__, j) => (
                <option key={getId()}>{j}</option>
              ))}
            </select>
          ))}
        </TitleAndItem>
      )}
    </form>
  );
}

export default InputForm;
