export interface ExportFormat {
  type: "json" | "css" | "tailwind" | "figma";
  content: string;
  filename: string;
}

export interface ExportOptions {
  includeMetadata?: boolean;
  format?: "minified" | "pretty";
  prefix?: string;
}
