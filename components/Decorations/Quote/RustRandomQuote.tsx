import { rustQuoteManager } from '@/lib/rust-utils'
import { RustPoweredQuote } from './RustQuote'

/**
 * Server-side component that uses Rust utilities for quote selection
 * This demonstrates the integration between Node.js and Rust
 */
export async function RustRandomQuote() {
  let quote
  
  try {
    // Try to get a quote from the Rust implementation
    quote = rustQuoteManager.getRandomQuote()
  } catch (error) {
    console.error('Failed to get quote from Rust, falling back to JS:', error)
    // Fallback to the original JavaScript implementation
    const { quotes } = await import('./Quote')
    quote = quotes[Math.floor(Math.random() * quotes.length)]
  }

  if (!quote) {
    // Final fallback
    quote = {
      quote: "Rust integration in progress...",
      author: "compsigh"
    }
  }

  return <RustPoweredQuote quote={quote} />
}

/**
 * Get multiple random quotes using Rust
 */
export async function RustMultipleQuotes({ count = 3 }: { count?: number }) {
  let quotes
  
  try {
    quotes = rustQuoteManager.getRandomQuotes(count)
  } catch (error) {
    console.error('Failed to get quotes from Rust:', error)
    quotes = []
  }

  if (quotes.length === 0) {
    return <div>Failed to load quotes</div>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {quotes.map((quote, index) => (
        <RustPoweredQuote key={index} quote={quote} />
      ))}
    </div>
  )
}