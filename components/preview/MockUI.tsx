"use client";

import { ColorPalette } from "@/types/palette";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Bell, User, Heart, Star, ShoppingCart } from "lucide-react";

interface MockUIProps {
  palette: ColorPalette;
  theme: "light" | "dark";
}

export function MockUI({ palette, theme }: MockUIProps) {
  const backgroundColor =
    theme === "light"
      ? palette.background.light.hex
      : palette.background.dark.hex;
  const textColor =
    theme === "light" ? palette.text.light.hex : palette.text.dark.hex;
  const surfaceColor =
    theme === "light" ? palette.surface.light.hex : palette.surface.dark.hex;

  const styles = {
    container: {
      backgroundColor,
      color: textColor,
    },
    surface: {
      backgroundColor: surfaceColor,
      color: textColor,
    },
    primary: {
      backgroundColor: palette.primary.hex,
      color: "#ffffff",
    },
    secondary: {
      backgroundColor: palette.secondary.hex,
      color: "#ffffff",
    },
    accent: {
      backgroundColor: palette.accent.hex,
      color: "#ffffff",
    },
  };

  return (
    <div className="min-h-full p-4 space-y-4" style={styles.container}>
      {/* Navigation Bar */}
      <div
        className="flex items-center justify-between p-3 rounded-lg"
        style={styles.surface}
      >
        <div className="flex items-center gap-3">
          <div className="text-lg font-bold">Verge</div>
          <nav className="hidden sm:flex items-center gap-4 text-sm">
            <a href="#" className="hover:opacity-80">
              Home
            </a>
            <a href="#" className="hover:opacity-80">
              Features
            </a>
            <a href="#" className="hover:opacity-80">
              Pricing
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Bell className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <User className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center py-6 space-y-3">
        <h1 className="text-xl font-bold">Your Palette, Perfected.</h1>
        <p className="text-sm opacity-80">
          Generate harmonious colors for your next project
        </p>
        <div className="flex justify-center gap-2">
          <Button size="sm" style={styles.primary}>
            Get Started
          </Button>
          <Button
            size="sm"
            variant="outline"
            style={{
              borderColor: palette.primary.hex,
              color: palette.primary.hex,
            }}
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-xs mx-auto">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 opacity-50" />
          <Input
            placeholder="Search colors..."
            className="pl-8 h-8 text-sm"
            style={{
              backgroundColor: surfaceColor,
              borderColor: palette.primary.hex + "40",
            }}
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card
          className="text-xs border p-3"
          style={{
            backgroundColor: surfaceColor,
            borderColor: palette.primary.hex + "20",
            color: textColor,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Primary Card</h3>
            <Heart
              className="h-3.5 w-3.5"
              style={{ color: palette.primary.hex }}
            />
          </div>
          <p className="text-xs opacity-80 mb-4">
            This card demonstrates the primary color scheme.
          </p>
          <div className="flex flex-wrap gap-1">
            <Badge
              className="text-xs px-2 py-0.5 border-0"
              style={{
                backgroundColor: palette.primary.hex + "20",
                color: palette.primary.hex,
              }}
            >
              Primary
            </Badge>
            <Badge
              variant="outline"
              style={{
                borderColor: palette.secondary.hex + "40",
                color: palette.secondary.hex,
                backgroundColor: "transparent",
              }}
              className="text-xs px-2 py-0.5"
            >
              Secondary
            </Badge>
          </div>
        </Card>

        <Card
          className="text-xs border p-3"
          style={{
            backgroundColor: surfaceColor,
            borderColor: palette.secondary.hex + "20",
            color: textColor,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Feature Card</h3>
            <Star
              className="h-3.5 w-3.5"
              style={{ color: palette.secondary.hex }}
            />
          </div>
          <p className="text-xs opacity-80 mb-4">
            Secondary colors for highlighting features.
          </p>
          <Button
            size="sm"
            className="h-7 text-xs border-0 w-full"
            style={{
              backgroundColor: palette.secondary.hex + "15",
              color: palette.secondary.hex,
              border: `1px solid ${palette.secondary.hex}40`,
            }}
          >
            Learn More
          </Button>
        </Card>

        <Card
          className="text-xs sm:col-span-2 lg:col-span-1 border p-3"
          style={{
            backgroundColor: surfaceColor,
            borderColor: palette.accent.hex + "20",
            color: textColor,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Action Card</h3>
            <ShoppingCart
              className="h-3.5 w-3.5"
              style={{ color: palette.accent.hex }}
            />
          </div>
          <p className="text-xs opacity-80 mb-4">
            Accent colors for call-to-action elements.
          </p>
          <Button
            size="sm"
            className="h-7 text-xs border-0 w-full"
            style={{
              backgroundColor: palette.accent.hex + "15",
              color: palette.accent.hex,
              border: `1px solid ${palette.accent.hex}40`,
            }}
          >
            Add to Cart
          </Button>
        </Card>
      </div>

      {/* Form Example */}
      <Card style={styles.surface}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Contact Form</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-medium mb-1 block">Name</label>
              <Input
                placeholder="Your name"
                className="h-8 text-xs"
                style={{ backgroundColor }}
              />
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">Email</label>
              <Input
                placeholder="your@email.com"
                className="h-8 text-xs"
                style={{ backgroundColor }}
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block">Message</label>
            <textarea
              placeholder="Your message..."
              className="w-full p-2 rounded-md border resize-none text-xs"
              rows={2}
              style={{
                backgroundColor,
                borderColor: palette.primary.hex + "40",
              }}
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" style={styles.primary} className="h-7 text-xs">
              Send Message
            </Button>
            <Button
              size="sm"
              variant="outline"
              style={{
                borderColor: palette.secondary.hex,
                color: palette.secondary.hex,
              }}
              className="h-7 text-xs"
            >
              Save Draft
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
