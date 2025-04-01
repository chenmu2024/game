"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Successfully subscribed!",
        description:
          "Thank you for subscribing to our newsletter. You'll receive updates on new games and special offers.",
        duration: 5000,
      })
      setEmail("")
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="fade-in">
          <Card className="overflow-hidden">
            <CardContent className="p-6 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                  <p className="text-muted-foreground mb-6">
                    Subscribe to our newsletter to get updates on new popcorn games, special offers, and exclusive
                    content.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1"
                      />
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <span className="mr-2">Subscribing</span>
                            <div className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin" />
                          </>
                        ) : (
                          "Subscribe"
                        )}
                      </Button>
                    </form>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                  </p>
                </div>
                <div className="hidden md:flex justify-center">
                  <div className="relative w-48 h-48">
                    <div className="absolute inset-0 flex items-center justify-center animate-float">
                      <span className="text-8xl">🍿</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

