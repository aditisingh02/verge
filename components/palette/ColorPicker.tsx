"use client";

import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { isValidColor } from "@/lib/color/formats";
import { Palette, AlertCircle } from "lucide-react";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  onGenerate: () => void;
  isGenerating?: boolean;
}

export function ColorPicker({
  value,
  onChange,
  onGenerate,
  isGenerating = false,
}: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      if (newValue) {
        const valid = isValidColor(newValue);
        setIsValid(valid);
        if (valid) {
          onChange(newValue);
        }
      }
    },
    [onChange]
  );

  const handleColorInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const color = e.target.value;
      setInputValue(color);
      setIsValid(true);
      onChange(color);
    },
    [onChange]
  );

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-medium">Base Color</h3>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="#006156"
              value={inputValue}
              onChange={handleInputChange}
              className={`pr-10 h-9 ${!isValid ? "border-destructive" : ""}`}
            />
            <input
              type="color"
              value={isValid && inputValue ? inputValue : "#006156"}
              onChange={handleColorInputChange}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded border cursor-pointer"
            />
          </div>

          <Button
            onClick={onGenerate}
            disabled={!isValid || !inputValue || isGenerating}
            size="sm"
            className="px-4"
          >
            {isGenerating ? "Generating..." : "Generate"}
          </Button>
        </div>

        {!isValid && inputValue && (
          <div className="flex items-center gap-2 text-xs text-destructive">
            <AlertCircle className="h-3 w-3" />
            <span>Please enter a valid color</span>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          Enter hex (#006156), rgb, hsl, or color name
        </div>
      </CardContent>
    </Card>
  );
}
