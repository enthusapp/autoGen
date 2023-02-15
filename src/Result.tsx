import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { hexToRgb, Inputs } from './Utils';
import TitleAndItem from './TitleAndItem';
import Title from './Title';

const InputsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CodeWrap = styled.div`
  background-color: #eee;
  border-radius: 3px;
  padding: 0.2em;
`;

const Code = styled(CodeWrap)`
  height: 100%;
  font-family: 'Courier New';
  font-size: 0.8em;
  color: #000;
`;

const Status = styled.div`
  font-size: 15px;
  margin: 10px 0;
  width: 310px;
`;

const Button = styled.button.attrs({ type: 'button' })`
  cursor: pointer;
  border: 1px solid #aaaaaa;
  font-size: 17px;
  padding: 2px 10px;
  &:hover {
    background: #c0c0c0;
  }
`;

interface Props {
  inputs: Inputs;
}

const width = 200;
const height = 200;
const ZERO2MAX = 0;
const WAIT = 1;

function Result({ inputs }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const pauseButtonRef = useRef<HTMLButtonElement>(null);
  const pauseRef = useRef<boolean>(false);
  const pauseTimeRef = useRef<number>(0);

  const {
    sceneChangeWaitTime: sceneChangeWaitTimeString,
    colorChangeTime: colorChangeTimeString,
    colorsMax: colorsMaxString,
    colors: colorStrings,
    whites,
    use4ChannelWhite,
  } = inputs;

  const colorChangeTime = Number(colorChangeTimeString);
  const sceneChangeWaitTime = Number(sceneChangeWaitTimeString);
  const colorsMax = Number(colorsMaxString);
  const colors = colorStrings.map((e) => hexToRgb(e));
  const stepTime = (colorChangeTime * 1000) / 255;

  useEffect(() => {
    let requestId: number;
    let stepChangedTime = performance.now();
    let previousTime = stepChangedTime;
    let totalTime = stepChangedTime;
    let previousColors = colors[0];
    let targetColors = previousColors;
    const nowColors = [...previousColors];
    let targetIndex = 0;
    let pauseStatus = false;

    const setTarget = (now: number) => {
      targetIndex += 1;
      if (targetIndex === colorsMax) totalTime = now;
      targetIndex %= colorsMax;
      targetColors = colors[targetIndex] || [0, 0, 0];
      previousTime = now;
    };

    setTarget(stepChangedTime);

    const animator = () => {
      const canvas = canvasRef.current;
      const restart = () => {
        requestId = requestAnimationFrame(animator);
      };

      const now = performance.now();

      if (pauseRef.current) {
        pauseStatus = true;
        restart();
        return;
      }

      if (pauseStatus) {
        pauseStatus = false;

        const pauseDiff = now - pauseTimeRef.current;
        stepChangedTime += pauseDiff;
        previousTime += pauseDiff;
        totalTime += pauseDiff;
      }

      if (!canvas) {
        restart();
        return;
      }

      const context = canvas.getContext('2d');
      if (!context) {
        restart();
        return;
      }

      if (now - stepChangedTime < stepTime) {
        restart();
        return;
      }

      const colorChangedTime = now - previousTime;
      const colorStatus = [ZERO2MAX, ZERO2MAX, ZERO2MAX];

      Array.from({ length: 3 }).forEach((_, i) => {
        const previousColor = previousColors[i];
        const targetColor = targetColors[i];
        const zeorToMaxTime = stepTime * Math.abs(targetColor - previousColor);
        if (zeorToMaxTime < colorChangedTime) {
          nowColors[i] = targetColor;
          colorStatus[i] = WAIT;
          return;
        }

        if (previousColor > targetColor) {
          nowColors[i] = Math.round(
            previousColor - colorChangedTime / stepTime,
          );
          return;
        }
        nowColors[i] = Math.round(previousColor + colorChangedTime / stepTime);
      });

      context.fillStyle = `RGB(${nowColors[0]}, ${nowColors[1]}, ${nowColors[2]})`;
      context.fillRect(0, 0, width, height);

      if (statusRef.current)
        statusRef.current.innerText = `[${nowColors.join(', ')}], ${(
          (now - totalTime) /
          1000
        ).toFixed(1)}s, [${colorStatus
          .map((e) => (e === ZERO2MAX ? 'z2m' : 'wait'))
          .join(', ')}], ${(colorChangedTime / 1000).toFixed(
          1,
        )}s, ${targetIndex}`;

      stepChangedTime = now;
      if (now - previousTime < (colorChangeTime + sceneChangeWaitTime) * 1000) {
        restart();
        return;
      }

      previousColors = targetColors;
      setTarget(now);
      restart();
    };

    requestId = requestAnimationFrame(animator);

    return () => {
      if (requestId) cancelAnimationFrame(requestId);
    };
  }, [stepTime, colors, colorChangeTime, sceneChangeWaitTime, colorsMax]);

  const autoAloneDelay = Math.round(colorChangeTime * 4);
  const code = `#undef PWM_CH_MAX
#define PWM_CH_MAX\t\t${use4ChannelWhite ? 4 : 3}

#define AUTORUN_SPEED\t\t${Math.round(
    ((colorChangeTime + sceneChangeWaitTime) * 1000) / autoAloneDelay,
  )}

#define AUTORUN_SENARIO_MAX\t${colorsMax}

unsigned char auto_senario[AUTORUN_SENARIO_MAX][PWM_CH_MAX] = {
  {${colors
    .map(
      (color, i) =>
        `${color.join(', ')}${use4ChannelWhite ? `, ${whites[i]}` : ''}`,
    )
    .join('},\n  {')}}
};

#define AUTO_ALONE_DELAY	${autoAloneDelay}
`;
  return (
    <>
      <Title>결과</Title>
      <InputsWrap>
        <TitleAndItem title="시뮬레이션">
          <div>
            <canvas ref={canvasRef} width={width} height={height} />
            <Status ref={statusRef} />
            <Button
              ref={pauseButtonRef}
              onClick={() => {
                pauseRef.current = !pauseRef.current;
                pauseTimeRef.current = performance.now();
                if (pauseButtonRef.current)
                  pauseButtonRef.current.innerText = pauseRef.current
                    ? 'RUN'
                    : 'PASUSE';
              }}
            >
              PAUSE
            </Button>
          </div>
        </TitleAndItem>
        <TitleAndItem title="코드">
          <pre>
            <CodeWrap className="sourceCode">
              <Code>{code}</Code>
            </CodeWrap>
          </pre>
        </TitleAndItem>
      </InputsWrap>
    </>
  );
}

export default Result;
