import { execSync } from 'child_process';
import path from 'path';

/**
 * Node.js wrapper for the Rust quote utilities
 */

export interface Quote {
  quote: string;
  author: string;
}

export class RustQuoteManager {
  private rustBinaryPath: string;

  constructor() {
    this.rustBinaryPath = path.join(process.cwd(), 'rust-utils', 'target', 'release', 'quote-cli');
  }

  /**
   * Get a random quote from the Rust implementation
   */
  getRandomQuote(): Quote | null {
    try {
      const output = execSync(`${this.rustBinaryPath} random`, { encoding: 'utf-8' });
      const match = output.match(/"(.+)" - (.+)/);
      if (match) {
        return {
          quote: match[1],
          author: match[2].trim()
        };
      }
    } catch (error) {
      console.error('Error getting random quote from Rust:', error);
    }
    return null;
  }

  /**
   * Get multiple random quotes
   */
  getRandomQuotes(count: number): Quote[] {
    try {
      const output = execSync(`${this.rustBinaryPath} random-multiple --count ${count}`, { encoding: 'utf-8' });
      const quotes: Quote[] = [];
      const lines = output.trim().split('\n');
      
      for (const line of lines) {
        const match = line.match(/\d+\. "(.+)" - (.+)/);
        if (match) {
          quotes.push({
            quote: match[1],
            author: match[2].trim()
          });
        }
      }
      return quotes;
    } catch (error) {
      console.error('Error getting random quotes from Rust:', error);
      return [];
    }
  }

  /**
   * Search for quotes
   */
  searchQuotes(searchTerm: string): Quote[] {
    try {
      const output = execSync(`${this.rustBinaryPath} search "${searchTerm}"`, { encoding: 'utf-8' });
      const quotes: Quote[] = [];
      const lines = output.trim().split('\n');
      
      for (const line of lines) {
        const match = line.match(/  "(.+)" - (.+)/);
        if (match) {
          quotes.push({
            quote: match[1],
            author: match[2].trim()
          });
        }
      }
      return quotes;
    } catch (error) {
      console.error('Error searching quotes with Rust:', error);
      return [];
    }
  }

  /**
   * Get all authors
   */
  getAuthors(): string[] {
    try {
      const output = execSync(`${this.rustBinaryPath} authors`, { encoding: 'utf-8' });
      const authors: string[] = [];
      const lines = output.trim().split('\n');
      
      for (const line of lines) {
        const match = line.match(/  (.+) \(\d+ quotes\)/);
        if (match) {
          authors.push(match[1]);
        }
      }
      return authors;
    } catch (error) {
      console.error('Error getting authors from Rust:', error);
      return [];
    }
  }

  /**
   * Generate rotation value for quote display (using Rust's random generation)
   */
  generateRotation(): number {
    // For simplicity, we'll use a simple JS random here
    // In production, we could call a Rust function for this
    return Math.random() * 20 - 10;
  }
}

// Singleton instance
export const rustQuoteManager = new RustQuoteManager();