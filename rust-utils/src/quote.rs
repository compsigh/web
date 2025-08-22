use serde::{Deserialize, Serialize};
use rand::Rng;

/// Represents a quote with content and author
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Quote {
    pub quote: String,
    pub author: String,
}

/// Quote manager for handling collections of quotes
#[derive(Debug, Serialize, Deserialize)]
pub struct QuoteManager {
    quotes: Vec<Quote>,
}

impl QuoteManager {
    /// Create a new QuoteManager with the provided quotes
    pub fn new(quotes: Vec<Quote>) -> Self {
        Self { quotes }
    }

    /// Create QuoteManager from the default compsigh quotes
    pub fn with_default_quotes() -> Self {
        let quotes = vec![
            Quote {
                quote: "shit does NOT work on my machine".to_string(),
                author: "Dave".to_string(),
            },
            Quote {
                quote: "be ready for some vibe kernel coding next week".to_string(),
                author: "Professor Benson".to_string(),
            },
            Quote {
                quote: "it will not be secure".to_string(),
                author: "Pete".to_string(),
            },
            Quote {
                quote: "I had a dream that I was sleeping in a Docker container".to_string(),
                author: "Dave".to_string(),
            },
            Quote {
                quote: "meow".to_string(),
                author: "Gursh".to_string(),
            },
            Quote {
                quote: "fuck it im deleting everything".to_string(),
                author: "Nish".to_string(),
            },
            Quote {
                quote: "I could not be more powered by AI right now".to_string(),
                author: "Jet".to_string(),
            },
            Quote {
                quote: "it's Python; type errors aren't real".to_string(),
                author: "Jet".to_string(),
            },
            Quote {
                quote: "using machine learning to rate how well you are mewing".to_string(),
                author: "Faadil".to_string(),
            },
            Quote {
                quote: "Just tried to auto-pair brackets on paper".to_string(),
                author: "Tao".to_string(),
            },
            Quote {
                quote: "idk who atoi() ppl are but as an INTJ I don't like the sound of it".to_string(),
                author: "Faadil".to_string(),
            },
            Quote {
                quote: "idk I think I'm fucked".to_string(),
                author: "Eric".to_string(),
            },
            Quote {
                quote: "\"iteration velocity\" is us committing tax fraud by the end of next week".to_string(),
                author: "Jet".to_string(),
            },
            Quote {
                quote: "just core dumped in my pants a bit".to_string(),
                author: "Jet".to_string(),
            },
            Quote {
                quote: "Java code makes the reader have cache misses in their brain".to_string(),
                author: "Tao".to_string(),
            },
        ];
        
        Self { quotes }
    }

    /// Get a random quote using cryptographically secure randomness
    pub fn get_random_quote(&self) -> Option<&Quote> {
        if self.quotes.is_empty() {
            return None;
        }
        
        let mut rng = rand::thread_rng();
        let index = rng.gen_range(0..self.quotes.len());
        self.quotes.get(index)
    }

    /// Get multiple random quotes (without replacement)
    pub fn get_random_quotes(&self, count: usize) -> Vec<&Quote> {
        if self.quotes.is_empty() || count == 0 {
            return vec![];
        }

        let mut rng = rand::thread_rng();
        let mut indices: Vec<usize> = (0..self.quotes.len()).collect();
        
        // Shuffle indices
        for i in (1..indices.len()).rev() {
            let j = rng.gen_range(0..=i);
            indices.swap(i, j);
        }

        indices
            .into_iter()
            .take(count.min(self.quotes.len()))
            .filter_map(|i| self.quotes.get(i))
            .collect()
    }

    /// Get quotes by author
    pub fn get_quotes_by_author(&self, author: &str) -> Vec<&Quote> {
        self.quotes
            .iter()
            .filter(|quote| quote.author.to_lowercase() == author.to_lowercase())
            .collect()
    }

    /// Search quotes by content (case-insensitive)
    pub fn search_quotes(&self, search_term: &str) -> Vec<&Quote> {
        let search_lower = search_term.to_lowercase();
        self.quotes
            .iter()
            .filter(|quote| {
                quote.quote.to_lowercase().contains(&search_lower) ||
                quote.author.to_lowercase().contains(&search_lower)
            })
            .collect()
    }

    /// Get all unique authors
    pub fn get_authors(&self) -> Vec<String> {
        let mut authors: Vec<String> = self.quotes
            .iter()
            .map(|quote| quote.author.clone())
            .collect();
        
        authors.sort();
        authors.dedup();
        authors
    }

    /// Get total number of quotes
    pub fn len(&self) -> usize {
        self.quotes.len()
    }

    /// Check if the collection is empty
    pub fn is_empty(&self) -> bool {
        self.quotes.is_empty()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_quote_manager_creation() {
        let manager = QuoteManager::with_default_quotes();
        assert!(!manager.is_empty());
        assert!(manager.len() > 0);
    }

    #[test]
    fn test_random_quote() {
        let manager = QuoteManager::with_default_quotes();
        let quote = manager.get_random_quote();
        assert!(quote.is_some());
    }

    #[test]
    fn test_search_quotes() {
        let manager = QuoteManager::with_default_quotes();
        let results = manager.search_quotes("Python");
        assert!(!results.is_empty());
    }

    #[test]
    fn test_get_authors() {
        let manager = QuoteManager::with_default_quotes();
        let authors = manager.get_authors();
        assert!(authors.contains(&"Dave".to_string()));
        assert!(authors.contains(&"Jet".to_string()));
    }
}