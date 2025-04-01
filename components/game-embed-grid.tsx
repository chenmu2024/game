"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Play } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { allGames } from "@/data/games"
import { GameIframe } from "./game-iframe"

export function GameEmbedGrid() {
  const [selectedGame, setSelectedGame] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (gameId: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites((prev) => (prev.includes(gameId) ? prev.filter((id) => id !== gameId) : [...prev, gameId]))
  }

  const playGame = (gameId: number, e: React.MouseEvent) => {
    e.preventDefault()
    setSelectedGame(gameId)
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">All Popcorn Games</h2>

        {selectedGame && (
          <Card className="mb-8">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{allGames.find((g) => g.id === selectedGame)?.title}</h3>
                <Button variant="outline" size="sm" onClick={() => setSelectedGame(null)}>
                  Close Game
                </Button>
              </div>
              <div className="iframe-container">
                <GameIframe
                  url={allGames.find((g) => g.id === selectedGame)?.url || ""}
                  title={allGames.find((g) => g.id === selectedGame)?.title || ""}
                  className="responsive-iframe"
                />
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allGames.map((game, index) => (
            <Card key={game.id} className="game-card overflow-hidden h-full group">
              <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                <Image
                  src={game.image || "/placeholder.svg"}
                  alt={game.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-3 text-white">
                    <Button variant="default" className="w-full" onClick={(e) => playGame(game.id, e)}>
                      <Play className="h-4 w-4 mr-2" />
                      Play Now
                    </Button>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-black/30 text-white hover:bg-black/50 z-10"
                  onClick={(e) => toggleFavorite(game.id, e)}
                >
                  <Heart className={`h-4 w-4 ${favorites.includes(game.id) ? "fill-primary text-primary" : ""}`} />
                </Button>
                {game.featured && <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>}
              </div>
              <CardContent className="p-4">
                <Link href={`/game/${game.slug}`}>
                  <h3 className="font-bold text-lg mb-1 line-clamp-1">{game.title}</h3>
                </Link>
                <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{game.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                    <span className="text-sm font-medium">{game.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{game.plays} plays</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

