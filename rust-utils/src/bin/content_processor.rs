use clap::{Args, Parser, Subcommand};
use compsigh_rust_utils::*;
use std::fs;
use std::path::PathBuf;

#[derive(Parser)]
#[command(name = "content-processor")]
#[command(about = "Content processing utilities for the compsigh web platform")]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Process a markdown file
    ProcessMarkdown(ProcessMarkdownArgs),
    /// Analyze content for keywords
    Keywords(KeywordsArgs),
    /// Generate table of contents for markdown
    Toc(TocArgs),
    /// Extract headings from markdown
    Headings(HeadingsArgs),
    /// Optimize CSS file
    OptimizeCss(OptimizeCssArgs),
    /// Extract colors from CSS
    ExtractColors(ExtractColorsArgs),
    /// Validate email addresses in a file
    ValidateEmails(ValidateEmailsArgs),
}

#[derive(Args)]
struct ProcessMarkdownArgs {
    /// Input markdown file
    #[arg(short, long)]
    input: PathBuf,
    /// Output JSON file (optional)
    #[arg(short, long)]
    output: Option<PathBuf>,
    /// Include HTML output
    #[arg(long)]
    include_html: bool,
}

#[derive(Args)]
struct KeywordsArgs {
    /// Input text file
    #[arg(short, long)]
    input: PathBuf,
    /// Maximum number of keywords to extract
    #[arg(short, long, default_value = "10")]
    max_keywords: usize,
}

#[derive(Args)]
struct TocArgs {
    /// Input markdown file
    #[arg(short, long)]
    input: PathBuf,
    /// Output file (optional, defaults to stdout)
    #[arg(short, long)]
    output: Option<PathBuf>,
}

#[derive(Args)]
struct HeadingsArgs {
    /// Input markdown file
    #[arg(short, long)]
    input: PathBuf,
}

#[derive(Args)]
struct OptimizeCssArgs {
    /// Input CSS file
    #[arg(short, long)]
    input: PathBuf,
    /// Output CSS file (optional, defaults to overwriting input)
    #[arg(short, long)]
    output: Option<PathBuf>,
}

#[derive(Args)]
struct ExtractColorsArgs {
    /// Input CSS file
    #[arg(short, long)]
    input: PathBuf,
}

#[derive(Args)]
struct ValidateEmailsArgs {
    /// Input file containing email addresses
    #[arg(short, long)]
    input: PathBuf,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let cli = Cli::parse();

    match cli.command {
        Commands::ProcessMarkdown(args) => {
            let content = fs::read_to_string(&args.input)?;
            let processor = ContentProcessor::new();
            let mut processed = processor.process_markdown(&content)?;

            if !args.include_html {
                processed.html = String::new(); // Remove HTML to save space
            }

            let json_output = serde_json::to_string_pretty(&processed)?;

            if let Some(ref output_path) = args.output {
                fs::write(output_path, json_output)?;
                println!("Processed content written to {:?}", output_path);
            } else {
                println!("{}", json_output);
            }

            println!("\nSummary:");
            println!("  Word count: {}", processed.word_count);
            println!("  Reading time: {} minutes", processed.reading_time_minutes);
            if let Some(title) = processed.metadata.title {
                println!("  Title: {}", title);
            }
        }

        Commands::Keywords(args) => {
            let content = fs::read_to_string(&args.input)?;
            let keywords = analyze_content_keywords(&content, args.max_keywords);

            println!("Top {} keywords:", args.max_keywords);
            for (i, keyword) in keywords.iter().enumerate() {
                println!("  {}. {}", i + 1, keyword);
            }
        }

        Commands::Toc(args) => {
            let content = fs::read_to_string(&args.input)?;
            let headings = TextProcessor::extract_headings(&content);
            let toc = TextProcessor::generate_toc(&headings);

            if let Some(ref output_path) = args.output {
                fs::write(output_path, &toc)?;
                println!("Table of contents written to {:?}", output_path);
            } else {
                println!("{}", toc);
            }
        }

        Commands::Headings(args) => {
            let content = fs::read_to_string(&args.input)?;
            let headings = TextProcessor::extract_headings(&content);

            println!("Headings found:");
            for (level, title) in headings {
                let indent = "  ".repeat(level as usize);
                println!("{}H{}: {}", indent, level, title);
            }
        }

        Commands::OptimizeCss(args) => {
            let content = fs::read_to_string(&args.input)?;
            let optimized = optimize_css(&content);

            let output_path = args.output.unwrap_or(args.input);
            fs::write(&output_path, optimized)?;
            println!("Optimized CSS written to {:?}", output_path);
        }

        Commands::ExtractColors(args) => {
            let content = fs::read_to_string(&args.input)?;
            let colors = extract_css_colors(&content);

            println!("Colors found in CSS:");
            for color in colors {
                println!("  {}", color);
            }
        }

        Commands::ValidateEmails(args) => {
            let content = fs::read_to_string(&args.input)?;
            let mut valid_count = 0;
            let mut invalid_count = 0;

            println!("Email validation results:");
            for line in content.lines() {
                let email = line.trim();
                if !email.is_empty() {
                    if is_valid_email(email) {
                        println!("  ✓ {}", email);
                        valid_count += 1;
                    } else {
                        println!("  ✗ {}", email);
                        invalid_count += 1;
                    }
                }
            }

            println!("\nSummary:");
            println!("  Valid emails: {}", valid_count);
            println!("  Invalid emails: {}", invalid_count);
        }
    }

    Ok(())
}