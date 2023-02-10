let id = 1;

export function getId() {
  id += 1;
  return id;
}

export interface Inputs {
  changeTime: string;
  colorsMax: string;
  waitTime: string;
  colors: Array<Array<number>>;
}

export function getTimes(inputs: Inputs) {
  const zeroToMax = Number(inputs.changeTime) * 250;
  return {
    zeroToMax,
    stepTime: zeroToMax / 255,
  };
}
