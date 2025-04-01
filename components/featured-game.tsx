"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Expand, Minimize, Play, Heart } from "lucide-react"
import Image from "next/image"
import { getFeaturedGame } from "@/data/games"
import { useToast } from "@/components/ui/use-toast"
import { JsonLd } from "@/components/json-ld"

export function FeaturedGame() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const game = getFeaturedGame()

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const startGame = () => {
    setIsPlaying(true)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite
        ? `${game.title} has been removed from your favorites`
        : `${game.title} has been added to your favorites`,
      duration: 3000,
    })
  }

  if (!game) return null

  return (
    <section id="featured" className="py-12">
      {game && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "VideoGame",
            name: game.title,
            description: game.description,
            image: game.image,
            url: `https://popcorngames.vercel.app/game/${game.slug}`,
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: game.rating,
              ratingCount: Number.parseInt(game.plays.replace(/[^0-9]/g, "")) / 1000,
              bestRating: "5",
              worstRating: "1",
            },
            genre: game.tags.join(", "),
            author: {
              "@type": "Organization",
              name: game.developer,
            },
            datePublished: game.releaseDate,
          }}
        />
      )}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Featured Game</h2>
          <Button variant="ghost" size="sm" asChild>
            <a href="#games">View All</a>
          </Button>
        </div>

        <Card className={`overflow-hidden ${isFullscreen ? "fixed inset-0 z-50 rounded-none" : "relative"}`}>
          <div className="relative aspect-video bg-muted">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              </div>
            ) : isPlaying ? (
              <iframe
                src={game.url}
                className="w-full h-full border-0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                loading="lazy"
              ></iframe>
            ) : (
              <>
                <div className="absolute inset-0">
                  <Image
                    src={game.image || "/placeholder.svg"}
                    alt={game.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-cover"
                    priority
                    loading="eager"
                    fetchPriority="high"
                    quality={85}
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center fade-in">
                  <Button
                    size="lg"
                    className="rounded-full w-16 h-16 bg-primary/90 hover:bg-primary btn-play"
                    onClick={startGame}
                  >
                    <Play className="h-8 w-8 fill-white" />
                  </Button>
                </div>
                <div className="absolute inset-0 featured-game-gradient flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 fade-in">{game.title}</h3>
                  <p className="text-sm md:text-base max-w-2xl mb-4 fade-in">{game.description}</p>
                  <div className="flex gap-2 fade-in">
                    <Button
                      variant="default"
                      className="bg-primary/90 hover:bg-primary transition-transform hover:scale-105"
                      onClick={startGame}
                    >
                      Play Now
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/30 bg-black/30 hover:bg-black/50 transition-transform hover:scale-105"
                      onClick={toggleFavorite}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-primary text-primary" : ""}`} />
                      {isFavorite ? "Favorited" : "Add to Favorites"}
                    </Button>
                  </div>
                </div>
              </>
            )}

            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 bg-black/30 border-white/30 text-white hover:bg-black/50 z-10"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}

