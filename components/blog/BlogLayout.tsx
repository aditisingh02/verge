import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

interface BlogMetadata {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  author: string;
}

interface BlogLayoutProps {
  metadata: BlogMetadata;
  children: React.ReactNode;
}

export function BlogLayout({ metadata, children }: BlogLayoutProps) {
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
      <div className="fixed inset-0 pointer-events-none" />

      <div className="relative z-10 px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <header className="mb-12 text-center">
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(metadata.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {metadata.readTime}
              </div>
              <span>by {metadata.author}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {metadata.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              {metadata.description}
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {metadata.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none bg-background/80 backdrop-blur-sm rounded-lg p-8 md:p-12">
            <div className="prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:border">
              {children}
            </div>
          </article>

          {/* Footer */}
          <footer className="mt-12 text-center">
            <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">
                Enjoyed this article?
              </h3>
              <p className="text-muted-foreground mb-4">
                Try creating your own color palettes with Verge
              </p>
              <div className="flex gap-3 justify-center">
                <Button asChild>
                  <Link href="/app">Try Verge</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/blog">More Articles</Link>
                </Button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
