"use client";

import { ColorPalette } from "@/types/palette";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MockUI } from "./MockUI";
import { FullScreenMockUI } from "./FullScreenMockUI";
import { Sun, Moon, Eye, Monitor, Maximize2 } from "lucide-react";

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
          <div className="flex items-center gap-2">
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

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 h-8 hidden md:flex"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  Full View
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0">
                <DialogHeader className="p-6 pb-0">
                  <DialogTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-5 w-5" />
                      Full Screen Preview - {palette.name}
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
                  </DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-hidden rounded-lg">
                  <FullScreenMockUI palette={palette} theme={theme} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="border rounded-lg overflow-hidden bg-muted/20">
          {/* Desktop: Clickable dialog trigger */}
          <div className="hidden md:block cursor-pointer group">
            <Dialog>
              <DialogTrigger asChild>
                <div className="aspect-[4/3] overflow-auto relative">
                  <MockUI palette={palette} theme={theme} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3 flex items-center gap-2 text-sm font-medium">
                      <Maximize2 className="h-4 w-4" />
                      Click for full view
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0">
                <DialogHeader className="p-6 pb-0">
                  <DialogTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-5 w-5" />
                      Full Screen Preview - {palette.name}
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
                  </DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-hidden rounded-lg">
                  <FullScreenMockUI palette={palette} theme={theme} />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile: Static preview only */}
          <div className="md:hidden aspect-[4/3] overflow-auto">
            <MockUI palette={palette} theme={theme} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
