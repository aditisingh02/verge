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

  // Get featured post (most recent)
  const featuredPost = blogPosts[0];

  // Get sidebar posts (next 3 most recent, or repeat if not enough)
  const sidebarPosts =
    blogPosts.length > 1
      ? blogPosts.slice(1, 4)
      : Array(3).fill(blogPosts[0]).filter(Boolean);

  // Get remaining posts for grid (or repeat existing ones)
  const gridPosts =
    blogPosts.length > 1
      ? [...blogPosts.slice(1), ...blogPosts].slice(0, 3)
      : Array(3).fill(blogPosts[0]).filter(Boolean);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const truncateTitle = (title: string, maxLength: number = 60) => {
    return title.length > maxLength
      ? title.substring(0, maxLength) + "..."
      : title;
  };

  const getMainCategory = (tags: string[]) => {
    return tags[0]?.toUpperCase() || "BLOG";
  };

  if (!featuredPost) {
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
      {/* Hero News Section */}
      <section className="relative z-10 pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Featured News Card */}
            <div>
              <Card className="group overflow-hidden bg-background/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-[16/9] overflow-hidden">
                  <Image
                    src={
                      featuredPost.image ||
                      "https://source.unsplash.com/800x450/design"
                    }
                    alt={featuredPost.title}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge
                    variant="secondary"
                    className="mb-4 text-xs font-medium tracking-wide"
                  >
                    {getMainCategory(featuredPost.tags)}
                  </Badge>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h1 className="text-3xl font-bold leading-tight mb-6 group-hover:text-primary transition-colors cursor-pointer">
                      {featuredPost.title}
                    </h1>
                  </Link>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">{featuredPost.author}</span>
                    <span>•</span>
                    <span>{formatDate(featuredPost.date)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Smaller Horizontal Cards */}
            <div className="space-y-6">
              {sidebarPosts.map((post, index) => (
                <Card
                  key={`${post.slug}-${index}`}
                  className="group overflow-hidden bg-background/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex gap-4 p-4">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-lg overflow-hidden">
                        <Image
                          src={
                            post.image ||
                            "https://source.unsplash.com/80x80/design"
                          }
                          alt={post.title}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Badge variant="outline" className="mb-2 text-xs">
                        {getMainCategory(post.tags)}
                      </Badge>
                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
                          {truncateTitle(post.title)}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Secondary News Section */}
      <section className="relative z-10 py-16 px-6 bg-background/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          {/* Section Headline */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-8">Latest Design Insights</h2>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-6 py-2 text-sm transition-all duration-200 ${
                    activeCategory === category
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "hover:bg-muted"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post, index) => (
              <Card
                key={`${post.slug}-grid-${index}`}
                className="group overflow-hidden bg-background/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={
                      post.image || "https://source.unsplash.com/600x400/design"
                    }
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge
                    variant="secondary"
                    className="mb-3 text-xs font-medium tracking-wide"
                  >
                    {getMainCategory(post.tags)}
                  </Badge>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">{post.author}</span>
                    <span>•</span>
                    <span>{formatDate(post.date)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
