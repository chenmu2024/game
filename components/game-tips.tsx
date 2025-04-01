"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// 移除framer-motion导入
// import { motion } from "framer-motion"

export function GameTips() {
  const tips = [
    {
      id: "beginners",
      title: "Beginner Tips",
      content: [
        "Start with arcade games to get familiar with popcorn game mechanics",
        "Take your time to learn the controls before diving into more complex games",
        "Don't forget to check the 'How to Play' section for each game",
        "Popcorn clicker games are great for beginners and casual play",
        "Use the favorites feature to save games you enjoy for easy access later",
      ],
    },
    {
      id: "advanced",
      title: "Advanced Strategies",
      content: [
        "In Popcorn Factory games, focus on upgrading your production line first",
        "For time management games, prioritize speed upgrades over capacity",
        "In Popcorn Burst, aim for combo chains to maximize your score",
        "Use keyboard shortcuts when available for faster gameplay",
        "Challenge yourself with harder difficulty levels once you master the basics",
      ],
    },
    {
      id: "performance",
      title: "Performance Tips",
      content: [
        "Close other browser tabs to improve game performance",
        "Use a wired connection for more stable gameplay",
        "Enable hardware acceleration in your browser settings",
        "For mobile devices, make sure your battery isn't in low power mode",
        "Clear your browser cache regularly for optimal game loading times",
      ],
    },
  ]

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* 替换为： */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        > */}
        <div className="fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Popcorn Game Tips</h2>
          </div>

          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="beginners">
                <TabsList className="mb-6">
                  {tips.map((tab) => (
                    <TabsTrigger key={tab.id} value={tab.id}>
                      {tab.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {tips.map((tab) => (
                  <TabsContent key={tab.id} value={tab.id}>
                    <ul className="space-y-3">
                      {tab.content.map((tip, index) => (
                        // 同样替换motion.li
                        // <motion.li
                        //   key={index}
                        //   initial={{ opacity: 0, x: -10 }}
                        //   animate={{ opacity: 1, x: 0 }}
                        //   transition={{ duration: 0.3, delay: index * 0.1 }}
                        //   className="flex items-start"
                        // >
                        <li
                          key={index}
                          className="flex items-start fade-in"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <span className="text-primary mr-2">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
        {/* </motion.div> */}
      </div>
    </section>
  )
}

