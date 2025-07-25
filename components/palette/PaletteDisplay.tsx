"use client";

import { useState } from "react";
import { ColorPalette } from "@/types/palette";
import { Color, ColorFormat } from "@/types/color";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatColor } from "@/lib/color/formats";
import { Copy, Check } from "lucide-react";

interface PaletteDisplayProps {
  palette: ColorPalette;
  format: ColorFormat;
  theme: "light" | "dark";
}

interface ColorSwatchProps {
  color: Color;
  label: string;
  format: ColorFormat;
}

function ColorSwatch({ color, label, format }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const colorValue = formatColor(color, format);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(colorValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy color:", err);
    }
  };

  return (
    <div className="group relative">
      <div
        className="w-full h-20 rounded-lg border shadow-sm cursor-pointer transition-transform hover:scale-105"
        style={{ backgroundColor: color.hex }}
        onClick={handleCopy}
      />
      <div className="mt-2 space-y-1">
        <div className="text-sm font-medium">{label}</div>
        <div className="flex items-center justify-between">
          <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
            {colorValue}
          </code>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-600" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function PaletteDisplay({
  palette,
  format,
  theme,
}: PaletteDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{palette.name}</span>
          <span className="text-sm font-normal text-muted-foreground">
            {theme === "light" ? "Light Theme" : "Dark Theme"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primary Colors */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">
            Primary Colors
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <ColorSwatch
              color={palette.primary}
              label="Primary"
              format={format}
            />
            <ColorSwatch
              color={palette.secondary}
              label="Secondary"
              format={format}
            />
            <ColorSwatch
              color={palette.accent}
              label="Accent"
              format={format}
            />
          </div>
        </div>

        {/* Theme Colors */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">
            Theme Colors
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <ColorSwatch
              color={
                theme === "light"
                  ? palette.background.light
                  : palette.background.dark
              }
              label="Background"
              format={format}
            />
            <ColorSwatch
              color={theme === "light" ? palette.text.light : palette.text.dark}
              label="Text"
              format={format}
            />
            <ColorSwatch
              color={
                theme === "light" ? palette.surface.light : palette.surface.dark
              }
              label="Surface"
              format={format}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
