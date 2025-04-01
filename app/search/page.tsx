"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, SearchIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { searchGames } from "@/data/games"
import { GameGridSkeleton } from "@/components/game-skeleton"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [favorites, setFavorites] = useState<number[]>([])
  const { toast } = useToast()

  useEffect(() => {
    if (query) {
      setIsLoading(true)
      // Simulate loading
      setTimeout(() => {
        const results = searchGames(query)
        setSearchResults(results)
        setIsLoading(false)
      }, 800)
    } else {
      setSearchResults([])
      setIsLoading(false)
    }
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const url = new URL(window.location.href)
      url.searchParams.set("q", searchQuery)
      window.history.pushState({}, "", url)

      setIsLoading(true)
      // Simulate loading
      setTimeout(() => {
        const results = searchGames(searchQuery)
        setSearchResults(results)
        setIsLoading(false)
      }, 800)
    }
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>
        <form onSubmit={handleSearch} className="flex gap-2 max-w-xl">
          <Input
            type="search"
            placeholder="Search for popcorn games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <SearchIcon className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
      </div>

      {query && (
        <div className="mb-6">
          <p className="text-muted-foreground">
            {isLoading
              ? "Searching..."
              : searchResults.length === 0
                ? "No results found"
                : `Found ${searchResults.length} result${searchResults.length === 1 ? "" : "s"} for "${query}"`}
          </p>
        </div>
      )}

      {isLoading ? (
        <GameGridSkeleton />
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
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
                      <Heart className={`h-4 w-4 ${favorites.includes(game.id) ? "fill-primary text-primary" : ""}`} />
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
            </motion.div>
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-2">No games found</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            We couldn't find any popcorn games matching your search. Try different keywords or browse our categories.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link href="/">Browse All Games</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/categories">View Categories</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍿</div>
          <h2 className="text-2xl font-bold mb-2">Search for Popcorn Games</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Enter keywords like "arcade", "factory", or "popcorn burst" to find your favorite popcorn games.
          </p>
        </div>
      )}
    </div>
  )
}

