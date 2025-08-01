"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  Share2,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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

  const getMainCategory = (tags: string[]) => {
    return tags[0]?.toUpperCase() || "BLOG";
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
      <div className="fixed inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/90 pointer-events-none" />

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
        <div className="max-w-4xl mx-auto px-6 mb-8">
          <Button variant="ghost" size="sm" asChild className="group">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-6">
          <header className="mb-12">
            {/* Category Badge */}
            <div className="mb-6">
              <Badge
                variant="secondary"
                className="text-sm font-medium tracking-wide"
              >
                {getMainCategory(post.tags)}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              {post.description}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Featured Image */}
            <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-12 shadow-2xl">
              <Image
                src={
                  post.image || "https://source.unsplash.com/1200x675/design"
                }
                alt={post.title}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Share Button */}
            <div className="flex justify-center mb-12">
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share Article
              </Button>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <Card className="bg-background/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-12">
                <div className="text-center py-16">
                  <BookOpen className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
                  <h3 className="text-2xl font-bold mb-4">Article Content</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    This is where the full MDX content would be rendered. The
                    actual blog post content from the MDX file would appear here
                    with proper styling and formatting.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Post:</strong> {post.title}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Article Footer */}
          <footer className="mt-16 pt-12 border-t border-muted-foreground/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h4 className="font-semibold mb-2">Written by {post.author}</h4>
                <p className="text-sm text-muted-foreground">
                  Creating beautiful, accessible color palettes for designers
                  and developers.
                </p>
              </div>
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share this article
              </Button>
            </div>
          </footer>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-24 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Related Articles</h2>
                <p className="text-muted-foreground">
                  Continue exploring our design insights
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.slug}
                    className="group overflow-hidden bg-background/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <Image
                        src={
                          relatedPost.image ||
                          "https://source.unsplash.com/600x375/design"
                        }
                        alt={relatedPost.title}
                        width={600}
                        height={375}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Badge
                        variant="secondary"
                        className="mb-3 text-xs font-medium tracking-wide"
                      >
                        {getMainCategory(relatedPost.tags)}
                      </Badge>
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
                          {relatedPost.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
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

        {/* Newsletter CTA */}
        <section className="mt-24 px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-12 text-center">
                <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Get the latest articles about design, color theory, and
                  accessibility delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg border border-input bg-background"
                  />
                  <Button className="px-8">Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
