"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Share2, BookOpen } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/lib/blog";

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostClient({
  post,
  relatedPosts,
}: BlogPostClientProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatMarkdownContent = (content: string) => {
    // Simple markdown to HTML conversion
    let html = content;

    // Convert headings
    html = html.replace(
      /^### (.+)$/gm,
      '<h3 class="text-lg font-semibold mt-8 mb-4 text-foreground">$1</h3>'
    );
    html = html.replace(
      /^## (.+)$/gm,
      '<h2 class="text-xl font-semibold mt-10 mb-5 text-foreground">$1</h2>'
    );
    html = html.replace(
      /^# (.+)$/gm,
      '<h1 class="text-2xl font-bold mt-12 mb-6 text-foreground">$1</h1>'
    );

    // Convert bold and italic
    html = html.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-semibold text-foreground">$1</strong>'
    );
    html = html.replace(/\*([^*\n]+)\*/g, '<em class="italic">$1</em>');

    // Convert inline code
    html = html.replace(
      /`([^`\n]+)`/g,
      '<code class="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground border">$1</code>'
    );

    // Convert code blocks
    html = html.replace(
      /```[\w]*\n([\s\S]*?)```/g,
      '<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-6 border"><code class="text-sm font-mono text-foreground">$1</code></pre>'
    );

    // Convert links
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-primary hover:underline font-medium">$1</a>'
    );

    // Convert blockquotes
    html = html.replace(
      /^> (.+)$/gm,
      '<blockquote class="border-l-4 border-primary pl-6 py-2 italic text-muted-foreground my-6 bg-muted/30 rounded-r">$1</blockquote>'
    );

    // Convert paragraphs and handle bullet points (split by double newlines)
    const sections = html.split(/\n\s*\n/);
    html = sections
      .map((section) => {
        const trimmed = section.trim();
        if (!trimmed) return "";

        // Check if this section contains bullet points
        if (trimmed.includes("\n- ") || trimmed.startsWith("- ")) {
          // Convert bullet points to list items
          const listItems = trimmed
            .split("\n")
            .map((line) => {
              if (line.trim().startsWith("- ")) {
                const content = line.trim().substring(2);
                return `  <li class="mb-2 text-muted-foreground leading-relaxed">${content}</li>`;
              }
              return line;
            })
            .join("\n");

          return `<ul class="list-disc list-inside mb-6 space-y-2">\n${listItems}\n</ul>`;
        }

        // Check if this section contains numbered lists
        if (/^\d+\.\s/.test(trimmed) || /\n\d+\.\s/.test(trimmed)) {
          // Convert numbered points to list items
          const listItems = trimmed
            .split("\n")
            .map((line) => {
              if (/^\d+\.\s/.test(line.trim())) {
                const content = line.trim().replace(/^\d+\.\s/, "");
                return `  <li class="mb-2 text-muted-foreground leading-relaxed">${content}</li>`;
              }
              return line;
            })
            .join("\n");

          return `<ol class="list-decimal list-inside mb-6 space-y-2">\n${listItems}\n</ol>`;
        }

        // Skip if already contains HTML tags
        if (trimmed.includes("<")) {
          return trimmed;
        }

        // Convert to paragraph
        return `<p class="mb-6 text-muted-foreground leading-relaxed text-base">${trimmed.replace(
          /\n/g,
          "<br>"
        )}</p>`;
      })
      .join("\n");

    return html;
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: "url('/bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay for better readability */}
      <div className="fixed inset-0 bg-gradient-to-br from-background/10 via-background/15 to-background/70 pointer-events-none" />

      {/* Floating Navbar */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm md:max-w-none md:w-auto px-4 md:px-0">
        <div className="bg-background/95 backdrop-blur-md border border-muted-foreground/20 rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center justify-between md:justify-center md:gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link href="/">
                <span className="text-xl font-[family-name:var(--font-staatliches)] cursor-pointer">
                  Verge
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="text-sm text-foreground font-medium"
              >
                Blog
              </Link>
            </div>

            {/* Desktop CTA Button */}
            <Button
              size="sm"
              className="hidden md:flex rounded-full px-4 py-2 text-sm"
              asChild
            >
              <Link href="/app">Generate Now</Link>
            </Button>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-16">
        {/* Back Button */}
        <div className="max-w-3xl mx-auto px-6 mb-8">
          <Button variant="ghost" size="sm" asChild className="group">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <article className="max-w-3xl mx-auto px-6">
          {/* Article Content */}
          <div className="prose prose-base max-w-none">
            {post.content ? (
              <div
                className="article-content"
                dangerouslySetInnerHTML={{
                  __html: formatMarkdownContent(post.content),
                }}
              />
            ) : (
              <Card className="bg-background/80 backdrop-blur-sm border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <BookOpen className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-3">
                      Content Not Available
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 max-w-lg mx-auto">
                      The content for this blog post could not be loaded. Please
                      check back later.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-muted-foreground/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h4 className="font-medium mb-1">Written by {post.author}</h4>
                <p className="text-sm text-muted-foreground">
                  Creating beautiful, accessible color palettes for designers
                  and developers.
                </p>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-3 w-3" />
                Share this article
              </Button>
            </div>
          </footer>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold mb-2">Related Articles</h2>
                <p className="text-sm text-muted-foreground">
                  Continue exploring our design insights
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.slug}
                    className="group overflow-hidden bg-background/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <CardContent className="p-4">
                      <div className="mb-2 flex flex-wrap gap-1">
                        {relatedPost.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs font-normal tracking-wide uppercase px-1.5 py-0.5"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <h3 className="text-sm font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
                          {relatedPost.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {relatedPost.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium">
                          {relatedPost.author}
                        </span>
                        <span>•</span>
                        <span>{formatDate(relatedPost.date)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
