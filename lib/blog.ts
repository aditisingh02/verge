import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  author: string;
  image?: string;
  content?: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const blogDir = path.join(process.cwd(), "app/blog");

  try {
    const entries = fs.readdirSync(blogDir, { withFileTypes: true });
    const blogPosts: BlogPost[] = [];

    for (const entry of entries) {
      if (entry.isDirectory() && entry.name !== "page.tsx") {
        const mdxPath = path.join(blogDir, entry.name, "page.mdx");

        if (fs.existsSync(mdxPath)) {
          try {
            const content = fs.readFileSync(mdxPath, "utf-8");
            const metadata = extractMetadata(content);

            if (metadata) {
              blogPosts.push({
                slug: entry.name,
                ...metadata,
                image: getImageForPost(entry.name),
              });
            }
          } catch (error) {
            console.error(`Error reading ${entry.name}:`, error);
          }
        }
      }
    }

    // Sort by date (newest first)
    return blogPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error reading blog directory:", error);
    return [];
  }
}

function extractMetadata(
  content: string
): Omit<BlogPost, "slug" | "image"> | null {
  try {
    // Extract metadata object from the MDX file
    const metadataMatch = content.match(
      /export const metadata = \{([\s\S]*?)\};/
    );
    if (!metadataMatch) return null;

    const metadataString = metadataMatch[1];

    // Parse the metadata (this is a simplified parser)
    const titleMatch = metadataString.match(/title:\s*["']([^"']+)["']/);
    const descriptionMatch = metadataString.match(
      /description:\s*["']([^"']+)["']/
    );
    const dateMatch = metadataString.match(/date:\s*["']([^"']+)["']/);
    const readTimeMatch = metadataString.match(/readTime:\s*["']([^"']+)["']/);
    const authorMatch = metadataString.match(/author:\s*["']([^"']+)["']/);
    const tagsMatch = metadataString.match(/tags:\s*\[(.*?)\]/);

    let tags: string[] = [];
    if (tagsMatch) {
      tags = tagsMatch[1]
        .split(",")
        .map((tag) => tag.trim().replace(/["']/g, ""))
        .filter((tag) => tag.length > 0);
    }

    // Extract the actual MDX content (everything after the closing </BlogLayout>)
    const contentMatch = content.match(
      /<BlogLayout metadata=\{metadata\}>([\s\S]*?)<\/BlogLayout>/
    );
    let mdxContent = "";
    if (contentMatch) {
      mdxContent = contentMatch[1].trim();
      // Remove the first heading if it matches the title
      mdxContent = mdxContent.replace(/^#\s+.*?\n\n?/, "");
    }

    if (!titleMatch || !descriptionMatch || !dateMatch) return null;

    return {
      title: titleMatch[1],
      description: descriptionMatch[1],
      date: dateMatch[1],
      readTime: readTimeMatch?.[1] || "5 min read",
      author: authorMatch?.[1] || "Verge Team",
      tags,
      content: mdxContent,
    };
  } catch (error) {
    console.error("Error parsing metadata:", error);
    return null;
  }
}

function getImageForPost(slug: string): string {
  // Map blog post slugs to appropriate Unsplash images
  const imageMap: Record<string, string> = {
    "accessibility-in-design":
      "https://source.unsplash.com/800x600/accessibility",
    "color-theory-basics": "https://source.unsplash.com/800x600/color-palette",
    default: "https://source.unsplash.com/800x600/design",
  };

  return imageMap[slug] || imageMap.default;
}
