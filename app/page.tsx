"use client";

import { useState } from "react";
import { useColorPalette } from "@/hooks/useColorPalette";
import { PaletteGenerator } from "@/components/palette/PaletteGenerator";
import { PaletteDisplay } from "@/components/palette/PaletteDisplay";
import { ColorFormatToggle } from "@/components/palette/ColorFormatToggle";
import { LivePreview } from "@/components/preview/LivePreview";
import { ContrastChecker } from "@/components/accessibility/ContrastChecker";
import { ThemePresets } from "@/components/presets/ThemePresets";
import { ExportPanel } from "@/components/export/ExportPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Palette, Sparkles, Download, Shield } from "lucide-react";

export default function Home() {
  const {
    currentPalette,
    colorFormat,
    isGenerating,
    error,
    generatePalette,
    setColorFormat,
    savePaletteToStorage,
    setPalette,
  } = useColorPalette();

  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("light");

  const handleGeneratePalette = async (
    baseColor: string,
    harmonyType:
      | "complementary"
      | "analogous"
      | "triadic"
      | "split-complementary"
  ) => {
    await generatePalette(baseColor, harmonyType);
  };

  const handleSavePalette = () => {
    if (currentPalette) {
      savePaletteToStorage(currentPalette);
    }
  };

  const togglePreviewTheme = () => {
    setPreviewTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Palette className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Palxify</h1>
                <p className="text-sm text-muted-foreground">
                  Beautiful color palettes
                </p>
              </div>
            </div>
            {currentPalette && (
              <div className="flex items-center gap-3">
                <ColorFormatToggle
                  format={colorFormat}
                  onChange={setColorFormat}
                />
                <Button onClick={handleSavePalette} size="sm" className="gap-2">
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <Card className="mb-6 border-destructive/20 bg-destructive/5">
            <CardContent className="p-4">
              <p className="text-destructive text-sm">{error}</p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Sidebar - Controls */}
          <div className="xl:col-span-3 space-y-6">
            <Tabs defaultValue="generate" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="generate" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Generate
                </TabsTrigger>
                <TabsTrigger value="presets" className="gap-2">
                  <Palette className="h-4 w-4" />
                  Presets
                </TabsTrigger>
              </TabsList>

              <TabsContent value="generate" className="mt-6">
                <PaletteGenerator
                  onGenerate={handleGeneratePalette}
                  isGenerating={isGenerating}
                />
              </TabsContent>

              <TabsContent value="presets" className="mt-6">
                <ThemePresets onPresetSelect={setPalette} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-9">
            {currentPalette ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left - Palette & Accessibility */}
                <div className="space-y-6">
                  <PaletteDisplay
                    palette={currentPalette}
                    format={colorFormat}
                    theme={previewTheme}
                  />

                  <Tabs defaultValue="accessibility" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="accessibility" className="gap-2">
                        <Shield className="h-4 w-4" />
                        Accessibility
                      </TabsTrigger>
                      <TabsTrigger value="export" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="accessibility" className="mt-6">
                      <ContrastChecker
                        palette={currentPalette}
                        theme={previewTheme}
                      />
                    </TabsContent>

                    <TabsContent value="export" className="mt-6">
                      <ExportPanel palette={currentPalette} />
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Right - Live Preview */}
                <div className="lg:sticky lg:top-24 lg:h-fit">
                  <LivePreview
                    palette={currentPalette}
                    theme={previewTheme}
                    onThemeToggle={togglePreviewTheme}
                  />
                </div>
              </div>
            ) : (
              <Card className="border-dashed border-2 border-muted-foreground/20">
                <CardContent className="flex items-center justify-center py-24">
                  <div className="text-center space-y-6 max-w-md">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Palette className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">
                        Create Your First Palette
                      </h3>
                      <p className="text-muted-foreground">
                        Generate a harmonious color palette from a base color or
                        choose from our curated presets
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button className="gap-2">
                        <Sparkles className="h-4 w-4" />
                        Generate Palette
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Palette className="h-4 w-4" />
                        Browse Presets
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
