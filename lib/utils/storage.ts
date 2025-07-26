import { ColorPalette } from "@/types/palette";

const STORAGE_KEYS = {
  SAVED_PALETTES: "verge_saved_palettes",
  USER_PREFERENCES: "verge_user_preferences",
  FAVORITES: "verge_favorites",
};

export interface UserPreferences {
  defaultColorFormat: "hex" | "hsl" | "rgb";
  theme: "light" | "dark" | "system";
  autoGenerateOnColorChange: boolean;
}

export function savePalette(palette: ColorPalette): void {
  try {
    const saved = getSavedPalettes();
    const updated = [...saved.filter((p) => p.id !== palette.id), palette];
    localStorage.setItem(STORAGE_KEYS.SAVED_PALETTES, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to save palette:", error);
  }
}

export function getSavedPalettes(): ColorPalette[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED_PALETTES);
    if (!saved) return [];

    const palettes = JSON.parse(saved);
    return palettes.map(
      (p: Omit<ColorPalette, "createdAt"> & { createdAt: string }) => ({
        ...p,
        createdAt: new Date(p.createdAt),
      })
    );
  } catch (error) {
    console.error("Failed to load saved palettes:", error);
    return [];
  }
}

export function deletePalette(paletteId: string): void {
  try {
    const saved = getSavedPalettes();
    const updated = saved.filter((p) => p.id !== paletteId);
    localStorage.setItem(STORAGE_KEYS.SAVED_PALETTES, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to delete palette:", error);
  }
}

export function saveUserPreferences(preferences: UserPreferences): void {
  try {
    localStorage.setItem(
      STORAGE_KEYS.USER_PREFERENCES,
      JSON.stringify(preferences)
    );
  } catch (error) {
    console.error("Failed to save user preferences:", error);
  }
}

export function getUserPreferences(): UserPreferences {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    if (!saved) {
      return {
        defaultColorFormat: "hex",
        theme: "system",
        autoGenerateOnColorChange: true,
      };
    }
    return JSON.parse(saved);
  } catch (error) {
    console.error("Failed to load user preferences:", error);
    return {
      defaultColorFormat: "hex",
      theme: "system",
      autoGenerateOnColorChange: true,
    };
  }
}

export function generateShareableUrl(palette: ColorPalette): string {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const encodedPalette = btoa(
    JSON.stringify({
      primary: palette.primary.hex,
      secondary: palette.secondary.hex,
      accent: palette.accent.hex,
      name: palette.name,
    })
  );

  return `${baseUrl}?palette=${encodedPalette}`;
}

export function loadPaletteFromUrl(): Partial<ColorPalette> | null {
  if (typeof window === "undefined") return null;

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const paletteData = urlParams.get("palette");

    if (!paletteData) return null;

    const decoded = JSON.parse(atob(paletteData));
    return decoded;
  } catch (error) {
    console.error("Failed to load palette from URL:", error);
    return null;
  }
}
