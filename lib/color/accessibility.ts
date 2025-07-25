import chroma from "chroma-js";
import { Color, ContrastResult } from "@/types/color";

export function calculateContrastRatio(color1: Color, color2: Color): number {
  const c1 = chroma(color1.hex);
  const c2 = chroma(color2.hex);
  return chroma.contrast(c1, c2);
}

export function getContrastLevel(ratio: number): ContrastResult["level"] {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  return "fail";
}

export function checkContrast(
  foreground: Color,
  background: Color
): ContrastResult {
  const ratio = calculateContrastRatio(foreground, background);
  const level = getContrastLevel(ratio);

  return {
    ratio: Math.round(ratio * 100) / 100,
    level,
    isAccessible: level !== "fail",
  };
}

export function findAccessibleTextColor(backgroundColor: Color): Color {
  const white = {
    hex: "#ffffff",
    hsl: { h: 0, s: 0, l: 100 },
    rgb: { r: 255, g: 255, b: 255 },
  };
  const black = {
    hex: "#000000",
    hsl: { h: 0, s: 0, l: 0 },
    rgb: { r: 0, g: 0, b: 0 },
  };

  const whiteContrast = calculateContrastRatio(white, backgroundColor);
  const blackContrast = calculateContrastRatio(black, backgroundColor);

  return whiteContrast > blackContrast ? white : black;
}

export function suggestAccessibleColor(
  originalColor: Color,
  backgroundColor: Color,
  targetRatio: number = 4.5
): Color {
  const original = chroma(originalColor.hex);
  let adjusted = original;

  // Try darkening first
  for (let i = 0; i < 10; i++) {
    const testColor = {
      hex: adjusted.hex(),
      hsl: { h: 0, s: 0, l: 0 },
      rgb: { r: 0, g: 0, b: 0 },
    };

    if (calculateContrastRatio(testColor, backgroundColor) >= targetRatio) {
      return {
        hex: adjusted.hex(),
        hsl: {
          h: Math.round(adjusted.hsl()[0] || 0),
          s: Math.round(adjusted.hsl()[1] * 100),
          l: Math.round(adjusted.hsl()[2] * 100),
        },
        rgb: {
          r: Math.round(adjusted.rgb()[0]),
          g: Math.round(adjusted.rgb()[1]),
          b: Math.round(adjusted.rgb()[2]),
        },
      };
    }
    adjusted = adjusted.darken(0.2);
  }

  // If darkening didn't work, try lightening
  adjusted = original;
  for (let i = 0; i < 10; i++) {
    const testColor = {
      hex: adjusted.hex(),
      hsl: { h: 0, s: 0, l: 0 },
      rgb: { r: 0, g: 0, b: 0 },
    };

    if (calculateContrastRatio(testColor, backgroundColor) >= targetRatio) {
      return {
        hex: adjusted.hex(),
        hsl: {
          h: Math.round(adjusted.hsl()[0] || 0),
          s: Math.round(adjusted.hsl()[1] * 100),
          l: Math.round(adjusted.hsl()[2] * 100),
        },
        rgb: {
          r: Math.round(adjusted.rgb()[0]),
          g: Math.round(adjusted.rgb()[1]),
          b: Math.round(adjusted.rgb()[2]),
        },
      };
    }
    adjusted = adjusted.brighten(0.2);
  }

  return originalColor; // Return original if no accessible version found
}
