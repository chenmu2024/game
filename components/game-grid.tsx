"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { GameFilters } from "./game-filters"
import { GameGridSkeleton } from "./game-skeleton"
import { allGames } from "@/data/games"
import { useToast } from "@/components/ui/use-toast"

export function GameGrid() {
  const [isLoading, setIsLoading] = useState(true)
  const [filteredGames, setFilteredGames] = useState(allGames)
  const [visibleGames, setVisibleGames] = useState<typeof allGames>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [page, setPage] = useState(1)
  const gamesPerPage = 8
  const { toast } = useToast()

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
      setVisibleGames(filteredGames.slice(0, gamesPerPage))
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleFilterChange = ({ categories, sort }: { categories: string[]; sort: string }) => {
    setIsLoading(true)

    // Simulate loading
    setTimeout(() => {
      let filtered = [...allGames]

      // Apply category filter
      if (categories.length > 0) {
        filtered = filtered.filter((game) =>
          categories.some(
            (cat) =>
              game.category.toLowerCase() === cat.toLowerCase() ||
              game.tags.some((tag) => tag.toLowerCase() === cat.toLowerCase()),
          ),
        )
      }

      // Apply sorting
      switch (sort) {
        case "popular":
          filtered.sort(
            (a, b) => Number.parseInt(b.plays.replace(/[^0-9]/g, "")) - Number.parseInt(a.plays.replace(/[^0-9]/g, "")),
          )
          break
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case "newest":
        default:
          filtered.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
          break
      }

      setFilteredGames(filtered)
      setVisibleGames(filtered.slice(0, gamesPerPage))
      setPage(1)
      setIsLoading(false)
    }, 500)
  }

  const loadMoreGames = () => {
    const nextPage = page + 1
    const nextGames = filteredGames.slice(0, nextPage * gamesPerPage)
    setVisibleGames(nextGames)
    setPage(nextPage)
  }

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
    <section id="games" className="py-12">
      <div className="container mx-auto px-4">
        <GameFilters onFilterChange={handleFilterChange} />

        {isLoading ? (
          <GameGridSkeleton />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {visibleGames.map((game, index) => (
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
                          loading="lazy"
                          decoding="async"
                          quality={75}
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
                        {game.featured && <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>}
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

            {filteredGames.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold mb-2">No games found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <Button onClick={() => handleFilterChange({ categories: [], sort: "newest" })}>Clear Filters</Button>
              </div>
            )}

            {filteredGames.length > 0 && visibleGames.length < filteredGames.length && (
              <div className="flex justify-center mt-8">
                <Button variant="outline" onClick={loadMoreGames} className="transition-transform hover:scale-105">
                  Load More Games
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

