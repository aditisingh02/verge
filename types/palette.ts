import { Color } from "./color";

export interface ColorPalette {
  id: string;
  name: string;
  primary: Color;
  secondary: Color;
  accent: Color;
  background: {
    light: Color;
    dark: Color;
  };
  text: {
    light: Color;
    dark: Color;
  };
  surface: {
    light: Color;
    dark: Color;
  };
  createdAt: Date;
  theme?: ThemeType;
}

export type ThemeType =
  | "material"
  | "tailwind"
  | "ios"
  | "neumorphism"
  | "custom";

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  colors: Partial<ColorPalette>;
}
