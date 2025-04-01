export function WebsiteStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Premium Popcorn Games",
          url: "https://popcorngames.vercel.app",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://popcorngames.vercel.app/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
          description:
            "Play the best free popcorn games online! Our collection features the original Google Popcorn Game and many other fun popcorn-themed games.",
          publisher: {
            "@type": "Organization",
            name: "Premium Popcorn Games",
            logo: {
              "@type": "ImageObject",
              url: "https://popcorngames.vercel.app/images/logo.png",
            },
          },
        }),
      }}
    />
  )
}

export function GameCollectionStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@type": "VideoGame",
                name: "Google Popcorn Game",
                url: "https://popcorngames.vercel.app/game/google-popcorn-game",
                image: "https://popcorngames.vercel.app/images/games/popcorn-game-1.jpg",
                description:
                  "Play the official Google Popcorn Game! This special interactive doodle lets you pop virtual kernels in a fun and addictive gameplay experience.",
                genre: "Arcade",
                gamePlatform: "Web Browser",
                applicationCategory: "Game",
                operatingSystem: "Windows, macOS, Android, iOS",
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@type": "VideoGame",
                name: "Popcorn Fun Factory",
                url: "https://popcorngames.vercel.app/game/popcorn-fun-factory",
                image: "https://popcorngames.vercel.app/images/games/popcorn-game-2.jpg",
                description:
                  "Build and manage your own popcorn factory. Upgrade machines, hire workers, and become the popcorn king!",
                genre: "Simulation",
                gamePlatform: "Web Browser",
                applicationCategory: "Game",
                operatingSystem: "Windows, macOS, Android, iOS",
              },
            },
            {
              "@type": "ListItem",
              position: 3,
              item: {
                "@type": "VideoGame",
                name: "Popcorn Burst",
                url: "https://popcorngames.vercel.app/game/popcorn-burst",
                image: "https://popcorngames.vercel.app/images/games/popcorn-game-3.jpg",
                description:
                  "Pop as many kernels as possible in this fast-paced arcade game. Watch out for burnt popcorn!",
                genre: "Arcade",
                gamePlatform: "Web Browser",
                applicationCategory: "Game",
                operatingSystem: "Windows, macOS, Android, iOS",
              },
            },
          ],
        }),
      }}
    />
  )
}

export function FAQStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is the Google Popcorn Game?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Google Popcorn Game is a fun interactive game where you pop virtual popcorn kernels. It was originally created as a Google Doodle and has become a popular online game that you can play for free on our website.",
              },
            },
            {
              "@type": "Question",
              name: "Are all the popcorn games free to play?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, all popcorn games on our website are completely free to play. No downloads or installations are required - you can play instantly in your web browser on any device.",
              },
            },
            {
              "@type": "Question",
              name: "Can I play popcorn games on my mobile phone?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "All our popcorn games are mobile-friendly and can be played on smartphones and tablets. The games automatically adapt to your screen size for the best gaming experience.",
              },
            },
          ],
        }),
      }}
    />
  )
}

