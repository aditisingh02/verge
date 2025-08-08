"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog";

interface BlogPageClientProps {
  blogPosts: BlogPost[];
}

export default function BlogPageClient({ blogPosts }: BlogPageClientProps) {
  const [activeCategory, setActiveCategory] = useState("All Categories");

  const categories = [
    "All Categories",
    "Design",
    "Accessibility",
    "Color Theory",
    "Development",
    "WCAG",
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getImageForPost = (slug: string) => {
    const imageMap: Record<string, string> = {
      "accessibility-in-design": "/cube.gif",
      "color-theory-basics": "/verge-screen.png",
      default: "/verge.gif",
    };
    return imageMap[slug] || imageMap.default;
  };

  if (!blogPosts.length) {
    return (
      <div className="relative z-10 pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">No Blog Posts Found</h1>
          <p className="text-muted-foreground">
            Check back later for new content!
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            The latest news, tips, and insights about color theory, design
            systems, and accessibility.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Blog Posts List */}
          <div className="space-y-16">
            {blogPosts.map((post, index) => (
              <article key={post.slug} className="group">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
                  {/* Date Column */}
                  <div className="md:text-right">
                    <time className="text-sm text-muted-foreground font-medium">
                      {formatDate(post.date)}
                    </time>
                  </div>

                  {/* Content Column */}
                  <div className="md:col-span-2 space-y-3">
                    <Link href={`/blog/${post.slug}`} className="group">
                      <h2 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                    </Link>

                    {/* Tags below title - smaller */}
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag: string) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs font-medium bg-muted/50 hover:bg-muted transition-colors px-2 py-0.5"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {post.description}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="font-medium">{post.author}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>

                  {/* Image Column */}
                  <div className="md:col-span-1">
                    <Link href={`/blog/${post.slug}`} className="block group">
                      <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={getImageForPost(post.slug)}
                          alt={post.title}
                          width={200}
                          height={150}
                          unoptimized={post.slug === "accessibility-in-design"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Divider */}
                {index < blogPosts.length - 1 && (
                  <div className="mt-16 border-b border-muted-foreground/10" />
                )}
              </article>
            ))}
          </div>

          {/* Load More / Pagination */}
          <div className="mt-20 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/">← Back to Home</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
