use clap::{Args, Parser, Subcommand};
use compsigh_rust_utils::*;
use serde_json;

#[derive(Parser)]
#[command(name = "quote-cli")]
#[command(about = "Command line tool for managing compsigh quotes")]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Get a random quote
    Random,
    /// Get multiple random quotes
    RandomMultiple(RandomMultipleArgs),
    /// Search quotes by content or author
    Search(SearchArgs),
    /// List all authors
    Authors,
    /// Get quotes by specific author
    ByAuthor(ByAuthorArgs),
    /// Get all quotes as JSON
    All,
    /// Get statistics about the quote collection
    Stats,
}

#[derive(Args)]
struct RandomMultipleArgs {
    /// Number of quotes to retrieve
    #[arg(short, long, default_value = "3")]
    count: usize,
}

#[derive(Args)]
struct SearchArgs {
    /// Search term to look for in quotes or authors
    term: String,
}

#[derive(Args)]
struct ByAuthorArgs {
    /// Author name to search for
    author: String,
}

fn main() -> anyhow::Result<()> {
    let cli = Cli::parse();
    let quote_manager = QuoteManager::with_default_quotes();

    match cli.command {
        Commands::Random => {
            if let Some(quote) = quote_manager.get_random_quote() {
                println!("\"{}\" - {}", quote.quote, quote.author);
            } else {
                println!("No quotes available");
            }
        }
        
        Commands::RandomMultiple(args) => {
            let quotes = quote_manager.get_random_quotes(args.count);
            for (i, quote) in quotes.iter().enumerate() {
                println!("{}. \"{}\" - {}", i + 1, quote.quote, quote.author);
            }
        }
        
        Commands::Search(args) => {
            let results = quote_manager.search_quotes(&args.term);
            if results.is_empty() {
                println!("No quotes found matching '{}'", args.term);
            } else {
                println!("Found {} quotes matching '{}':", results.len(), args.term);
                for quote in results {
                    println!("  \"{}\" - {}", quote.quote, quote.author);
                }
            }
        }
        
        Commands::Authors => {
            let authors = quote_manager.get_authors();
            println!("Authors ({}):", authors.len());
            for author in authors {
                let count = quote_manager.get_quotes_by_author(&author).len();
                println!("  {} ({} quotes)", author, count);
            }
        }
        
        Commands::ByAuthor(args) => {
            let quotes = quote_manager.get_quotes_by_author(&args.author);
            if quotes.is_empty() {
                println!("No quotes found by '{}'", args.author);
            } else {
                println!("Quotes by {} ({}):", args.author, quotes.len());
                for quote in quotes {
                    println!("  \"{}\"", quote.quote);
                }
            }
        }
        
        Commands::All => {
            let json = serde_json::to_string_pretty(&quote_manager)?;
            println!("{}", json);
        }
        
        Commands::Stats => {
            let total_quotes = quote_manager.len();
            let authors = quote_manager.get_authors();
            let total_authors = authors.len();
            
            // Calculate some interesting stats
            let mut author_counts: Vec<(String, usize)> = authors
                .iter()
                .map(|author| {
                    let count = quote_manager.get_quotes_by_author(author).len();
                    (author.clone(), count)
                })
                .collect();
            
            author_counts.sort_by(|a, b| b.1.cmp(&a.1));
            
            println!("Quote Collection Statistics");
            println!("==========================");
            println!("Total quotes: {}", total_quotes);
            println!("Total authors: {}", total_authors);
            println!("Average quotes per author: {:.1}", total_quotes as f64 / total_authors as f64);
            
            println!("\nTop contributors:");
            for (i, (author, count)) in author_counts.iter().take(5).enumerate() {
                println!("  {}. {} - {} quotes", i + 1, author, count);
            }
            
            // Calculate total character count
            let total_chars: usize = quote_manager
                .get_random_quotes(usize::MAX)
                .iter()
                .map(|quote| quote.quote.len())
                .sum();
            
            println!("\nContent statistics:");
            println!("  Total characters: {}", total_chars);
            println!("  Average quote length: {:.1} characters", 
                     total_chars as f64 / total_quotes as f64);
        }
    }

    Ok(())
}