"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"

export function FAQSection() {
  const faqs = [
    {
      question: "What is the Google Popcorn Game?",
      answer:
        "The Google Popcorn Game is a fun interactive game where you pop virtual popcorn kernels. It was originally created as a Google Doodle and has become a popular online game that you can play for free on our website.",
    },
    {
      question: "Are all the popcorn games free to play?",
      answer:
        "Yes, all popcorn games on our website are completely free to play. No downloads or installations are required - you can play instantly in your web browser on any device.",
    },
    {
      question: "Can I play popcorn games on my mobile phone?",
      answer:
        "All our popcorn games are mobile-friendly and can be played on smartphones and tablets. The games automatically adapt to your screen size for the best gaming experience.",
    },
    {
      question: "Do I need to create an account to play popcorn games?",
      answer:
        "No, you don't need to create an account to play any of our popcorn games. However, creating a free account allows you to save your favorites and track your game progress.",
    },
    {
      question: "How do I save my favorite popcorn games?",
      answer:
        "You can easily save your favorite games by clicking the heart icon on any game card or game page. Your favorites will be stored in your browser for easy access on your next visit.",
    },
  ]

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <Card className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="p-6">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </section>
  )
}

