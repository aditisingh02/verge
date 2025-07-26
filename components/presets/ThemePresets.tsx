"use client";

import { ThemePreset, ColorPalette, ThemeType } from "@/types/palette";
import { PresetCard } from "./PresetCard";
import { THEME_PRESETS } from "@/lib/presets/themes";
import { generateColorPalette } from "@/lib/color/harmony";

interface ThemePresetsProps {
  onPresetSelect: (palette: ColorPalette) => void;
}

export function ThemePresets({ onPresetSelect }: ThemePresetsProps) {
  const handlePresetSelect = (preset: ThemePreset) => {
    // Create a palette from the preset
    const basePalette = generateColorPalette(preset.colors.primary!);

    // Override with preset colors
    const palette: ColorPalette = {
      ...basePalette,
      name: preset.name,
      theme: preset.id as ThemeType,
      primary: preset.colors.primary || basePalette.primary,
      secondary: preset.colors.secondary || basePalette.secondary,
      accent: preset.colors.accent || basePalette.accent,
      background: preset.colors.background || basePalette.background,
      text: preset.colors.text || basePalette.text,
      surface: preset.colors.surface || basePalette.surface,
    };

    onPresetSelect(palette);
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Choose from our curated collection of design system presets
      </div>
      <div className="grid grid-cols-1 gap-3">
        {THEME_PRESETS.map((preset) => (
          <PresetCard
            key={preset.id}
            preset={preset}
            onSelect={handlePresetSelect}
          />
        ))}
      </div>
    </div>
  );
}
