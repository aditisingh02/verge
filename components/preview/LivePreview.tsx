"use client";

import { ColorPalette } from "@/types/palette";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MockUI } from "./MockUI";
import { Sun, Moon, Eye, Monitor } from "lucide-react";

interface LivePreviewProps {
  palette: ColorPalette | null;
  theme: "light" | "dark";
  onThemeToggle: () => void;
}

export function LivePreview({
  palette,
  theme,
  onThemeToggle,
}: LivePreviewProps) {
  if (!palette) {
    return (
      <Card className="h-fit">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Monitor className="h-5 w-5" />
            Live Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48 text-muted-foreground border-2 border-dashed border-muted-foreground/20 rounded-lg">
            <div className="text-center space-y-2">
              <Eye className="h-8 w-8 mx-auto opacity-50" />
              <p className="text-sm">Preview will appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Live Preview
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onThemeToggle}
            className="gap-2 h-8"
          >
            {theme === "light" ? (
              <>
                <Moon className="h-3.5 w-3.5" />
                Dark
              </>
            ) : (
              <>
                <Sun className="h-3.5 w-3.5" />
                Light
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="border rounded-lg overflow-hidden bg-muted/20">
          <div className="aspect-[4/3] overflow-auto">
            <MockUI palette={palette} theme={theme} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
