"use client";

import { ColorPalette } from "@/types/palette";
import { checkContrast } from "@/lib/color/accessibility";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";

interface ContrastCheckerProps {
  palette: ColorPalette;
  theme: "light" | "dark";
}

interface ContrastResultProps {
  label: string;
  foreground: string;
  background: string;
  ratio: number;
  level: "AAA" | "AA" | "fail";
}

function ContrastResult({
  label,
  foreground,
  background,
  ratio,
  level,
}: ContrastResultProps) {
  const getIcon = () => {
    if (level === "AAA")
      return <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />;
    if (level === "AA")
      return <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600" />;
    return <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />;
  };

  const getBadgeVariant = () => {
    if (level === "AAA") return "default";
    if (level === "AA") return "secondary";
    return "destructive";
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 rounded-lg border overflow-hidden">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <div
            className="w-3 h-3 sm:w-4 sm:h-4 rounded border flex-shrink-0"
            style={{ backgroundColor: foreground }}
          />
          <span className="text-xs sm:text-sm text-muted-foreground">on</span>
          <div
            className="w-3 h-3 sm:w-4 sm:h-4 rounded border flex-shrink-0"
            style={{ backgroundColor: background }}
          />
        </div>
        <span className="text-xs sm:text-sm font-medium truncate">{label}</span>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0 min-w-0">
        <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
          {ratio}:1
        </span>
        <Badge
          variant={getBadgeVariant()}
          className="flex items-center gap-1 text-xs whitespace-nowrap"
        >
          {getIcon()}
          <span>{level === "fail" ? "Fail" : level}</span>
        </Badge>
      </div>
    </div>
  );
}

export function ContrastChecker({ palette, theme }: ContrastCheckerProps) {
  const backgroundColor =
    theme === "light" ? palette.background.light : palette.background.dark;
  const textColor = theme === "light" ? palette.text.light : palette.text.dark;
  const surfaceColor =
    theme === "light" ? palette.surface.light : palette.surface.dark;

  const contrasts = [
    {
      label: "Text on Background",
      foreground: textColor,
      background: backgroundColor,
      result: checkContrast(textColor, backgroundColor),
    },
    {
      label: "Primary on Background",
      foreground: palette.primary,
      background: backgroundColor,
      result: checkContrast(palette.primary, backgroundColor),
    },
    {
      label: "Secondary on Background",
      foreground: palette.secondary,
      background: backgroundColor,
      result: checkContrast(palette.secondary, backgroundColor),
    },
    {
      label: "Accent on Background",
      foreground: palette.accent,
      background: backgroundColor,
      result: checkContrast(palette.accent, backgroundColor),
    },
    {
      label: "Text on Surface",
      foreground: textColor,
      background: surfaceColor,
      result: checkContrast(textColor, surfaceColor),
    },
    {
      label: "Primary on Surface",
      foreground: palette.primary,
      background: surfaceColor,
      result: checkContrast(palette.primary, surfaceColor),
    },
  ];

  const passedCount = contrasts.filter((c) => c.result.isAccessible).length;
  const totalCount = contrasts.length;

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-base sm:text-lg">Accessibility Check</span>
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
            {passedCount}/{totalCount} Passed
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {contrasts.map((contrast, index) => (
          <ContrastResult
            key={index}
            label={contrast.label}
            foreground={contrast.foreground.hex}
            background={contrast.background.hex}
            ratio={contrast.result.ratio}
            level={contrast.result.level}
          />
        ))}

        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="text-xs sm:text-sm text-muted-foreground">
            <div className="font-medium mb-1 sm:mb-2">WCAG Guidelines:</div>
            <div className="space-y-1">
              <div>• AA: 4.5:1 normal, 3:1 large text</div>
              <div>• AAA: 7:1 normal, 4.5:1 large text</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
