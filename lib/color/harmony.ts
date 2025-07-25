import chroma from "chroma-js";
import { Color, ColorPalette } from "@/types/palette";
import { createColor, lighten, darken, adjustSaturation } from "./formats";

export function generateComplementaryColors(baseColor: Color): Color[] {
  const base = chroma(baseColor.hex);
  const complement = base.set("hsl.h", (base.hsl()[0] + 180) % 360);

  return [baseColor, createColor(complement.hex())];
}

export function generateAnalogousColors(baseColor: Color): Color[] {
  const base = chroma(baseColor.hex);
  const hue = base.hsl()[0];

  return [
    createColor(base.set("hsl.h", (hue - 30 + 360) % 360).hex()),
    baseColor,
    createColor(base.set("hsl.h", (hue + 30) % 360).hex()),
  ];
}

export function generateTriadicColors(baseColor: Color): Color[] {
  const base = chroma(baseColor.hex);
  const hue = base.hsl()[0];

  return [
    baseColor,
    createColor(base.set("hsl.h", (hue + 120) % 360).hex()),
    createColor(base.set("hsl.h", (hue + 240) % 360).hex()),
  ];
}

export function generateSplitComplementaryColors(baseColor: Color): Color[] {
  const base = chroma(baseColor.hex);
  const hue = base.hsl()[0];
  const complementHue = (hue + 180) % 360;

  return [
    baseColor,
    createColor(base.set("hsl.h", (complementHue - 30 + 360) % 360).hex()),
    createColor(base.set("hsl.h", (complementHue + 30) % 360).hex()),
  ];
}

export function generateColorPalette(
  baseColor: Color,
  harmonyType:
    | "complementary"
    | "analogous"
    | "triadic"
    | "split-complementary" = "analogous"
): ColorPalette {
  let harmonyColors: Color[];

  switch (harmonyType) {
    case "complementary":
      harmonyColors = generateComplementaryColors(baseColor);
      break;
    case "triadic":
      harmonyColors = generateTriadicColors(baseColor);
      break;
    case "split-complementary":
      harmonyColors = generateSplitComplementaryColors(baseColor);
      break;
    default:
      harmonyColors = generateAnalogousColors(baseColor);
  }

  const primary = baseColor;
  const secondary = harmonyColors[1] || adjustSaturation(baseColor, -0.3);
  const accent =
    harmonyColors[2] || adjustSaturation(lighten(baseColor, 0.5), 0.2);

  // Generate background colors
  const lightBackground = createColor("#ffffff");
  const darkBackground = createColor("#0f0f0f");

  // Generate surface colors (slightly tinted backgrounds)
  const lightSurface = createColor("#f8f9fa");
  const darkSurface = createColor("#1a1a1a");

  // Generate text colors
  const lightText = createColor("#1a1a1a");
  const darkText = createColor("#f0f0f0");

  return {
    id: crypto.randomUUID(),
    name: `Generated Palette`,
    primary,
    secondary,
    accent,
    background: {
      light: lightBackground,
      dark: darkBackground,
    },
    text: {
      light: lightText,
      dark: darkText,
    },
    surface: {
      light: lightSurface,
      dark: darkSurface,
    },
    createdAt: new Date(),
    theme: "custom",
  };
}
