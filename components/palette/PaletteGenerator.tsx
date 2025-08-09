"use client";

import { useState } from "react";
import { ColorPicker } from "./ColorPicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface PaletteGeneratorProps {
  onGenerate: (
    baseColor: string,
    harmonyType:
      | "complementary"
      | "analogous"
      | "triadic"
      | "split-complementary"
  ) => void;
  isGenerating?: boolean;
  onBaseColorChange?: (color: string) => void;
  onHarmonyTypeChange?: (
    harmonyType:
      | "complementary"
      | "analogous"
      | "triadic"
      | "split-complementary"
  ) => void;
}

export function PaletteGenerator({
  onGenerate,
  isGenerating = false,
  onBaseColorChange,
  onHarmonyTypeChange,
}: PaletteGeneratorProps) {
  const [baseColor, setBaseColor] = useState("#006156");
  const [harmonyType, setHarmonyType] = useState<
    "complementary" | "analogous" | "triadic" | "split-complementary"
  >("analogous");

  const handleGenerate = () => {
    onGenerate(baseColor, harmonyType);
  };

  return (
    <div className="space-y-4">
      <ColorPicker
        value={baseColor}
        onChange={(color) => {
          setBaseColor(color);
          onBaseColorChange?.(color);
        }}
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
      />

      <Card>
        <CardContent className="p-4 space-y-3">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Color Harmony
            </label>
            <Select
              value={harmonyType}
              onValueChange={(value) => {
                const newHarmonyType = value as typeof harmonyType;
                setHarmonyType(newHarmonyType);
                onHarmonyTypeChange?.(newHarmonyType);
              }}
            >
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="analogous">Analogous</SelectItem>
                <SelectItem value="complementary">Complementary</SelectItem>
                <SelectItem value="triadic">Triadic</SelectItem>
                <SelectItem value="split-complementary">
                  Split Complementary
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-muted-foreground">
            {harmonyType === "analogous" &&
              "Adjacent colors on the color wheel"}
            {harmonyType === "complementary" &&
              "Opposite colors on the color wheel"}
            {harmonyType === "triadic" && "Three evenly spaced colors"}
            {harmonyType === "split-complementary" &&
              "Base color + two adjacent to its complement"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
