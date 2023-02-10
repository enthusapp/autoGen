import React, { useEffect, useRef } from 'react';
import { getTimes, Inputs } from './Utils';

interface Props {
  inputs: Inputs;
}

const width = 200;
const height = 200;

function Result({ inputs }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { zeroToMax, stepTime } = getTimes(inputs);

  useEffect(() => {
    let requestId: NodeJS.Timeout;
    let colorStepChangedTime = performance.now();
    let colorChangedTime = performance.now();
    const currentColor = [...inputs.colors[0]];
    let previousColor = [...inputs.colors[0]];
    let colorIndex = 0;

    const animator = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        requestId = setTimeout(animator);
        return;
      }

      const context = canvas.getContext('2d');
      if (!context) {
        requestId = setTimeout(animator);
        return;
      }

      const now = performance.now();
      if (now - colorStepChangedTime < stepTime) {
        requestId = setTimeout(animator);
        return;
      }

      const colors = inputs.colors[colorIndex] || [0, 0, 0];

      Array.from({ length: 3 }).forEach((_, i) => {
        currentColor[i] =
          (colors[i] - previousColor[i]) *
          stepTime *
          (now - colorStepChangedTime);
        if (previousColor[i] < colors[i]) currentColor[i] += 1;
        else if (currentColor[i] > colors[i]) currentColor[i] -= 1;
      });

      context.fillStyle = `RGB(${currentColor[0]}, ${currentColor[0]}, ${currentColor[0]})`;
      context.fillRect(0, 0, width, height);

      colorStepChangedTime = now;
      if (
        now - colorChangedTime <
        zeroToMax + stepTime * Number(inputs.waitTime)
      ) {
        requestId = setTimeout(animator);
        return;
      }
      // eslint-disable-next-line no-console
      console.log(
        now - colorChangedTime,
        colorIndex,
        currentColor,
        inputs.colors[colorIndex],
      );

      previousColor = [...colors];
      colorIndex += 1;
      colorIndex %= Number(inputs.colorsMax);
      colorChangedTime = now;
      requestId = setTimeout(animator);
    };

    requestId = setTimeout(animator);

    return () => {
      if (requestId) clearTimeout(requestId);
    };
  }, [inputs, zeroToMax, stepTime]);

  return (
    <div>
      <h2>결과</h2>
      <canvas ref={canvasRef} width={width} height={height} />
      <p>{inputs.colorsMax}</p>
    </div>
  );
}

export default Result;
