"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Menu,
  Paintbrush,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      <div className="fixed inset-0 bg-gradient-to-br from-background/20 via-background/10 to-background/30 pointer-events-none" />

      {/* Floating Navbar */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm md:max-w-none md:w-auto px-4 md:px-0">
        <div className="bg-background/90 backdrop-blur-md border border-muted-foreground/20 rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center justify-between md:justify-center md:gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-[family-name:var(--font-staatliches)]">
                Verge
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <button
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </button>

              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 bg-background/95 backdrop-blur-md border border-muted-foreground/20 rounded-2xl p-4 shadow-lg">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <button
                onClick={() => {
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" });
                  setIsMobileMenuOpen(false);
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 text-left"
              >
                Features
              </button>
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <div className="pt-2 border-t border-muted-foreground/20">
                <Button
                  size="sm"
                  className="w-full rounded-full px-4 py-2 text-sm"
                  asChild
                >
                  <Link href="/app" onClick={() => setIsMobileMenuOpen(false)}>
                    Generate Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center px-12 md:px-16 lg:px-24 xl:px-32">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              {/* Left Side - Text and Buttons */}
              <div
                className={`text-center lg:text-left transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
              >
                <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  Open Source Color Palette Generator
                </Badge>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Your Palette,
                  <br />
                  <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Perfected
                  </span>
                </h1>

                <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Generate beautiful, accessible color palettes for your design
                  projects. Create harmonious color schemes with real-time
                  preview and export to multiple formats.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
                  <Button size="default" className="gap-2 px-6 py-3" asChild>
                    <Link href="/app">
                      <Sparkles className="h-4 w-4" />
                      Start Creating
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="default"
                    className="gap-2 px-6 py-3"
                    asChild
                  >
                    <Link
                      href="https://github.com/aditisingh02/verge"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View on GitHub
                    </Link>
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-6 max-w-sm mx-auto lg:mx-0">
                  <div className="text-center lg:text-left">
                    <div className="text-xl md:text-2xl font-bold text-primary mb-1">
                      4+
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Harmony Types
                    </div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-xl md:text-2xl font-bold text-primary mb-1">
                      WCAG
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Compliant
                    </div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-xl md:text-2xl font-bold text-primary mb-1">
                      4+
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Export Formats
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Verge GIF */}
              <div
                className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
              >
                <Image
                  src="/verge.gif"
                  alt="Verge"
                  width={384}
                  height={384}
                  className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-3xl object-contain"
                  style={{ aspectRatio: "1/1" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-20 px-12 md:px-16 lg:px-24 xl:px-32"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                Features
              </Badge>
              <h2 className="text-4xl font-bold mb-4">
                Everything you need for perfect palettes
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Powerful tools and features designed to help you create
                accessible, beautiful color schemes
              </p>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 min-h-[500px] border-2 border-dashed border-muted-foreground/30">
              {/* Large Feature - Smart Color Generation (Top Left, spans 2x2) */}
              <div className="lg:col-span-2 lg:row-span-2 border-r-2 border-b-2 border-dashed border-muted-foreground/30 hover:border-primary/60 transition-all duration-300 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="text-2xl font-semibold mb-4">
                  Smart Color Generation
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Generate harmonious color palettes using color theory
                  principles - complementary, analogous, triadic, and
                  split-complementary schemes.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    Complementary
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Analogous
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Triadic
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Split-complementary
                  </Badge>
                </div>
              </div>

              {/* Top Right - Accessibility */}
              <div className="lg:col-span-1 lg:row-span-1 border-b-2 border-dashed border-muted-foreground/30 hover:border-primary/60 transition-all duration-300 p-6 bg-background/50 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-3">
                  Accessibility First
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Real-time WCAG compliance checking with AA/AAA contrast ratio
                  validation to ensure your colors are accessible to everyone.
                </p>
              </div>

              {/* Top Far Right - Color Vision */}
              <div className="lg:col-span-1 lg:row-span-1 border-b-2 border-l-2 border-dashed border-muted-foreground/30 hover:border-primary/60 transition-all duration-300 p-6 bg-background/50 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-3">
                  Color Vision Support
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Test your palettes for different types of color blindness to
                  create inclusive designs that work for all users.
                </p>
              </div>

              {/* Right Side - Verge in Action with Screenshot (spans 2x2) */}
              <div className="lg:col-span-2 lg:row-span-2 border-l-2 border-dashed border-muted-foreground/30 p-6 bg-background/50 backdrop-blur-sm hover:bg-background/60 transition-all duration-300">
                <div className="h-full flex flex-col">
                  <Image
                    src="/verge-screen.png"
                    alt="Verge Application Screenshot"
                    width={400}
                    height={240}
                    className="w-auto h-60 object-contain rounded border border-muted-foreground/20 bg-background p-2"
                  />
                </div>
              </div>

              {/* Bottom Left - Export Formats (Below Smart Color Generation) */}
              <div className="lg:col-span-1 lg:row-span-1 border-r-2 border-dashed border-muted-foreground/30 hover:border-primary/60 transition-all duration-300 p-6 bg-background/50 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-3">
                  Multiple Export Formats
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Ready-to-use code for any project
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    CSS Variables
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Tailwind Config
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    JSON
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Figma Tokens
                  </Badge>
                </div>
              </div>

              {/* Bottom Center - Real-time Preview (Below Smart Color Generation) */}
              <div className="lg:col-span-1 lg:row-span-1 border-l-2 border-dashed border-muted-foreground/30 hover:border-primary/60 transition-all duration-300 p-6 bg-background/50 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-3">
                  Real-time Preview
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  See your colors applied to actual UI components instantly.
                  Toggle between light and dark themes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility Section */}
        <section className="py-20 px-12 md:px-16 lg:px-24 xl:px-32 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">
                  Accessibility First
                </Badge>
                <h2 className="text-4xl font-bold mb-6">Built for everyone</h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Verge automatically checks your color combinations against
                  WCAG guidelines, ensuring your designs are accessible to users
                  with different visual abilities.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>WCAG 2.1 AA/AAA compliance checking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Color blindness simulation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Real-time contrast ratio calculation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Accessibility recommendations</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <Card className="p-8 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Contrast Ratio</span>
                      <Badge variant="secondary">AA Compliant</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <span className="text-sm">Primary on Background</span>
                        <span className="font-mono text-sm">4.7:1</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <span className="text-sm">Secondary on Background</span>
                        <span className="font-mono text-sm">7.2:1</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <span className="text-sm">Accent on Background</span>
                        <span className="font-mono text-sm">5.1:1</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-12 md:px-16 lg:px-24 xl:px-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to create amazing palettes?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join designers and developers who trust Verge for their color
              palette needs
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 text-lg px-8 py-6" asChild>
                <Link href="/app">
                  <Paintbrush className="h-5 w-5" />
                  Start Creating Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 text-lg px-8 py-6"
                asChild
              >
                <Link
                  href="https://github.com/aditisingh02/verge"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-5 w-5" />
                  Star on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/80 backdrop-blur-sm py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Image
                src="/verge.gif"
                alt="Verge"
                width={32}
                height={32}
                className="w-8 h-8 rounded-lg object-cover"
                style={{ aspectRatio: "1/1" }}
              />
              <div>
                <h3 className="font-bold font-[family-name:var(--font-staatliches)]">
                  Verge
                </h3>
                <p className="text-xs text-muted-foreground">
                  Your Palette, Perfected
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link
                href="https://github.com/aditisingh02/verge"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </Link>
              <span>•</span>
              <span>Built with ❤️ by Aditi Singh</span>
              <span>•</span>
              <span>MIT License</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
