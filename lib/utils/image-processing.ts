import { Color } from "@/types/color";
import { createColor } from "@/lib/color/formats";

export interface ExtractedColors {
  dominant: Color[];
  palette: Color[];
}

export function extractColorsFromImage(
  imageFile: File
): Promise<ExtractedColors> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      try {
        // Set canvas size
        const maxSize = 200; // Reduce image size for faster processing
        const scale = Math.min(maxSize / img.width, maxSize / img.height);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        // Draw image to canvas
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Get image data
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        if (!imageData) {
          reject(new Error("Failed to get image data"));
          return;
        }

        // Extract colors
        const colors = extractDominantColors(imageData);
        resolve(colors);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    // Create object URL and load image
    const objectUrl = URL.createObjectURL(imageFile);
    img.src = objectUrl;

    // Clean up object URL after loading
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      img.onload(); // Call the original onload
    };
  });
}

function extractDominantColors(imageData: ImageData): ExtractedColors {
  const data = imageData.data;
  const colorCounts: { [key: string]: number } = {};

  // Sample every 4th pixel for performance
  for (let i = 0; i < data.length; i += 16) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    // Skip transparent pixels
    if (a < 128) continue;

    // Quantize colors to reduce noise
    const quantizedR = Math.floor(r / 32) * 32;
    const quantizedG = Math.floor(g / 32) * 32;
    const quantizedB = Math.floor(b / 32) * 32;

    const colorKey = `${quantizedR},${quantizedG},${quantizedB}`;
    colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
  }

  // Sort colors by frequency
  const sortedColors = Object.entries(colorCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10) // Take top 10 colors
    .map(([colorKey]) => {
      const [r, g, b] = colorKey.split(",").map(Number);
      return createColor(`rgb(${r}, ${g}, ${b})`);
    });

  // Filter out very similar colors
  const distinctColors = filterSimilarColors(sortedColors);

  return {
    dominant: distinctColors.slice(0, 5),
    palette: distinctColors,
  };
}

function filterSimilarColors(colors: Color[], threshold: number = 30): Color[] {
  const filtered: Color[] = [];

  for (const color of colors) {
    const isSimilar = filtered.some((existingColor) => {
      const rDiff = Math.abs(color.rgb.r - existingColor.rgb.r);
      const gDiff = Math.abs(color.rgb.g - existingColor.rgb.g);
      const bDiff = Math.abs(color.rgb.b - existingColor.rgb.b);

      return rDiff + gDiff + bDiff < threshold;
    });

    if (!isSimilar) {
      filtered.push(color);
    }
  }

  return filtered;
}

export function isValidImageFile(file: File): boolean {
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml"];
  return validTypes.includes(file.type);
}

export function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };

    img.src = objectUrl;
  });
}
