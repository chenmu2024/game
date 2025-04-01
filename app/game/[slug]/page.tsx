"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Share2, Heart, Clock, Award, Users, Calendar, Info, Play } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getGameBySlug, getRelatedGames } from "@/data/games"
import { useToast } from "@/components/ui/use-toast"
import { JsonLd } from "@/components/json-ld"

export default function GamePage({ params }: { params: { slug: string } }) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Find the game data based on the slug
  const game = getGameBySlug(params.slug)

  // Find similar games
  const similarGames = game ? getRelatedGames(game.id) : []

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const playGame = () => {
    setIsPlaying(true)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)

    if (game) {
      toast({
        title: isFavorite ? "Removed from favorites" : "Added to favorites",
        description: isFavorite
          ? `${game.title} has been removed from your favorites`
          : `${game.title} has been added to your favorites`,
        duration: 3000,
      })
    }
  }

  const shareGame = () => {
    if (navigator.share && game) {
      navigator
        .share({
          title: game.title,
          text: game.description,
          url: window.location.href,
        })
        .catch((err) => {
          console.error("Error sharing:", err)
        })
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied!",
        description: "Game link copied to clipboard. Share it with your friends!",
        duration: 3000,
      })
    }
  }

  // If slug doesn't exist, redirect to home
  useEffect(() => {
    if (!game) {
      router.push("/")
    } else {
      // Simulate loading
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [game, router])

  if (!game) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
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
          gamePlatform: game.platforms.join(", "),
          contentRating: game.ageRating,
        }}
      />

      <div className="flex flex-wrap gap-2 mb-4 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href={`/categories/${game.category.toLowerCase()}`} className="hover:text-primary transition-colors">
          {game.category}
        </Link>
        <span>/</span>
        <span className="text-foreground">{game.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden relative">
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
                  <Image
                    src={game.image || "/placeholder.svg"}
                    alt={game.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="rounded-full w-16 h-16 bg-primary/90 hover:bg-primary btn-play"
                      onClick={playGame}
                    >
                      <Play className="h-8 w-8 fill-white" />
                    </Button>
                  </div>
                  <div className="absolute inset-0 featured-game-gradient flex flex-col justify-end p-6 text-white">
                    <Button
                      variant="default"
                      className="bg-primary/90 hover:bg-primary transition-transform hover:scale-105 w-full md:w-auto"
                      onClick={playGame}
                    >
                      Play Game
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Card>

          <div className="flex items-center justify-between mt-4 fade-in">
            <h1 className="text-2xl md:text-3xl font-bold">{game.title}</h1>
            <div className="flex items-center gap-2">
              <Button
                variant={isFavorite ? "default" : "outline"}
                size="icon"
                onClick={toggleFavorite}
                className={isFavorite ? "bg-primary" : ""}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-white" : ""}`} />
              </Button>
              <Button variant="outline" size="icon" onClick={shareGame}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4 fade-in">
            <Badge variant="outline" className="bg-primary/10">
              {game.category}
            </Badge>
            {game.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-6 fade-in">
            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="how-to-play">How to Play</TabsTrigger>
                <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <p className="text-muted-foreground mb-4">{game.description}</p>
                <p className="text-muted-foreground">{game.longDescription}</p>
              </TabsContent>
              <TabsContent value="how-to-play" className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Controls</h3>
                <p className="text-muted-foreground mb-4">{game.controls}</p>
                <h3 className="text-lg font-semibold mb-2">Tips</h3>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>Start with the tutorial to learn the basic mechanics</li>
                  <li>Focus on completing objectives to earn more points</li>
                  <li>Collect power-ups whenever possible</li>
                  <li>Try to beat your high score with each playthrough</li>
                </ul>
              </TabsContent>
              <TabsContent value="screenshots" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {game.screenshots.map((screenshot, index) => (
                    <div key={index} className="relative aspect-video rounded-md overflow-hidden group">
                      <Image
                        src={screenshot || "/placeholder.svg"}
                        alt={`${game.title} screenshot ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="details" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Release Date
                    </h3>
                    <p className="text-muted-foreground">{new Date(game.releaseDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <Info className="h-4 w-4 mr-2" />
                      Developer
                    </h3>
                    <p className="text-muted-foreground">{game.developer}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      Difficulty
                    </h3>
                    <p className="text-muted-foreground">{game.difficulty}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Age Rating
                    </h3>
                    <p className="text-muted-foreground">{game.ageRating}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Platforms
                    </h3>
                    <p className="text-muted-foreground">{game.platforms.join(", ")}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div>
          <div className="fade-in">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="text-xl font-bold">{game.rating}/5.0</span>
                <span className="text-sm text-muted-foreground">({game.plays} plays)</span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-sm text-muted-foreground">Developer</span>
                  <p>{game.developer}</p>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">Release Date</span>
                  <p>{new Date(game.releaseDate).toLocaleDateString()}</p>
                </div>

                <Button className="w-full transition-transform hover:scale-105" onClick={playGame}>
                  Play Game
                </Button>

                <Button
                  className="w-full transition-transform hover:scale-105"
                  onClick={toggleFavorite}
                  variant={isFavorite ? "secondary" : "outline"}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-primary text-primary" : ""}`} />
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </Button>

                <Button variant="outline" className="w-full transition-transform hover:scale-105" onClick={shareGame}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Game
                </Button>
              </div>
            </Card>
          </div>

          <div className="fade-in" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-xl font-bold mt-8 mb-4">Similar Games</h2>
            <div className="space-y-4">
              {similarGames.map((game) => (
                <Link href={`/game/${game.slug}`} key={game.id}>
                  <Card className="game-card overflow-hidden group">
                    <div className="flex">
                      <div className="relative w-24 h-24">
                        <Image
                          src={game.image || "/placeholder.svg"}
                          alt={game.title}
                          fill
                          sizes="96px"
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-3 flex-1">
                        <h3 className="font-bold text-sm mb-1">{game.title}</h3>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-primary text-primary mr-1" />
                          <span className="text-xs">{game.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

