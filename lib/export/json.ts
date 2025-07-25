import { ColorPalette } from "@/types/palette";
import { ExportFormat, ExportOptions } from "@/types/export";

export function exportToJSON(
  palette: ColorPalette,
  options: ExportOptions = {}
): ExportFormat {
  const { includeMetadata = true, format = "pretty" } = options;

  const exportData = {
    ...(includeMetadata && {
      metadata: {
        name: palette.name,
        id: palette.id,
        createdAt: palette.createdAt.toISOString(),
        theme: palette.theme,
      },
    }),
    colors: {
      primary: palette.primary,
      secondary: palette.secondary,
      accent: palette.accent,
      background: palette.background,
      text: palette.text,
      surface: palette.surface,
    },
  };

  const content =
    format === "minified"
      ? JSON.stringify(exportData)
      : JSON.stringify(exportData, null, 2);

  return {
    type: "json",
    content,
    filename: `${palette.name.toLowerCase().replace(/\s+/g, "-")}-palette.json`,
  };
}
