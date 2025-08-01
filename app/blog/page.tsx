import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { getBlogPosts, BlogPost } from "@/lib/blog";
import BlogPageClient from "./BlogPageClient";

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

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
      <div className="fixed inset-0 bg-gradient-to-br from-background/80 via-background/70 to-background/80 pointer-events-none" />

      {/* Floating Navbar */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm md:max-w-none md:w-auto px-4 md:px-0">
        <div className="bg-background/90 backdrop-blur-md border border-muted-foreground/20 rounded-full px-6 py-3 shadow-lg">
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

      <BlogPageClient blogPosts={blogPosts} />
    </div>
  );
}
