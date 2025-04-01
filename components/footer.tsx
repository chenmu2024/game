import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { JsonLd } from "@/components/json-ld"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted py-12 border-t">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Premium Popcorn Games",
          url: "https://popcorngames.vercel.app",
          logo: "https://popcorngames.vercel.app/images/logo.png",
          sameAs: [
            "https://facebook.com/popcorngames",
            "https://twitter.com/popcorngames",
            "https://instagram.com/popcorngames",
            "https://youtube.com/popcorngames",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-555-123-4567",
            contactType: "customer service",
            email: "contact@popcorngames.com",
          },
        }}
      />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-10 w-10 overflow-hidden rounded-full bg-primary">
                <span className="absolute inset-0 flex items-center justify-center text-xl">🍿</span>
              </span>
              <span className="font-bold text-xl">Premium Popcorn Games</span>
            </div>
            <p className="text-muted-foreground">
              The ultimate destination for popcorn-themed games. Play, enjoy, and share!
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="https://facebook.com/popcorngames"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="https://twitter.com/popcorngames"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="https://instagram.com/popcorngames"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="https://youtube.com/popcorngames"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/popular" className="text-muted-foreground hover:text-foreground transition-colors">
                  Popular Games
                </Link>
              </li>
              <li>
                <Link href="/latest" className="text-muted-foreground hover:text-foreground transition-colors">
                  Latest Games
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Game Types</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/popular?type=arcade"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Arcade Games
                </Link>
              </li>
              <li>
                <Link
                  href="/popular?type=simulation"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Simulation Games
                </Link>
              </li>
              <li>
                <Link
                  href="/popular?type=strategy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Strategy Games
                </Link>
              </li>
              <li>
                <Link
                  href="/popular?type=cooking"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cooking Games
                </Link>
              </li>
              <li>
                <Link href="/popular" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Games
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <span>contact@popcorngames.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <span>+1-555-123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span>123 Popcorn Street, Gaming City, PC 12345</span>
              </li>
            </ul>
            <h3 className="font-bold text-lg mt-6 mb-2">Newsletter</h3>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} Premium Popcorn Games. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" className="hover:text-foreground transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

