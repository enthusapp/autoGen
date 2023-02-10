let id = 1;

export function getId() {
  id += 1;
  return id;
}

export interface Inputs {
  step?: string;
  sceneMax?: string;
  wait?: string;
}
