"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { getPopularGames } from "@/data/games"

export function PopularGames() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const popularGames = getPopularGames()

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const toggleFavorite = (gameId: number, gameTitle: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setFavorites((prev) => {
      const isFavorited = prev.includes(gameId)
      const newFavorites = isFavorited ? prev.filter((id) => id !== gameId) : [...prev, gameId]

      toast({
        title: isFavorited ? "Removed from favorites" : "Added to favorites",
        description: isFavorited
          ? `${gameTitle} has been removed from your favorites`
          : `${gameTitle} has been added to your favorites`,
        duration: 3000,
      })

      return newFavorites
    })
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Popular Games</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/popular">View All</Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="overflow-hidden h-full">
                  <div className="relative aspect-[4/3] bg-muted skeleton" />
                  <CardContent className="p-4 space-y-3">
                    <div className="h-6 w-3/4 skeleton rounded" />
                    <div className="space-y-2">
                      <div className="h-4 skeleton rounded" />
                      <div className="h-4 w-5/6 skeleton rounded" />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="h-4 w-16 skeleton rounded" />
                      <div className="h-4 w-12 skeleton rounded" />
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularGames.map((game, index) => (
              <div key={game.id} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <Link href={`/game/${game.slug}`}>
                  <Card className="game-card overflow-hidden h-full group">
                    <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                      <Image
                        src={game.image || "/placeholder.svg"}
                        alt={game.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-3 text-white">
                          <p className="text-sm font-medium">Play Now</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-black/30 text-white hover:bg-black/50 z-10"
                        onClick={(e) => toggleFavorite(game.id, game.title, e)}
                      >
                        <Heart
                          className={`h-4 w-4 ${favorites.includes(game.id) ? "fill-primary text-primary" : ""}`}
                        />
                      </Button>
                      {game.new && <Badge className="absolute top-2 left-2 bg-primary">New</Badge>}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1 line-clamp-1">{game.title}</h3>
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
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

