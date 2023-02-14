import React, { useEffect, useRef } from 'react';
import { hexToRgb, Inputs } from './Utils';

interface Props {
  inputs: Inputs;
}

const width = 200;
const height = 200;

function Result({ inputs }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    sceneChangeWaitTime: sceneChangeWaitTimeString,
    colorChangeTime: colorChangeTimeString,
    colorsMax: colorsMaxString,
    colors: colorStrings,
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
    let previousColors = colors[0];
    let targetColors = previousColors;
    const nowColors = [...previousColors];
    let targetIndex = 0;

    const animator = () => {
      const canvas = canvasRef.current;
      const restart = () => {
        requestId = requestAnimationFrame(animator);
      };

      if (!canvas) {
        restart();
        return;
      }

      const context = canvas.getContext('2d');
      if (!context) {
        restart();
        return;
      }

      const now = performance.now();
      if (now - stepChangedTime < stepTime) {
        restart();
        return;
      }

      const colorChangedTime = now - previousTime;

      Array.from({ length: 3 }).forEach((_, i) => {
        const previousColor = previousColors[i];
        const targetColor = targetColors[i];
        const zeorToMaxTime = stepTime * Math.abs(targetColor - previousColor);
        if (zeorToMaxTime < colorChangedTime) {
          nowColors[i] = targetColor;
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

      stepChangedTime = now;
      if (now - previousTime < (colorChangeTime + sceneChangeWaitTime) * 1000) {
        restart();
        return;
      }
      // eslint-disable-next-line no-console
      // console.log(colorChangedTime, nowColors, stepTime);

      previousColors = targetColors;
      targetIndex += 1;
      targetIndex %= colorsMax;
      targetColors = colors[targetIndex] || [0, 0, 0];
      previousTime = now;
      restart();
    };

    requestId = requestAnimationFrame(animator);

    return () => {
      if (requestId) cancelAnimationFrame(requestId);
    };
  }, [stepTime, colors, colorChangeTime, sceneChangeWaitTime, colorsMax]);

  return (
    <div>
      <h2>결과</h2>
      <canvas ref={canvasRef} width={width} height={height} />
      <p>{inputs.colorsMax}</p>
    </div>
  );
}

export default Result;
