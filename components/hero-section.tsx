"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/80 to-orange-600/80 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
      </div>
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl fade-in">
            Premium Popcorn Games
          </h1>
          <p className="mb-10 text-lg md:text-xl fade-in">
            Discover the most entertaining collection of popcorn-themed games. From popcorn clickers to factory
            simulators, we have the ultimate popcorn gaming experience!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 fade-in">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 transition-transform hover:scale-105"
            >
              <Link href="#featured">Play Featured Game</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 transition-transform hover:scale-105"
            >
              <Link href="#games">Browse All Games</Link>
            </Button>
          </div>
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0">
              <span className="text-6xl">🍿</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

