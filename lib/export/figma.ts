import { ColorPalette } from "@/types/palette";
import { ExportFormat, ExportOptions } from "@/types/export";

export function exportToFigma(
  palette: ColorPalette,
  options: ExportOptions = {}
): ExportFormat {
  const figmaTokens = {
    global: {
      color: {
        primary: {
          value: palette.primary.hex,
          type: "color",
          description: "Primary brand color",
        },
        secondary: {
          value: palette.secondary.hex,
          type: "color",
          description: "Secondary brand color",
        },
        accent: {
          value: palette.accent.hex,
          type: "color",
          description: "Accent color for highlights",
        },
      },
    },
    light: {
      color: {
        background: {
          value: palette.background.light.hex,
          type: "color",
          description: "Light theme background",
        },
        text: {
          value: palette.text.light.hex,
          type: "color",
          description: "Light theme text",
        },
        surface: {
          value: palette.surface.light.hex,
          type: "color",
          description: "Light theme surface",
        },
      },
    },
    dark: {
      color: {
        background: {
          value: palette.background.dark.hex,
          type: "color",
          description: "Dark theme background",
        },
        text: {
          value: palette.text.dark.hex,
          type: "color",
          description: "Dark theme text",
        },
        surface: {
          value: palette.surface.dark.hex,
          type: "color",
          description: "Dark theme surface",
        },
      },
    },
  };

  return {
    type: "figma",
    content: JSON.stringify(figmaTokens, null, 2),
    filename: `${palette.name
      .toLowerCase()
      .replace(/\s+/g, "-")}-figma-tokens.json`,
  };
}
