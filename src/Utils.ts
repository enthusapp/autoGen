let id = 1;

export function getId() {
  id += 1;
  return id;
}

export interface Inputs {
  colorChangeTime: string;
  colorsMax: string;
  sceneChangeTime: string;
  colors: Array<Array<number>>;
}
