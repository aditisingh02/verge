"use client";

import { useState } from "react";
import { useColorPalette } from "@/hooks/useColorPalette";
import { PaletteGenerator } from "@/components/palette/PaletteGenerator";
import { PaletteDisplay } from "@/components/palette/PaletteDisplay";
import { ColorFormatToggle } from "@/components/palette/ColorFormatToggle";
import { LivePreview } from "@/components/preview/LivePreview";
import { ContrastChecker } from "@/components/accessibility/ContrastChecker";
import { ColorBlindnessChecker } from "@/components/accessibility/ColorBlindnessChecker";
import { ThemePresets } from "@/components/presets/ThemePresets";
import { ExportPanel } from "@/components/export/ExportPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Sparkles, Shield, Eye } from "lucide-react";
import Link from "next/link";

export default function App() {
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
  const [activeTab, setActiveTab] = useState<"generate" | "presets">(
    "generate"
  );

  // Track current generator settings
  const [currentBaseColor, setCurrentBaseColor] = useState("#006156");
  const [currentHarmonyType, setCurrentHarmonyType] = useState<
    "complementary" | "analogous" | "triadic" | "split-complementary"
  >("analogous");

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div>
                  <Link href="/">
                    <button
                      className="verge-button text-4xl tracking-tight"
                      data-text="Verge"
                      onClick={() => (window.location.href = "/")}
                    >
                      <span className="actual-text">&nbsp;Verge&nbsp;</span>
                      <span aria-hidden="true" className="hover-text">
                        &nbsp;Verge&nbsp;
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {currentPalette && (
                <ColorFormatToggle
                  format={colorFormat}
                  onChange={setColorFormat}
                />
              )}
            </div>
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
            <Tabs
              value={activeTab}
              onValueChange={(value) =>
                setActiveTab(value as "generate" | "presets")
              }
              className="w-full"
            >
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
                  onBaseColorChange={setCurrentBaseColor}
                  onHarmonyTypeChange={setCurrentHarmonyType}
                />
              </TabsContent>

              <TabsContent value="presets" className="mt-6">
                <ThemePresets onPresetSelect={setPalette} />
              </TabsContent>
            </Tabs>

            {/* Export Section - Only show when palette exists */}
            {currentPalette && <ExportPanel palette={currentPalette} />}
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

                  <Tabs defaultValue="contrast" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="contrast" className="gap-2">
                        <Shield className="h-4 w-4" />
                        Contrast
                      </TabsTrigger>
                      <TabsTrigger value="colorblind" className="gap-2">
                        <Eye className="h-4 w-4" />
                        Vision
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="contrast" className="mt-6">
                      <ContrastChecker
                        palette={currentPalette}
                        theme={previewTheme}
                      />
                    </TabsContent>

                    <TabsContent value="colorblind" className="mt-6">
                      <ColorBlindnessChecker
                        palette={currentPalette}
                        theme={previewTheme}
                      />
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
                      <Button
                        className="gap-2"
                        onClick={() => {
                          setActiveTab("generate");
                          // Generate a palette with the current base color and harmony type
                          handleGeneratePalette(
                            currentBaseColor,
                            currentHarmonyType
                          );
                        }}
                        disabled={isGenerating}
                      >
                        <Sparkles className="h-4 w-4" />
                        {isGenerating ? "Generating..." : "Generate Palette"}
                      </Button>
                      <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => setActiveTab("presets")}
                      >
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
