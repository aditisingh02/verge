"use client";

import { ThemePreset } from "@/types/palette";
import { Card, CardContent } from "@/components/ui/card";

interface PresetCardProps {
  preset: ThemePreset;
  onSelect: (preset: ThemePreset) => void;
}

export function PresetCard({ preset, onSelect }: PresetCardProps) {
  const colors = [
    preset.colors.primary,
    preset.colors.secondary,
    preset.colors.accent,
  ].filter(Boolean);

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-all hover:scale-[1.02] group"
      onClick={() => onSelect(preset)}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          {/* Color Preview */}
          <div className="flex gap-1">
            {colors.map((color, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-md border shadow-sm"
                style={{ backgroundColor: color?.hex }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm group-hover:text-primary transition-colors">
              {preset.name}
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {preset.description}
            </p>
          </div>

          {/* Theme indicators */}
          <div className="flex flex-col gap-1">
            <div className="flex gap-0.5">
              <div
                className="w-2 h-2 rounded-full border"
                style={{
                  backgroundColor: preset.colors.background?.light?.hex,
                }}
                title="Light background"
              />
              <div
                className="w-2 h-2 rounded-full border"
                style={{ backgroundColor: preset.colors.surface?.light?.hex }}
                title="Light surface"
              />
            </div>
            <div className="flex gap-0.5">
              <div
                className="w-2 h-2 rounded-full border"
                style={{ backgroundColor: preset.colors.background?.dark?.hex }}
                title="Dark background"
              />
              <div
                className="w-2 h-2 rounded-full border"
                style={{ backgroundColor: preset.colors.surface?.dark?.hex }}
                title="Dark surface"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
