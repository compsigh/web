use pulldown_cmark::{Parser, Options, html};
use regex::Regex;
use serde::{Deserialize, Serialize};

/// Metadata extracted from markdown frontmatter
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ContentMetadata {
    pub title: Option<String>,
    pub description: Option<String>,
    pub post_date: Option<u64>,
    pub authors: Option<Vec<Author>>,
    pub tags: Option<Vec<String>>,
}

/// Author information
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Author {
    pub name: String,
    pub avatar: Option<String>,
}

/// Processed markdown content with metadata
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProcessedContent {
    pub metadata: ContentMetadata,
    pub html: String,
    pub plain_text: String,
    pub word_count: usize,
    pub reading_time_minutes: u32,
}

/// Content processor for markdown files
pub struct ContentProcessor {
    options: Options,
}

impl ContentProcessor {
    /// Create a new ContentProcessor with default options
    pub fn new() -> Self {
        let mut options = Options::empty();
        options.insert(Options::ENABLE_STRIKETHROUGH);
        options.insert(Options::ENABLE_TABLES);
        options.insert(Options::ENABLE_FOOTNOTES);
        options.insert(Options::ENABLE_TASKLISTS);
        options.insert(Options::ENABLE_SMART_PUNCTUATION);
        
        Self { options }
    }

    /// Process markdown content with frontmatter
    pub fn process_markdown(&self, content: &str) -> anyhow::Result<ProcessedContent> {
        let (metadata, markdown_body) = self.extract_frontmatter(content)?;
        
        // Parse markdown to HTML
        let parser = Parser::new_ext(&markdown_body, self.options);
        let mut html_output = String::new();
        html::push_html(&mut html_output, parser);

        // Extract plain text for analysis
        let plain_text = self.extract_plain_text(&markdown_body);
        let word_count = self.count_words(&plain_text);
        let reading_time_minutes = self.calculate_reading_time(word_count);

        Ok(ProcessedContent {
            metadata,
            html: html_output,
            plain_text,
            word_count,
            reading_time_minutes,
        })
    }

    /// Extract frontmatter from markdown content
    fn extract_frontmatter(&self, content: &str) -> anyhow::Result<(ContentMetadata, String)> {
        let lines: Vec<&str> = content.lines().collect();
        
        if lines.is_empty() || !lines[0].trim().starts_with("---") {
            return Ok((ContentMetadata {
                title: None,
                description: None,
                post_date: None,
                authors: None,
                tags: None,
            }, content.to_string()));
        }

        // Find the end of frontmatter
        let mut end_index = None;
        for (i, line) in lines.iter().enumerate().skip(1) {
            if line.trim().starts_with("---") {
                end_index = Some(i);
                break;
            }
        }

        let end_index = end_index.ok_or_else(|| anyhow::anyhow!("Frontmatter not closed"))?;
        
        // Extract frontmatter content
        let frontmatter_lines = &lines[1..end_index];
        let frontmatter = frontmatter_lines.join("\n");
        
        // Parse the frontmatter (simplified YAML parsing)
        let metadata = self.parse_frontmatter(&frontmatter)?;
        
        // Extract the markdown body
        let body_lines = &lines[end_index + 1..];
        let body = body_lines.join("\n");

        Ok((metadata, body))
    }

    /// Parse frontmatter into metadata (simplified YAML parser)
    fn parse_frontmatter(&self, frontmatter: &str) -> anyhow::Result<ContentMetadata> {
        let mut metadata = ContentMetadata {
            title: None,
            description: None,
            post_date: None,
            authors: None,
            tags: None,
        };

        for line in frontmatter.lines() {
            let line = line.trim();
            if line.is_empty() || line.starts_with('#') {
                continue;
            }

            if let Some((key, value)) = line.split_once(':') {
                let key = key.trim();
                let value = value.trim().trim_matches('"').trim_matches('\'');

                match key {
                    "title" => metadata.title = Some(value.to_string()),
                    "description" => metadata.description = Some(value.to_string()),
                    "post_date" => {
                        metadata.post_date = value.parse().ok();
                    },
                    _ => {} // Ignore other fields for simplicity
                }
            }
        }

        Ok(metadata)
    }

    /// Extract plain text from markdown
    fn extract_plain_text(&self, markdown: &str) -> String {
        // Simple regex-based approach to remove markdown syntax
        let patterns = [
            (r"!\[.*?\]\(.*?\)", ""), // Images
            (r"\[([^\]]+)\]\([^\)]+\)", "$1"), // Links
            (r"#{1,6}\s*", ""), // Headers
            (r"\*\*([^*]+)\*\*", "$1"), // Bold
            (r"__([^_]+)__", "$1"), // Bold alt
            (r"\*([^*]+)\*", "$1"), // Italic
            (r"_([^_]+)_", "$1"), // Italic alt
            (r"`([^`]+)`", "$1"), // Inline code
            (r"```[\s\S]*?```", ""), // Code blocks
            (r">\s*", ""), // Blockquotes
            (r"^\s*[-*+]\s+", ""), // List items
            (r"^\s*\d+\.\s+", ""), // Numbered lists
        ];

        let mut text = markdown.to_string();
        for (pattern, replacement) in patterns {
            if let Ok(regex) = Regex::new(pattern) {
                text = regex.replace_all(&text, replacement).to_string();
            }
        }

        // Clean up extra whitespace
        let whitespace_regex = Regex::new(r"\s+").unwrap();
        whitespace_regex.replace_all(&text, " ").trim().to_string()
    }

    /// Count words in text
    fn count_words(&self, text: &str) -> usize {
        text.split_whitespace().count()
    }

    /// Calculate reading time based on word count (average 200 words per minute)
    fn calculate_reading_time(&self, word_count: usize) -> u32 {
        ((word_count as f64 / 200.0).ceil() as u32).max(1)
    }
}

impl Default for ContentProcessor {
    fn default() -> Self {
        Self::new()
    }
}

/// Analyze content for keywords and themes
pub fn analyze_content_keywords(text: &str, max_keywords: usize) -> Vec<String> {
    // Simple keyword extraction based on word frequency
    let text_lower = text.to_lowercase();
    let words: Vec<&str> = text_lower
        .split_whitespace()
        .filter(|word| word.len() > 3) // Filter out short words
        .collect();

    let mut word_counts = std::collections::HashMap::new();
    for word in words {
        // Remove punctuation
        let clean_word: String = word.chars()
            .filter(|c| c.is_alphabetic())
            .collect();
        
        if !clean_word.is_empty() && !is_stop_word(&clean_word) {
            *word_counts.entry(clean_word).or_insert(0) += 1;
        }
    }

    // Sort by frequency and return top keywords
    let mut keywords: Vec<(String, usize)> = word_counts.into_iter().collect();
    keywords.sort_by(|a, b| b.1.cmp(&a.1));
    
    keywords
        .into_iter()
        .take(max_keywords)
        .map(|(word, _)| word)
        .collect()
}

/// Check if a word is a common stop word
fn is_stop_word(word: &str) -> bool {
    matches!(word, 
        "the" | "and" | "or" | "but" | "in" | "on" | "at" | "to" | "for" | "of" | "with" | 
        "by" | "from" | "up" | "about" | "into" | "through" | "during" | "before" | "after" |
        "above" | "below" | "between" | "among" | "throughout" | "alongside" | "within" |
        "this" | "that" | "these" | "those" | "they" | "them" | "their" | "there" | "then" |
        "here" | "when" | "where" | "why" | "what" | "which" | "who" | "whom" | "whose" |
        "have" | "has" | "had" | "will" | "would" | "could" | "should" | "might" | "must" |
        "can" | "may" | "shall" | "being" | "been" | "was" | "were" | "are" | "is" | "am"
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_content_processor_creation() {
        let processor = ContentProcessor::new();
        assert!(processor.options.contains(Options::ENABLE_TABLES));
    }

    #[test]
    fn test_plain_text_extraction() {
        let processor = ContentProcessor::new();
        let markdown = "# Hello **World**\n\nThis is *italic* text.";
        let plain_text = processor.extract_plain_text(markdown);
        assert_eq!(plain_text, "Hello World This is italic text.");
    }

    #[test]
    fn test_word_count() {
        let processor = ContentProcessor::new();
        let text = "Hello world this is a test";
        assert_eq!(processor.count_words(text), 6);
    }

    #[test]
    fn test_keyword_analysis() {
        let text = "Rust programming language systems programming performance memory safety";
        let keywords = analyze_content_keywords(text, 3);
        assert!(keywords.contains(&"programming".to_string()));
    }
}