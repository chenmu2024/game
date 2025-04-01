"use client"

import React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Search, Menu, X, Heart, Home, Gamepad2, Clock, Award } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter, usePathname } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-200 ${isScrolled ? "shadow-md" : ""}`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform">
              <span className="text-xl">🍿</span>
            </div>
            <span className="hidden font-bold text-xl md:inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-400 fade-in">
              Premium Popcorn Games
            </span>
          </Link>
        </div>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Gamepad2 className="h-4 w-4 mr-2" />
                Games
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {popularLinks.map((link) => (
                    <ListItem key={link.title} title={link.title} href={link.href} icon={link.icon}>
                      {link.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/popular" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Award className="h-4 w-4 mr-2" />
                  Popular Games
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/latest" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Clock className="h-4 w-4 mr-2" />
                  Latest Games
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search popcorn games..."
                className="w-[200px] md:w-[300px]"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
            </Button>
          )}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/favorites">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t p-4 space-y-4 bg-background">
          <Link
            href="/"
            className="flex items-center gap-2 py-2 hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link
            href="/popular"
            className="flex items-center gap-2 py-2 hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            <Gamepad2 className="h-4 w-4" />
            <span>All Games</span>
          </Link>
          <Link
            href="/popular"
            className="flex items-center gap-2 py-2 hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            <Award className="h-4 w-4" />
            <span>Popular Games</span>
          </Link>
          <Link
            href="/latest"
            className="flex items-center gap-2 py-2 hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            <Clock className="h-4 w-4" />
            <span>Latest Games</span>
          </Link>
          <Link
            href="/favorites"
            className="flex items-center gap-2 py-2 hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            <Heart className="h-4 w-4" />
            <span>Favorites</span>
          </Link>
        </div>
      )}
    </header>
  )
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string
  icon?: React.ReactNode
}

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, icon, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none flex items-center gap-2">
              {icon}
              {title}
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

const popularLinks = [
  {
    title: "Arcade Games",
    href: "/popular?type=arcade",
    description: "Fast-paced games with simple controls and addictive gameplay",
    icon: <span className="text-lg">🎮</span>,
  },
  {
    title: "Simulation Games",
    href: "/popular?type=simulation",
    description: "Build and manage your own popcorn empire",
    icon: <span className="text-lg">🏭</span>,
  },
  {
    title: "Popular Games",
    href: "/popular",
    description: "Most played popcorn games on our platform",
    icon: <span className="text-lg">🏆</span>,
  },
  {
    title: "New Releases",
    href: "/latest",
    description: "Recently added popcorn games",
    icon: <span className="text-lg">✨</span>,
  },
]

