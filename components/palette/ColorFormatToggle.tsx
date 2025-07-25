"use client";

import { ColorFormat } from "@/types/color";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ColorFormatToggleProps {
  format: ColorFormat;
  onChange: (format: ColorFormat) => void;
}

export function ColorFormatToggle({
  format,
  onChange,
}: ColorFormatToggleProps) {
  return (
    <Tabs
      value={format}
      onValueChange={(value) => onChange(value as ColorFormat)}
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="hex">HEX</TabsTrigger>
        <TabsTrigger value="rgb">RGB</TabsTrigger>
        <TabsTrigger value="hsl">HSL</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
