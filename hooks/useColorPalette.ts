import { useState, useCallback, useEffect } from "react";
import { ColorPalette } from "@/types/palette";
import { Color, ColorFormat } from "@/types/color";
import { generateColorPalette } from "@/lib/color/harmony";
import { createColor } from "@/lib/color/formats";
import {
  savePalette,
  getSavedPalettes,
  deletePalette,
} from "@/lib/utils/storage";

export interface UseColorPaletteReturn {
  currentPalette: ColorPalette | null;
  savedPalettes: ColorPalette[];
  colorFormat: ColorFormat;
  isGenerating: boolean;
  error: string | null;
  generatePalette: (
    baseColor: string,
    harmonyType?:
      | "complementary"
      | "analogous"
      | "triadic"
      | "split-complementary"
  ) => Promise<void>;
  setColorFormat: (format: ColorFormat) => void;
  savePaletteToStorage: (palette: ColorPalette) => void;
  deletePaletteFromStorage: (paletteId: string) => void;
  loadSavedPalettes: () => void;
  setPalette: (palette: ColorPalette) => void;
}

export function useColorPalette(): UseColorPaletteReturn {
  const [currentPalette, setCurrentPalette] = useState<ColorPalette | null>(
    null
  );
  const [savedPalettes, setSavedPalettes] = useState<ColorPalette[]>([]);
  const [colorFormat, setColorFormat] = useState<ColorFormat>("hex");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePalette = useCallback(
    async (
      baseColor: string,
      harmonyType:
        | "complementary"
        | "analogous"
        | "triadic"
        | "split-complementary" = "analogous"
    ) => {
      setIsGenerating(true);
      setError(null);

      try {
        // Add small delay to show loading state
        await new Promise((resolve) => setTimeout(resolve, 300));

        const color = createColor(baseColor);
        const palette = generateColorPalette(color, harmonyType);
        setCurrentPalette(palette);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to generate palette"
        );
      } finally {
        setIsGenerating(false);
      }
    },
    []
  );

  const savePaletteToStorage = useCallback((palette: ColorPalette) => {
    try {
      savePalette(palette);
      loadSavedPalettes();
    } catch (err) {
      setError("Failed to save palette");
    }
  }, []);

  const deletePaletteFromStorage = useCallback((paletteId: string) => {
    try {
      deletePalette(paletteId);
      setSavedPalettes((prev) => prev.filter((p) => p.id !== paletteId));
    } catch (err) {
      setError("Failed to delete palette");
    }
  }, []);

  const loadSavedPalettes = useCallback(() => {
    try {
      const palettes = getSavedPalettes();
      setSavedPalettes(palettes);
    } catch (err) {
      setError("Failed to load saved palettes");
    }
  }, []);

  const setPalette = useCallback((palette: ColorPalette) => {
    setCurrentPalette(palette);
  }, []);

  // Load saved palettes on mount
  useEffect(() => {
    loadSavedPalettes();
  }, [loadSavedPalettes]);

  return {
    currentPalette,
    savedPalettes,
    colorFormat,
    isGenerating,
    error,
    generatePalette,
    setColorFormat,
    savePaletteToStorage,
    deletePaletteFromStorage,
    loadSavedPalettes,
    setPalette,
  };
}
