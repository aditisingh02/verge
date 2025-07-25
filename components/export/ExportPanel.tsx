"use client";

import { useState } from "react";
import { ColorPalette } from "@/types/palette";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { exportToJSON } from "@/lib/export/json";
import { exportToCSS } from "@/lib/export/css";
import { exportToTailwind } from "@/lib/export/tailwind";
import { exportToFigma } from "@/lib/export/figma";
import {
  Download,
  Copy,
  Check,
  FileText,
  Code,
  Palette,
  Figma,
} from "lucide-react";

interface ExportPanelProps {
  palette: ColorPalette | null;
}

export function ExportPanel({ palette }: ExportPanelProps) {
  const [activeTab, setActiveTab] = useState("json");
  const [copied, setCopied] = useState<string | null>(null);

  if (!palette) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Palette
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            Generate a color palette to export
          </div>
        </CardContent>
      </Card>
    );
  }

  const exports = {
    json: exportToJSON(palette),
    css: exportToCSS(palette),
    tailwind: exportToTailwind(palette),
    figma: exportToFigma(palette),
  };

  const handleCopy = async (content: string, type: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "json":
        return <FileText className="h-4 w-4" />;
      case "css":
        return <Code className="h-4 w-4" />;
      case "tailwind":
        return <Palette className="h-4 w-4" />;
      case "figma":
        return <Figma className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Palette
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="json" className="flex items-center gap-2">
              {getTabIcon("json")}
              JSON
            </TabsTrigger>
            <TabsTrigger value="css" className="flex items-center gap-2">
              {getTabIcon("css")}
              CSS
            </TabsTrigger>
            <TabsTrigger value="tailwind" className="flex items-center gap-2">
              {getTabIcon("tailwind")}
              Tailwind
            </TabsTrigger>
            <TabsTrigger value="figma" className="flex items-center gap-2">
              {getTabIcon("figma")}
              Figma
            </TabsTrigger>
          </TabsList>

          {Object.entries(exports).map(([key, exportData]) => (
            <TabsContent key={key} value={key} className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleCopy(exportData.content, key)}
                  className="flex items-center gap-2"
                >
                  {copied === key ? (
                    <>
                      <Check className="h-4 w-4 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
                <Button
                  onClick={() =>
                    handleDownload(exportData.content, exportData.filename)
                  }
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>

              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto max-h-96 overflow-y-auto">
                  <code>{exportData.content}</code>
                </pre>
              </div>

              <div className="text-sm text-muted-foreground">
                {key === "json" &&
                  "Structured JSON format with all color values and metadata"}
                {key === "css" &&
                  "CSS custom properties with utility classes for both light and dark themes"}
                {key === "tailwind" &&
                  "Tailwind CSS configuration object ready to use in your project"}
                {key === "figma" &&
                  "Design tokens compatible with Figma plugins and design systems"}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
