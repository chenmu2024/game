import { FeaturedGame } from "@/components/featured-game"
import { GameEmbedGrid } from "@/components/game-embed-grid"
import { HeroSection } from "@/components/hero-section"
import { PopularGames } from "@/components/popular-games"
import { Newsletter } from "@/components/newsletter"
import { GameTips } from "@/components/game-tips"
import { FAQSection } from "@/components/faq-section"
import { Suspense } from "react"
import { GameGridSkeleton } from "@/components/game-skeleton"
import { WebsiteStructuredData, GameCollectionStructuredData, FAQStructuredData } from "@/components/structured-data"

export default function Home() {
  return (
    <>
      <WebsiteStructuredData />
      <GameCollectionStructuredData />
      <FAQStructuredData />

      <div className="container mx-auto px-4 py-8 space-y-12">
        <HeroSection />
        <FeaturedGame />
        <PopularGames />
        <Suspense fallback={<GameGridSkeleton />}>
          <GameEmbedGrid />
        </Suspense>
        <GameTips />
        <FAQSection />
        <Newsletter />
      </div>
    </>
  )
}

