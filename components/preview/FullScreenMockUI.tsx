"use client";

import { ColorPalette } from "@/types/palette";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Bell,
  User,
  Heart,
  Star,
  ShoppingCart,
  Menu,
  Settings,
  Home,
  Folder,
  Mail,
  Calendar,
  BarChart3,
} from "lucide-react";

interface FullScreenMockUIProps {
  palette: ColorPalette;
  theme: "light" | "dark";
}

export function FullScreenMockUI({ palette, theme }: FullScreenMockUIProps) {
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
    <div className="w-full h-full min-h-[600px] flex" style={styles.container}>
      {/* Sidebar */}
      <div
        className="w-64 border-r"
        style={{
          backgroundColor: surfaceColor,
          borderColor: palette.primary.hex + "20",
        }}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={styles.primary}
            >
              <div className="w-4 h-4 bg-white rounded"></div>
            </div>
            <div className="text-xl font-bold">Verge</div>
          </div>

          <nav className="space-y-2">
            <div
              className="flex items-center gap-3 p-3 rounded-lg"
              style={styles.primary}
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-opacity-10 hover:bg-white transition-colors">
              <Folder className="h-5 w-5" />
              <span>Projects</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-opacity-10 hover:bg-white transition-colors">
              <BarChart3 className="h-5 w-5" />
              <span>Analytics</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-opacity-10 hover:bg-white transition-colors">
              <Mail className="h-5 w-5" />
              <span>Messages</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-opacity-10 hover:bg-white transition-colors">
              <Calendar className="h-5 w-5" />
              <span>Calendar</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-opacity-10 hover:bg-white transition-colors">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div
          className="border-b p-4"
          style={{
            backgroundColor: surfaceColor,
            borderColor: palette.primary.hex + "20",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold">Color Palette Dashboard</h1>
                <p className="text-sm opacity-70">
                  Manage your design system colors
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                <Input
                  placeholder="Search palettes..."
                  className="pl-10 w-64"
                  style={{
                    backgroundColor,
                    borderColor: palette.primary.hex + "40",
                  }}
                />
              </div>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 space-y-6 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card style={styles.surface}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-70">Total Palettes</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={styles.primary}
                  >
                    <Folder className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card style={styles.surface}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-70">Favorites</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={styles.secondary}
                  >
                    <Heart className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card style={styles.surface}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-70">Exports</p>
                    <p className="text-2xl font-bold">156</p>
                  </div>
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={styles.accent}
                  >
                    <ShoppingCart className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card style={styles.surface}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-70">Accessibility</p>
                    <p className="text-2xl font-bold">98%</p>
                  </div>
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#10B981", color: "#ffffff" }}
                  >
                    <Star className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Palettes */}
          <Card style={styles.surface}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Color Palettes</span>
                <Button size="sm" style={styles.primary}>
                  Create New
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card
                  style={{
                    backgroundColor: backgroundColor,
                    border: `1px solid ${palette.primary.hex}40`,
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex gap-1">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: palette.primary.hex }}
                        ></div>
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: palette.secondary.hex }}
                        ></div>
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: palette.accent.hex }}
                        ></div>
                      </div>
                      <Badge style={styles.primary} className="text-xs">
                        Active
                      </Badge>
                    </div>
                    <h4 className="font-semibold mb-1">Current Palette</h4>
                    <p className="text-sm opacity-70">Modern design system</p>
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        style={{
                          borderColor: palette.secondary.hex,
                          color: palette.secondary.hex,
                        }}
                      >
                        Edit
                      </Button>
                      <Button size="sm" style={styles.accent}>
                        Export
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  style={{
                    backgroundColor: backgroundColor,
                    border: `1px solid ${palette.primary.hex}20`,
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex gap-1">
                        <div className="w-4 h-4 rounded bg-blue-500"></div>
                        <div className="w-4 h-4 rounded bg-purple-500"></div>
                        <div className="w-4 h-4 rounded bg-pink-500"></div>
                      </div>
                      <Badge variant="outline">Saved</Badge>
                    </div>
                    <h4 className="font-semibold mb-1">Ocean Breeze</h4>
                    <p className="text-sm opacity-70">Cool and calming tones</p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        Export
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  style={{
                    backgroundColor: backgroundColor,
                    border: `1px solid ${palette.primary.hex}20`,
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex gap-1">
                        <div className="w-4 h-4 rounded bg-orange-500"></div>
                        <div className="w-4 h-4 rounded bg-red-500"></div>
                        <div className="w-4 h-4 rounded bg-yellow-500"></div>
                      </div>
                      <Badge variant="outline">Archived</Badge>
                    </div>
                    <h4 className="font-semibold mb-1">Sunset Glow</h4>
                    <p className="text-sm opacity-70">Warm and energetic</p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        Export
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Color Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card style={styles.surface}>
              <CardHeader>
                <CardTitle>Accessibility Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: backgroundColor }}
                  >
                    <span className="text-sm">Text on Background</span>
                    <Badge
                      style={{ backgroundColor: "#10B981", color: "#ffffff" }}
                    >
                      AAA
                    </Badge>
                  </div>
                  <div
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: backgroundColor }}
                  >
                    <span className="text-sm">Primary on Background</span>
                    <Badge
                      style={{ backgroundColor: "#F59E0B", color: "#ffffff" }}
                    >
                      AA
                    </Badge>
                  </div>
                  <div
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: backgroundColor }}
                  >
                    <span className="text-sm">Secondary on Surface</span>
                    <Badge
                      style={{ backgroundColor: "#10B981", color: "#ffffff" }}
                    >
                      AAA
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card style={styles.surface}>
              <CardHeader>
                <CardTitle>Export History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: backgroundColor }}
                  >
                    <div>
                      <p className="text-sm font-medium">Tailwind Config</p>
                      <p className="text-xs opacity-70">2 hours ago</p>
                    </div>
                    <Badge style={styles.primary}>CSS</Badge>
                  </div>
                  <div
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: backgroundColor }}
                  >
                    <div>
                      <p className="text-sm font-medium">Figma Tokens</p>
                      <p className="text-xs opacity-70">1 day ago</p>
                    </div>
                    <Badge style={styles.secondary}>JSON</Badge>
                  </div>
                  <div
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: backgroundColor }}
                  >
                    <div>
                      <p className="text-sm font-medium">CSS Variables</p>
                      <p className="text-xs opacity-70">3 days ago</p>
                    </div>
                    <Badge style={styles.accent}>CSS</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
