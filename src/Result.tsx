import React, { useEffect, useRef } from 'react';
import { Inputs } from './Utils';

interface Props {
  inputs: Inputs;
}

const width = 200;
const height = 200;

function Result({ inputs }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stepTime = (Number(inputs.colorChangeTime) * 1000) / 255;
    let requestId: number;
    let stepChangedTime = performance.now();
    let previousTime = performance.now();
    const nowColors = [...inputs.colors[0]];
    let previousColors = inputs.colors[0];
    let targetColors = inputs.colors[0];
    let targetIndex = 0;

    const animator = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        requestId = requestAnimationFrame(animator);
        return;
      }

      const context = canvas.getContext('2d');
      if (!context) {
        requestId = requestAnimationFrame(animator);
        return;
      }

      const now = performance.now();
      if (now - stepChangedTime < stepTime) {
        requestId = requestAnimationFrame(animator);
        return;
      }

      const colorChangedTime = now - previousTime;

      Array.from({ length: 3 }).forEach((_, i) => {
        const previousColor = previousColors[i];
        const targetColor = targetColors[i];
        const zeorToMaxTime =
          stepTime *
          (targetColor - previousColor) *
          (previousColor > targetColor ? -1 : 1);

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
      // eslint-disable-next-line no-console
      // console.log(colorChangedTime, nowColors, stepTime);

      context.fillStyle = `RGB(${nowColors[0]}, ${nowColors[1]}, ${nowColors[2]})`;
      context.fillRect(0, 0, width, height);

      stepChangedTime = now;
      if (now - previousTime < Number(inputs.sceneChangeTime) * 1000) {
        requestId = requestAnimationFrame(animator);
        return;
      }

      previousColors = inputs.colors[targetIndex] || [0, 0, 0];
      targetIndex += 1;
      targetIndex %= Number(inputs.colorsMax);
      targetColors = inputs.colors[targetIndex] || [0, 0, 0];
      previousTime = now;
      requestId = requestAnimationFrame(animator);
    };

    requestId = requestAnimationFrame(animator);

    return () => {
      if (requestId) cancelAnimationFrame(requestId);
    };
  }, [inputs]);

  return (
    <div>
      <h2>결과</h2>
      <canvas ref={canvasRef} width={width} height={height} />
      <p>{inputs.colorsMax}</p>
    </div>
  );
}

export default Result;
