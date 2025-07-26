import chroma from "chroma-js";
import { Color, ColorFormat } from "@/types/color";

export function createColor(input: string): Color {
  try {
    const chromaColor = chroma(input);
    return {
      hex: chromaColor.hex(),
      hsl: {
        h: Math.round(chromaColor.hsl()[0] || 0),
        s: Math.round(chromaColor.hsl()[1] * 100),
        l: Math.round(chromaColor.hsl()[2] * 100),
      },
      rgb: {
        r: Math.round(chromaColor.rgb()[0]),
        g: Math.round(chromaColor.rgb()[1]),
        b: Math.round(chromaColor.rgb()[2]),
      },
    };
  } catch {
    throw new Error(`Invalid color input: ${input}`);
  }
}

export function formatColor(color: Color, format: ColorFormat): string {
  switch (format) {
    case "hex":
      return color.hex;
    case "hsl":
      return `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;
    case "rgb":
      return `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
    default:
      return color.hex;
  }
}

export function isValidColor(input: string): boolean {
  try {
    chroma(input);
    return true;
  } catch {
    return false;
  }
}

export function lighten(color: Color, amount: number): Color {
  const chromaColor = chroma(color.hex).brighten(amount);
  return createColor(chromaColor.hex());
}

export function darken(color: Color, amount: number): Color {
  const chromaColor = chroma(color.hex).darken(amount);
  return createColor(chromaColor.hex());
}

export function adjustSaturation(color: Color, amount: number): Color {
  const chromaColor = chroma(color.hex).saturate(amount);
  return createColor(chromaColor.hex());
}
