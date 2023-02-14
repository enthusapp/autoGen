/* eslint-disable @typescript-eslint/no-non-null-assertion */
let id = 1;

export function getId() {
  id += 1;
  return id;
}

export interface Inputs {
  colorChangeTime: string;
  colorsMax: string;
  sceneChangeWaitTime: string;
  colors: Array<string>;
  white: string;
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

export function toHexString(int: number) {
  return fillZero(int.toString(16));
}

export function rgbTohex(rgb: Array<number>) {
  return `#${toHexString(rgb[0])}${toHexString(rgb[1])}${toHexString(rgb[2])}`;
}
