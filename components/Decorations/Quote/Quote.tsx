"use client"

import { useState } from "react"

import styles from "./Quote.module.css"

type Quote = {
  quote: string
  author: string
}

export const quotes: Quote[] = [
  {
    quote: "shit does NOT work on my machine",
    author: "Dave"
  },
  {
    quote: "be ready for some vibe kernel coding next week",
    author: "Professor Benson"
  },
  {
    quote: "it will not be secure",
    author: "Pete"
  },
  {
    quote: "I had a dream that I was sleeping in a Docker container",
    author: "Dave"
  },
  {
    quote: "meow",
    author: "Gursh"
  },
  {
    quote: "fuck it im deleting everything",
    author: "Nish"
  },
  {
    quote: "I could not be more powered by AI right now",
    author: "Jet"
  },
  {
    quote: "it's Python; type errors aren't real",
    author: "Jet"
  },
  {
    quote: "using machine learning to rate how well you are mewing",
    author: "Faadil"
  },
  {
    quote: "Just tried to auto-pair brackets on paper",
    author: "Tao"
  },
  {
    quote: "idk who atoi() ppl are but as an INTJ I don't like the sound of it",
    author: "Faadil"
  },
  {
    quote: "idk I think I'm fucked",
    author: "Eric"
  },
  {
    quote:
      '"iteration velocity" is us committing tax fraud by the end of next week',
    author: "Jet"
  },
  {
    quote: "just core dumped in my pants a bit",
    author: "Jet"
  },
  {
    quote: "Java code makes the reader have cache misses in their brain",
    author: "Tao"
  }
]

export function Quote({ quote }: { quote: Quote }) {
  // Random rotation between -10 and 10 degrees
  const [rotation] = useState(() => Math.random() * 20 - 10)
  return (
    <>
      <div
        id={styles["quote-container"]}
        style={{
          transform: `rotate(${rotation}deg)`
        }}
      >
        <blockquote>
          <p id={styles.quote}>{quote.quote}</p>
        </blockquote>
        <p id={styles.author}>{quote.author}</p>
      </div>
    </>
  )
}

export function RandomQuote() {
  const [index] = useState(() => Math.floor(Math.random() * quotes.length))
  return (
    <>
      <Quote quote={quotes[index]} />
    </>
  )
}
