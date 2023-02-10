let id = 1;

export function getId() {
  id += 1;
  return id;
}

export interface Inputs {
  step: string;
  sceneMax: string;
  wait: string;
  colors: Array<Array<number>>;
}

export function getTimes(inputs: Inputs) {
  const zeroToMax = Number(inputs.step) * 250;
  return {
    zeroToMax,
    stepTime: zeroToMax / 255,
  };
}
