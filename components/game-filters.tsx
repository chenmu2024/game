"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Filter, Check, SlidersHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

type Category = {
  id: string
  name: string
}

type FilterProps = {
  onFilterChange: (filters: { categories: string[]; sort: string }) => void
}

const categories: Category[] = [
  { id: "arcade", name: "Arcade" },
  { id: "simulation", name: "Simulation" },
  { id: "racing", name: "Racing" },
  { id: "puzzle", name: "Puzzle" },
  { id: "strategy", name: "Strategy" },
  { id: "cooking", name: "Cooking" },
  { id: "time-management", name: "Time Management" },
  { id: "3d", name: "3D" },
]

const sortOptions = [
  { id: "newest", name: "Newest First" },
  { id: "popular", name: "Most Popular" },
  { id: "rating", name: "Highest Rated" },
]

export function GameFilters({ onFilterChange }: FilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSort, setSelectedSort] = useState("newest")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]

      onFilterChange({ categories: newCategories, sort: selectedSort })
      return newCategories
    })
  }

  const handleSortChange = (sortId: string) => {
    setSelectedSort(sortId)
    onFilterChange({ categories: selectedCategories, sort: sortId })
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedSort("newest")
    onFilterChange({ categories: [], sort: "newest" })
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 fade-in">
      <h2 className="text-3xl font-bold">All Games</h2>
      <div className="flex items-center gap-2">
        <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
              {selectedCategories.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1">
                  {selectedCategories.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => handleCategoryToggle(category.id)}
                >
                  {category.name}
                  {selectedCategories.includes(category.id) && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-primary cursor-pointer" onClick={clearFilters}>
              Clear Filters
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Sort: {sortOptions.find((o) => o.id === selectedSort)?.name}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.id}
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleSortChange(option.id)}
              >
                {option.name}
                {selectedSort === option.id && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

