import { ThemePreset, ColorPalette } from "@/types/palette";
import { createColor } from "@/lib/color/formats";

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "material",
    name: "Material Design",
    description: "Google's Material Design color system",
    colors: {
      primary: createColor("#1976D2"),
      secondary: createColor("#DC004E"),
      accent: createColor("#FF5722"),
      background: {
        light: createColor("#FAFAFA"),
        dark: createColor("#121212"),
      },
      text: {
        light: createColor("#212121"),
        dark: createColor("#FFFFFF"),
      },
      surface: {
        light: createColor("#FFFFFF"),
        dark: createColor("#1E1E1E"),
      },
    },
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    description: "Default Tailwind CSS color palette",
    colors: {
      primary: createColor("#3B82F6"),
      secondary: createColor("#8B5CF6"),
      accent: createColor("#10B981"),
      background: {
        light: createColor("#FFFFFF"),
        dark: createColor("#0F172A"),
      },
      text: {
        light: createColor("#1F2937"),
        dark: createColor("#F9FAFB"),
      },
      surface: {
        light: createColor("#F8FAFC"),
        dark: createColor("#1E293B"),
      },
    },
  },
  {
    id: "ios",
    name: "iOS Design",
    description: "Apple's iOS design system colors",
    colors: {
      primary: createColor("#007AFF"),
      secondary: createColor("#5856D6"),
      accent: createColor("#FF3B30"),
      background: {
        light: createColor("#F2F2F7"),
        dark: createColor("#000000"),
      },
      text: {
        light: createColor("#000000"),
        dark: createColor("#FFFFFF"),
      },
      surface: {
        light: createColor("#FFFFFF"),
        dark: createColor("#1C1C1E"),
      },
    },
  },
  {
    id: "neumorphism",
    name: "Neumorphism",
    description: "Soft UI design with subtle shadows",
    colors: {
      primary: createColor("#6C5CE7"),
      secondary: createColor("#A29BFE"),
      accent: createColor("#FD79A8"),
      background: {
        light: createColor("#E3E3E3"),
        dark: createColor("#2C2C2C"),
      },
      text: {
        light: createColor("#2D3436"),
        dark: createColor("#DDD6FE"),
      },
      surface: {
        light: createColor("#E3E3E3"),
        dark: createColor("#3A3A3A"),
      },
    },
  },
];

export function getThemePreset(id: string): ThemePreset | undefined {
  return THEME_PRESETS.find((preset) => preset.id === id);
}

export function applyThemePreset(
  presetId: string
): Partial<ColorPalette> | null {
  const preset = getThemePreset(presetId);
  return preset ? preset.colors : null;
}
