import { ColorPalette } from "@/types/palette";
import { ExportFormat, ExportOptions } from "@/types/export";

export function exportToCSS(
  palette: ColorPalette,
  options: ExportOptions = {}
): ExportFormat {
  const { prefix = "" } = options;

  const cssVariables = `/* ${palette.name} Color Palette */
:root {
  /* Primary Colors */
  --${prefix}color-primary: ${palette.primary.hex};
  --${prefix}color-primary-rgb: ${palette.primary.rgb.r}, ${palette.primary.rgb.g}, ${palette.primary.rgb.b};
  --${prefix}color-primary-hsl: ${palette.primary.hsl.h}, ${palette.primary.hsl.s}%, ${palette.primary.hsl.l}%;
  
  /* Secondary Colors */
  --${prefix}color-secondary: ${palette.secondary.hex};
  --${prefix}color-secondary-rgb: ${palette.secondary.rgb.r}, ${palette.secondary.rgb.g}, ${palette.secondary.rgb.b};
  --${prefix}color-secondary-hsl: ${palette.secondary.hsl.h}, ${palette.secondary.hsl.s}%, ${palette.secondary.hsl.l}%;
  
  /* Accent Colors */
  --${prefix}color-accent: ${palette.accent.hex};
  --${prefix}color-accent-rgb: ${palette.accent.rgb.r}, ${palette.accent.rgb.g}, ${palette.accent.rgb.b};
  --${prefix}color-accent-hsl: ${palette.accent.hsl.h}, ${palette.accent.hsl.s}%, ${palette.accent.hsl.l}%;
  
  /* Light Theme */
  --${prefix}color-background: ${palette.background.light.hex};
  --${prefix}color-text: ${palette.text.light.hex};
  --${prefix}color-surface: ${palette.surface.light.hex};
}

[data-theme="dark"] {
  /* Dark Theme */
  --${prefix}color-background: ${palette.background.dark.hex};
  --${prefix}color-text: ${palette.text.dark.hex};
  --${prefix}color-surface: ${palette.surface.dark.hex};
}

/* Utility Classes */
.${prefix}bg-primary { background-color: var(--${prefix}color-primary); }
.${prefix}bg-secondary { background-color: var(--${prefix}color-secondary); }
.${prefix}bg-accent { background-color: var(--${prefix}color-accent); }
.${prefix}bg-background { background-color: var(--${prefix}color-background); }
.${prefix}bg-surface { background-color: var(--${prefix}color-surface); }

.${prefix}text-primary { color: var(--${prefix}color-primary); }
.${prefix}text-secondary { color: var(--${prefix}color-secondary); }
.${prefix}text-accent { color: var(--${prefix}color-accent); }
.${prefix}text-foreground { color: var(--${prefix}color-text); }

.${prefix}border-primary { border-color: var(--${prefix}color-primary); }
.${prefix}border-secondary { border-color: var(--${prefix}color-secondary); }
.${prefix}border-accent { border-color: var(--${prefix}color-accent); }`;

  return {
    type: "css",
    content: cssVariables,
    filename: `${palette.name.toLowerCase().replace(/\s+/g, "-")}-palette.css`,
  };
}
