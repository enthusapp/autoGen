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
    let requestId: number;
    let colorChangedTime = performance.now();
    const currentColor = [0, 0, 0];

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
      if (now - colorChangedTime < Number(inputs.step) * (250 / 255)) {
        requestId = requestAnimationFrame(animator);
        return;
      }
      colorChangedTime = now;

      Array.from({ length: 3 }).forEach((_, i) => {
        currentColor[i] += 1;
        currentColor[i] %= 256;
      });
      // eslint-disable-next-line no-console
      console.log(currentColor);

      context.fillStyle = 'RGB(0, 0, 0)';
      context.fillRect(0, 0, width, height);
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
      <p>{inputs.sceneMax}</p>
    </div>
  );
}

export default Result;
