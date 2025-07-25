export interface Color {
  hex: string;
  hsl: { h: number; s: number; l: number };
  rgb: { r: number; g: number; b: number };
  name?: string;
}

export type ColorFormat = "hex" | "hsl" | "rgb";

export interface ContrastResult {
  ratio: number;
  level: "AAA" | "AA" | "fail";
  isAccessible: boolean;
}
