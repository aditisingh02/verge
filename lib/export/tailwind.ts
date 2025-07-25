import { ColorPalette } from "@/types/palette";
import { ExportFormat, ExportOptions } from "@/types/export";

export function exportToTailwind(
  palette: ColorPalette,
  options: ExportOptions = {}
): ExportFormat {
  const tailwindConfig = `// ${palette.name} Tailwind CSS Configuration
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '${palette.primary.hex}',
          50: '${palette.primary.hex}0D',
          100: '${palette.primary.hex}1A',
          200: '${palette.primary.hex}33',
          300: '${palette.primary.hex}4D',
          400: '${palette.primary.hex}66',
          500: '${palette.primary.hex}',
          600: '${palette.primary.hex}CC',
          700: '${palette.primary.hex}B3',
          800: '${palette.primary.hex}99',
          900: '${palette.primary.hex}80',
        },
        secondary: {
          DEFAULT: '${palette.secondary.hex}',
          50: '${palette.secondary.hex}0D',
          100: '${palette.secondary.hex}1A',
          200: '${palette.secondary.hex}33',
          300: '${palette.secondary.hex}4D',
          400: '${palette.secondary.hex}66',
          500: '${palette.secondary.hex}',
          600: '${palette.secondary.hex}CC',
          700: '${palette.secondary.hex}B3',
          800: '${palette.secondary.hex}99',
          900: '${palette.secondary.hex}80',
        },
        accent: {
          DEFAULT: '${palette.accent.hex}',
          50: '${palette.accent.hex}0D',
          100: '${palette.accent.hex}1A',
          200: '${palette.accent.hex}33',
          300: '${palette.accent.hex}4D',
          400: '${palette.accent.hex}66',
          500: '${palette.accent.hex}',
          600: '${palette.accent.hex}CC',
          700: '${palette.accent.hex}B3',
          800: '${palette.accent.hex}99',
          900: '${palette.accent.hex}80',
        },
        background: {
          light: '${palette.background.light.hex}',
          dark: '${palette.background.dark.hex}',
        },
        foreground: {
          light: '${palette.text.light.hex}',
          dark: '${palette.text.dark.hex}',
        },
        surface: {
          light: '${palette.surface.light.hex}',
          dark: '${palette.surface.dark.hex}',
        }
      }
    }
  }
}`;

  return {
    type: "tailwind",
    content: tailwindConfig,
    filename: `${palette.name
      .toLowerCase()
      .replace(/\s+/g, "-")}-tailwind.config.js`,
  };
}
