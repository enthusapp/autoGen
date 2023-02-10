/* eslint-disable @typescript-eslint/no-non-null-assertion */
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

export function hexToRgb(gr: string) {
  const cs =
    gr.length === 4
      ? /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(gr)!
      : /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(gr)!;

  const r = parseInt(cs[1], 16);
  const g = parseInt(cs[2], 16);
  const b = parseInt(cs[3], 16);
  return [r, g, b];
}

export function fillZero(e: string) {
  return e.length === 1 ? `0${e}` : e;
}

export function rgbTohex(rgb: Array<number>) {
  return `#${fillZero(rgb[0].toString(16))}${fillZero(
    rgb[1].toString(16),
  )}${fillZero(rgb[2].toString(16))}`;
}
