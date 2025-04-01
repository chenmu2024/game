import type React from "react"
import type { Metadata } from "next"
import { Mona_Sans as FontSans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { PerformanceMonitoring } from "@/components/performance-monitoring"

// 优化字体加载
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
})

// 更新为更优化的SEO元数据：
export const metadata: Metadata = {
  metadataBase: new URL("https://popcorngames.vercel.app"),
  title: {
    default: "Premium Popcorn Games | Play Free Popcorn Games Online",
    template: "%s | Premium Popcorn Games",
  },
  description:
    "Play the best free popcorn games online! Our collection features the original Google Popcorn Game and many other fun popcorn-themed games. No downloads required, play instantly in your browser.",
  keywords: [
    "popcorn game",
    "google popcorn game",
    "free popcorn games",
    "online popcorn games",
    "browser games",
    "popcorn arcade",
    "popcorn simulator",
    "play popcorn games",
  ],
  authors: [{ name: "Premium Popcorn Games" }],
  creator: "Premium Popcorn Games",
  publisher: "Premium Popcorn Games",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://popcorngames.vercel.app",
    title: "Premium Popcorn Games | Play Free Popcorn Games Online",
    description:
      "Play the best free popcorn games online! Our collection features the original Google Popcorn Game and many other fun popcorn-themed games. No downloads required, play instantly in your browser.",
    siteName: "Premium Popcorn Games",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Premium Popcorn Games - Play Free Popcorn Games Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Popcorn Games | Play Free Popcorn Games Online",
    description:
      "Play the best free popcorn games online! Our collection features the original Google Popcorn Game and many other fun popcorn-themed games.",
    images: ["/images/og-image.png"],
    creator: "@popcorngames",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://popcorngames.vercel.app",
  },
  verification: {
    google: "verification_token",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* DNS预解析 */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* 预连接 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* 预加载关键资源 */}
        <link rel="preload" href="/images/games/popcorn-game-1.jpg" as="image" />
        <link rel="preload" href="/images/logo.png" as="image" />

        {/* 预取可能需要的页面 */}
        <link rel="prefetch" href="/popular" />
        <link rel="prefetch" href="/game/google-popcorn-game" />

        {/* 元标签 */}
        <meta name="theme-color" content="#f97316" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster />
            <PerformanceMonitoring />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'