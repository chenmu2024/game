import { Card, CardContent } from "@/components/ui/card"

export function GameSkeleton() {
  return (
    <Card className="overflow-hidden h-full">
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
  )
}

export function GameGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <GameSkeleton key={i} />
        ))}
    </div>
  )
}

