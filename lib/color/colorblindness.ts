import chroma from "chroma-js";

export type ColorBlindnessType =
  | "normal"
  | "protanopia" // Red-blind (no L cones)
  | "deuteranopia" // Green-blind (no M cones)
  | "tritanopia" // Blue-blind (no S cones)
  | "achromatopsia" // Complete color blindness
  | "protanomaly" // Red-weak (L cones shifted)
  | "deuteranomaly" // Green-weak (M cones shifted)
  | "tritanomaly" // Blue-weak (S cones shifted)
  | "achromatomaly"; // Blue cone monochromacy

export interface ColorBlindnessInfo {
  type: ColorBlindnessType;
  name: string;
  description: string;
  prevalence: string;
  severity: "mild" | "moderate" | "severe";
}

export const COLOR_BLINDNESS_TYPES: ColorBlindnessInfo[] = [
  {
    type: "normal",
    name: "Normal Vision",
    description: "Full color vision with all cone types functioning normally",
    prevalence: "~92% of population",
    severity: "mild",
  },
  {
    type: "protanopia",
    name: "Protanopia",
    description: "Complete absence of L-cones (red-blind)",
    prevalence: "~1% of males",
    severity: "severe",
  },
  {
    type: "deuteranopia",
    name: "Deuteranopia",
    description: "Complete absence of M-cones (green-blind)",
    prevalence: "~1% of males",
    severity: "severe",
  },
  {
    type: "tritanopia",
    name: "Tritanopia",
    description: "Complete absence of S-cones (blue-blind)",
    prevalence: "~0.01% of population",
    severity: "severe",
  },
  {
    type: "achromatopsia",
    name: "Achromatopsia",
    description: "Complete color blindness (monochromacy)",
    prevalence: "~0.003% of population",
    severity: "severe",
  },
  {
    type: "protanomaly",
    name: "Protanomaly",
    description: "Shifted L-cone sensitivity (red-weak)",
    prevalence: "~1% of males",
    severity: "mild",
  },
  {
    type: "deuteranomaly",
    name: "Deuteranomaly",
    description: "Shifted M-cone sensitivity (green-weak)",
    prevalence: "~5% of males",
    severity: "moderate",
  },
  {
    type: "tritanomaly",
    name: "Tritanomaly",
    description: "Shifted S-cone sensitivity (blue-weak)",
    prevalence: "~0.01% of population",
    severity: "mild",
  },
  {
    type: "achromatomaly",
    name: "Achromatomaly",
    description: "Blue cone monochromacy (partial color blindness)",
    prevalence: "~0.001% of population",
    severity: "moderate",
  },
];

// Transformation matrices for color blindness simulation
// Based on Machado, Oliveira, and Fernandes (2009) - more accurate simulation
const TRANSFORMATION_MATRICES = {
  protanopia: [
    [0.152286, 1.052583, -0.204868],
    [0.114503, 0.786281, 0.099216],
    [-0.003882, -0.048116, 1.051998],
  ],
  deuteranopia: [
    [0.367322, 0.860646, -0.227968],
    [0.280085, 0.672501, 0.047413],
    [-0.01182, 0.04294, 0.968881],
  ],
  tritanopia: [
    [1.255528, -0.076749, -0.178779],
    [-0.078411, 0.930809, 0.147602],
    [0.004733, 0.691367, 0.3039],
  ],
  protanomaly: [
    [0.458064, 0.679578, -0.137642],
    [0.092785, 0.846313, 0.060902],
    [-0.007494, -0.016807, 1.024301],
  ],
  deuteranomaly: [
    [0.547494, 0.607765, -0.155259],
    [0.181692, 0.781742, 0.036566],
    [-0.01041, 0.027275, 0.983136],
  ],
  tritanomaly: [
    [1.017277, 0.027029, -0.044306],
    [-0.006113, 0.958479, 0.047634],
    [0.006379, 0.248708, 0.744913],
  ],
};

/**
 * Simulates how a color appears to someone with color blindness
 */
export function simulateColorBlindness(
  color: string,
  type: ColorBlindnessType
): string {
  if (type === "normal") {
    return color;
  }

  try {
    const chromaColor = chroma(color);
    const [r, g, b] = chromaColor.rgb().map((c) => c / 255);

    // Validate RGB values
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      return color;
    }

    if (type === "achromatopsia") {
      // Complete color blindness - convert to grayscale using luminance
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      return chroma
        .rgb(luminance * 255, luminance * 255, luminance * 255)
        .hex();
    }

    if (type === "achromatomaly") {
      // Blue cone monochromacy - partial desaturation
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      const desaturated = [
        r * 0.3 + luminance * 0.7,
        g * 0.3 + luminance * 0.7,
        b * 0.3 + luminance * 0.7,
      ];
      return chroma
        .rgb(desaturated[0] * 255, desaturated[1] * 255, desaturated[2] * 255)
        .hex();
    }

    const matrix =
      TRANSFORMATION_MATRICES[type as keyof typeof TRANSFORMATION_MATRICES];
    if (!matrix) {
      return color;
    }

    // Apply transformation matrix directly to RGB values (0-1 range)
    const newR = matrix[0][0] * r + matrix[0][1] * g + matrix[0][2] * b;
    const newG = matrix[1][0] * r + matrix[1][1] * g + matrix[1][2] * b;
    const newB = matrix[2][0] * r + matrix[2][1] * g + matrix[2][2] * b;

    // Clamp values to valid range (0-1)
    const clampedR = Math.max(0, Math.min(1, newR));
    const clampedG = Math.max(0, Math.min(1, newG));
    const clampedB = Math.max(0, Math.min(1, newB));

    // Convert back to 0-255 range and create hex
    return chroma
      .rgb(
        Math.round(clampedR * 255),
        Math.round(clampedG * 255),
        Math.round(clampedB * 255)
      )
      .hex();
  } catch (error) {
    // If color parsing fails, return original color
    console.warn(
      `Failed to simulate color blindness for color: ${color}`,
      error
    );
    return color;
  }
}

/**
 * Simulates an entire color palette for color blindness
 */
export function simulatePaletteColorBlindness(
  palette: any,
  type: ColorBlindnessType
): any {
  if (type === "normal") {
    return palette;
  }

  // Helper to get color string from Color object or string
  const getColorHex = (color: any): string => {
    if (typeof color === "string") return color;
    if (color && typeof color === "object" && color.hex) return color.hex;
    if (color && typeof color.hex === "function") return color.hex();
    return String(color);
  };

  return {
    ...palette,
    primary: simulateColorBlindness(getColorHex(palette.primary), type),
    secondary: simulateColorBlindness(getColorHex(palette.secondary), type),
    accent: simulateColorBlindness(getColorHex(palette.accent), type),
    background: {
      light: simulateColorBlindness(
        getColorHex(palette.background.light),
        type
      ),
      dark: simulateColorBlindness(getColorHex(palette.background.dark), type),
    },
    text: {
      light: simulateColorBlindness(getColorHex(palette.text.light), type),
      dark: simulateColorBlindness(getColorHex(palette.text.dark), type),
    },
    surface: {
      light: simulateColorBlindness(getColorHex(palette.surface.light), type),
      dark: simulateColorBlindness(getColorHex(palette.surface.dark), type),
    },
  };
}

/**
 * Get severity level for a color blindness type
 */
export function getColorBlindnessSeverity(
  type: ColorBlindnessType
): "mild" | "moderate" | "severe" {
  const info = COLOR_BLINDNESS_TYPES.find((t) => t.type === type);
  return info?.severity || "mild";
}

/**
 * Get human-readable name for color blindness type
 */
export function getColorBlindnessName(type: ColorBlindnessType): string {
  const info = COLOR_BLINDNESS_TYPES.find((t) => t.type === type);
  return info?.name || type;
}

/**
 * Helper function to convert color to string
 */
function getColorString(color: any): string {
  if (typeof color === "string") return color;
  if (color && typeof color.hex === "function") return color.hex();
  return String(color);
}

/**
 * Check if two colors are distinguishable for a given color blindness type
 */
export function areColorsDistinguishable(
  color1: string | any,
  color2: string | any,
  type: ColorBlindnessType,
  threshold: number = 10
): boolean {
  try {
    const colorStr1 = getColorString(color1);
    const colorStr2 = getColorString(color2);

    const sim1 = simulateColorBlindness(colorStr1, type);
    const sim2 = simulateColorBlindness(colorStr2, type);

    const deltaE = chroma.deltaE(sim1, sim2);
    return deltaE > threshold;
  } catch (error) {
    console.warn("Failed to check color distinguishability:", error);
    return true; // Assume distinguishable if calculation fails
  }
}
