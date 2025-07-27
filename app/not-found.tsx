import { Button } from "@/components/ui/button";
import { Home, Palette } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen relative flex items-center justify-center"
      style={{
        backgroundImage: "url('/bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="fixed inset-0 bg-gradient-to-br from-background/20 via-background/10 to-background/30 pointer-events-none" />

      <div className="relative z-10 text-center px-6 pt-16 sm:pt-0">
        <div className="text-8xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          404
        </div>

        <h1 className="text-2xl font-semibold mb-2">Lost in the colors?</h1>
        <p className="text-muted-foreground mb-8">
          This page doesn&apos;t exist
        </p>

        <div className="flex gap-3 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/app">
              <Palette className="h-4 w-4 mr-2" />
              Create Colors
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
