import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OfflinePage() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh] text-center">
      <div className="text-8xl mb-6">🍿</div>
      <h1 className="text-4xl font-bold mb-4">You're Offline</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        It looks like you're currently offline. Please check your internet connection to continue playing popcorn games.
      </p>
      <Button asChild size="lg">
        <Link href="/">Try Again</Link>
      </Button>
    </div>
  )
}

