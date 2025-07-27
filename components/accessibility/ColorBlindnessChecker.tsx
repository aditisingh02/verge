"use client";

import { useState } from "react";
import { ColorPalette } from "@/types/palette";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  simulatePaletteColorBlindness,
  simulateColorBlindness,
  areColorsDistinguishable,
  COLOR_BLINDNESS_TYPES,
  ColorBlindnessType,
  getColorBlindnessSeverity,
} from "@/lib/color/colorblindness";
import { Eye, EyeOff, AlertTriangle, CheckCircle, Info } from "lucide-react";

// Helper function to convert color to string
const getColorString = (
  color: string | { hex: string | (() => string) }
): string => {
  if (typeof color === "string") return color;
  if (color && typeof color === "object" && color.hex) {
    return typeof color.hex === "function" ? color.hex() : color.hex;
  }
  return String(color);
};

interface ColorBlindnessCheckerProps {
  palette: ColorPalette;
  theme: "light" | "dark";
}

interface ColorComparisonProps {
  label: string;
  color1: string;
  color2: string;
  type: ColorBlindnessType;
}

function ColorComparison({
  label,
  color1,
  color2,
  type,
}: ColorComparisonProps) {
  // Convert colors to hex strings before processing
  const hexColor1 = getColorString(color1);
  const hexColor2 = getColorString(color2);

  const isDistinguishable = areColorsDistinguishable(
    hexColor1,
    hexColor2,
    type
  );
  const sim1 = simulateColorBlindness(hexColor1, type);
  const sim2 = simulateColorBlindness(hexColor2, type);

  // Ensure we have valid colors
  if (!hexColor1 || !hexColor2) {
    console.warn("Invalid colors:", { hexColor1, hexColor2, color1, color2 });
    return null;
  }

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-shrink-0">
          <div
            className="w-4 h-4 rounded border border-gray-300"
            style={{ backgroundColor: sim1 || hexColor1 }}
            title={`Original: ${hexColor1}, Simulated: ${sim1}`}
          />
          <span className="text-xs text-muted-foreground">vs</span>
          <div
            className="w-4 h-4 rounded border border-gray-300"
            style={{ backgroundColor: sim2 || hexColor2 }}
            title={`Original: ${hexColor2}, Simulated: ${sim2}`}
          />
        </div>
        <span className="text-sm font-medium truncate">{label}</span>
      </div>

      <Badge
        variant={isDistinguishable ? "default" : "destructive"}
        className="flex items-center gap-1 text-xs whitespace-nowrap"
      >
        {isDistinguishable ? (
          <>
            <CheckCircle className="h-3 w-3" />
            Distinguishable
          </>
        ) : (
          <>
            <AlertTriangle className="h-3 w-3" />
            Similar
          </>
        )}
      </Badge>
    </div>
  );
}

function PalettePreview({
  palette,
  type,
  theme,
}: {
  palette: ColorPalette;
  type: ColorBlindnessType;
  theme: "light" | "dark";
}) {
  const simulatedPalette = simulatePaletteColorBlindness(palette, type);
  const bgColor =
    theme === "light"
      ? simulatedPalette.background.light
      : simulatedPalette.background.dark;
  const textColor =
    theme === "light"
      ? simulatedPalette.text.light
      : simulatedPalette.text.dark;
  const surfaceColor =
    theme === "light"
      ? simulatedPalette.surface.light
      : simulatedPalette.surface.dark;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">
          Preview as {COLOR_BLINDNESS_TYPES.find((t) => t.type === type)?.name}
        </div>
        <div className="text-xs text-muted-foreground">
          {type === "normal" ? "Original Colors" : "Simulated Vision"}
        </div>
      </div>

      {/* Color Swatches Comparison */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground">
            Original
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <div
                className="h-8 rounded border"
                style={{ backgroundColor: getColorString(palette.primary) }}
              />
              <div className="text-xs text-center">Primary</div>
            </div>
            <div className="space-y-1">
              <div
                className="h-8 rounded border"
                style={{ backgroundColor: getColorString(palette.secondary) }}
              />
              <div className="text-xs text-center">Secondary</div>
            </div>
            <div className="space-y-1">
              <div
                className="h-8 rounded border"
                style={{ backgroundColor: getColorString(palette.accent) }}
              />
              <div className="text-xs text-center">Accent</div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground">
            {COLOR_BLINDNESS_TYPES.find((t) => t.type === type)?.name}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <div
                className="h-8 rounded border"
                style={{ backgroundColor: simulatedPalette.primary }}
              />
              <div className="text-xs text-center">Primary</div>
            </div>
            <div className="space-y-1">
              <div
                className="h-8 rounded border"
                style={{ backgroundColor: simulatedPalette.secondary }}
              />
              <div className="text-xs text-center">Secondary</div>
            </div>
            <div className="space-y-1">
              <div
                className="h-8 rounded border"
                style={{ backgroundColor: simulatedPalette.accent }}
              />
              <div className="text-xs text-center">Accent</div>
            </div>
          </div>
        </div>
      </div>

      {/* UI Preview with Simulated Colors */}
      <div
        className="p-4 rounded-lg border space-y-3"
        style={{
          backgroundColor: bgColor,
          color: textColor,
        }}
      >
        <div className="text-sm font-medium">UI Preview</div>

        {/* Card Example */}
        <div
          className="p-3 rounded border space-y-2"
          style={{
            backgroundColor: surfaceColor,
            borderColor: simulatedPalette.primary,
          }}
        >
          <div className="text-sm font-medium">Sample Card</div>
          <div className="text-xs opacity-80">
            This shows how your palette appears in a typical UI component
          </div>

          <div className="flex gap-2 mt-2">
            <Button
              size="sm"
              style={{
                backgroundColor: simulatedPalette.primary,
                color: bgColor,
                border: "none",
              }}
            >
              Primary Action
            </Button>
            <Button
              size="sm"
              variant="outline"
              style={{
                borderColor: simulatedPalette.secondary,
                color: simulatedPalette.secondary,
                backgroundColor: "transparent",
              }}
            >
              Secondary
            </Button>
            <Button
              size="sm"
              variant="ghost"
              style={{
                color: simulatedPalette.accent,
                backgroundColor: "transparent",
              }}
            >
              Accent
            </Button>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex gap-2 text-xs">
          <div
            className="px-2 py-1 rounded"
            style={{
              backgroundColor: simulatedPalette.primary,
              color: bgColor,
            }}
          >
            Active
          </div>
          <div
            className="px-2 py-1 rounded border"
            style={{
              borderColor: simulatedPalette.secondary,
              color: simulatedPalette.secondary,
            }}
          >
            Inactive
          </div>
          <div
            className="px-2 py-1 rounded"
            style={{
              backgroundColor: simulatedPalette.accent,
              color: bgColor,
            }}
          >
            Highlight
          </div>
        </div>
      </div>
    </div>
  );
}

export function ColorBlindnessChecker({
  palette,
  theme,
}: ColorBlindnessCheckerProps) {
  const [selectedType, setSelectedType] =
    useState<ColorBlindnessType>("deuteranomaly");
  const [showPreview, setShowPreview] = useState(true);

  const backgroundColor =
    theme === "light" ? palette.background.light : palette.background.dark;
  const textColor = theme === "light" ? palette.text.light : palette.text.dark;
  const surfaceColor =
    theme === "light" ? palette.surface.light : palette.surface.dark;

  // Use the top-level getColorString function

  const colorComparisons = [
    {
      label: "Primary vs Background",
      color1: getColorString(palette.primary),
      color2: getColorString(backgroundColor),
    },
    {
      label: "Secondary vs Background",
      color1: getColorString(palette.secondary),
      color2: getColorString(backgroundColor),
    },
    {
      label: "Accent vs Background",
      color1: getColorString(palette.accent),
      color2: getColorString(backgroundColor),
    },
    {
      label: "Primary vs Secondary",
      color1: getColorString(palette.primary),
      color2: getColorString(palette.secondary),
    },
    {
      label: "Text vs Background",
      color1: getColorString(textColor),
      color2: getColorString(backgroundColor),
    },
    {
      label: "Text vs Surface",
      color1: getColorString(textColor),
      color2: getColorString(surfaceColor),
    },
  ];

  const passedCount = colorComparisons.filter((comp) =>
    areColorsDistinguishable(comp.color1, comp.color2, selectedType)
  ).length;
  const totalCount = colorComparisons.length;

  const selectedTypeInfo = COLOR_BLINDNESS_TYPES.find(
    (t) => t.type === selectedType
  );
  const severity = getColorBlindnessSeverity(selectedType);

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-base sm:text-lg">Color Blindness Check</span>
          </div>
          <Badge
            variant={
              passedCount === totalCount
                ? "default"
                : passedCount > totalCount / 2
                ? "secondary"
                : "destructive"
            }
            className="self-start sm:self-auto"
          >
            {passedCount}/{totalCount} Distinguishable
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">
              Color Vision Type
            </label>
            <Select
              value={selectedType}
              onValueChange={(value) =>
                setSelectedType(value as ColorBlindnessType)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COLOR_BLINDNESS_TYPES.filter(
                  (type) => type.type !== "normal"
                ).map((type) => (
                  <SelectItem key={type.type} value={type.type}>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          type.severity === "severe"
                            ? "destructive"
                            : type.severity === "moderate"
                            ? "secondary"
                            : "outline"
                        }
                        className="text-xs"
                      >
                        {type.severity}
                      </Badge>
                      {type.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="gap-2"
            >
              {showPreview ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              {showPreview ? "Hide" : "Show"} Preview
            </Button>
          </div>
        </div>

        {selectedTypeInfo && (
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <div className="font-medium mb-1">{selectedTypeInfo.name}</div>
                <div className="mb-1">{selectedTypeInfo.description}</div>
                <div className="text-xs">
                  Affects {selectedTypeInfo.prevalence}
                </div>
              </div>
            </div>
          </div>
        )}

        {showPreview && (
          <PalettePreview palette={palette} type={selectedType} theme={theme} />
        )}

        <div className="space-y-3">
          <div className="text-sm font-medium">Color Distinguishability</div>
          {colorComparisons.map((comparison, index) => (
            <ColorComparison
              key={index}
              label={comparison.label}
              color1={comparison.color1}
              color2={comparison.color2}
              type={selectedType}
            />
          ))}
        </div>

        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="text-xs sm:text-sm text-muted-foreground">
            <div className="font-medium mb-1 sm:mb-2">
              Color Blindness Guidelines:
            </div>
            <div className="space-y-1">
              <div>• Use patterns, textures, or labels alongside color</div>
              <div>• Ensure sufficient contrast between colors</div>
              <div>• Test with multiple color vision types</div>
              <div>• Avoid red-green combinations for critical information</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
