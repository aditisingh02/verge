"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

export default function BlogPage() {
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

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Magazine Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Large Featured Article - Top Left */}
          <div className="lg:row-span-2">
            <Card className="group h-full overflow-hidden bg-background/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src="/verge-screen.png"
                  alt="E-Learning App Design"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  E-Learning App Design And How To Make It Better
                </h2>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  Kids and adults are becoming more and more techno-savvy,
                  especially the kids who are able to adapt to all kinds of
                  gadgets from a very small age.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    #DESIGN
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Medium Article - Top Center */}
          <div className="lg:col-span-2">
            <Card className="group h-full overflow-hidden bg-background/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col lg:flex-row h-full">
                <div className="lg:w-2/3 aspect-[16/9] lg:aspect-auto overflow-hidden">
                  <Image
                    src="/cube.gif"
                    alt="Apple M1 Development"
                    width={600}
                    height={300}
                    unoptimized
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="lg:w-1/3 p-6 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                    How Apple&apos;s M1 Chips Make macOS Development Much Less
                    Costly
                  </h2>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-4">
                    The macOS market share is much smaller than the iOS one.
                    There are many, many more iPhones out there, they dominate
                    Apple&apos;s revenues so that&apos;s where most of their
                    attention goes.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      #DEVELOPMENT
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      #MANAGEMENT
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Small Article - Bottom Left */}
          <div>
            <Card className="group h-full overflow-hidden bg-background/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                  How to Integrate Combine with SwiftUI to Make Better Apps
                </h3>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    #DESIGN
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar Articles */}
          <div className="space-y-6">
            <Card className="group overflow-hidden bg-background/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex gap-4 p-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <Image
                      src="/verge.gif"
                      alt="Web Development"
                      width={64}
                      height={64}
                      unoptimized
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
                    How To Outsource Web Development And Web Design
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Everything is within reach of today&apos;s individual. All
                    you need is a phone or a laptop. We are no longer restricted
                    by our location and have the ability to expand our influence
                    beyond spatial limitations.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>#DESIGN</span>
                    <span>•</span>
                    <span>#DEVELOPMENT</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="group overflow-hidden bg-background/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex gap-4 p-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <Image
                      src="/verge.png"
                      alt="Design Systems"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
                    What Makes Something Intuitive?
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>#DESIGN</span>
                    <span>•</span>
                    <span>#UX</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
