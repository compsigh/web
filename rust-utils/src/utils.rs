use std::fs;
use std::path::Path;
use anyhow::Result;
use serde::{Deserialize, Serialize};

/// Utility functions for the compsigh web platform

/// Generate a random rotation value for UI elements (like quotes)
pub fn generate_random_rotation() -> f32 {
    use rand::Rng;
    let mut rng = rand::thread_rng();
    rng.gen_range(-10.0..=10.0)
}

/// Calculate file hash for cache busting
pub fn calculate_file_hash<P: AsRef<Path>>(path: P) -> Result<String> {
    let content = fs::read(path)?;
    let hash = md5::compute(&content);
    Ok(format!("{:x}", hash))
}

/// Optimize CSS by removing comments and extra whitespace
pub fn optimize_css(css: &str) -> String {
    let mut optimized = String::new();
    let mut in_comment = false;
    let mut chars = css.chars().peekable();
    
    while let Some(ch) = chars.next() {
        if !in_comment {
            if ch == '/' && chars.peek() == Some(&'*') {
                in_comment = true;
                chars.next(); // consume '*'
                continue;
            }
            
            // Remove unnecessary whitespace
            if ch.is_whitespace() {
                if !optimized.ends_with(' ') && !optimized.is_empty() {
                    optimized.push(' ');
                }
            } else {
                optimized.push(ch);
            }
        } else {
            if ch == '*' && chars.peek() == Some(&'/') {
                in_comment = false;
                chars.next(); // consume '/'
            }
        }
    }
    
    optimized.trim().to_string()
}

/// Extract color palette from CSS content
pub fn extract_css_colors(css: &str) -> Vec<String> {
    use regex::Regex;
    
    let mut colors = Vec::new();
    
    // Match hex colors
    if let Ok(hex_regex) = Regex::new(r"#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b") {
        for cap in hex_regex.captures_iter(css) {
            colors.push(cap[0].to_string());
        }
    }
    
    // Match RGB colors
    if let Ok(rgb_regex) = Regex::new(r"rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)") {
        for cap in rgb_regex.captures_iter(css) {
            colors.push(cap[0].to_string());
        }
    }
    
    // Match HSL colors
    if let Ok(hsl_regex) = Regex::new(r"hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)") {
        for cap in hsl_regex.captures_iter(css) {
            colors.push(cap[0].to_string());
        }
    }
    
    // Remove duplicates and sort
    colors.sort();
    colors.dedup();
    colors
}

/// Performance metrics collector
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PerformanceMetrics {
    pub page_load_time: Option<u64>,
    pub bundle_size: Option<u64>,
    pub memory_usage: Option<u64>,
    pub cpu_usage: Option<f64>,
}

impl PerformanceMetrics {
    pub fn new() -> Self {
        Self {
            page_load_time: None,
            bundle_size: None,
            memory_usage: None,
            cpu_usage: None,
        }
    }
    
    pub fn to_json(&self) -> Result<String> {
        Ok(serde_json::to_string(self)?)
    }
}

impl Default for PerformanceMetrics {
    fn default() -> Self {
        Self::new()
    }
}

/// Image optimization utilities
pub fn calculate_optimal_image_dimensions(
    original_width: u32,
    original_height: u32,
    max_width: u32,
    max_height: u32,
) -> (u32, u32) {
    let width_ratio = max_width as f64 / original_width as f64;
    let height_ratio = max_height as f64 / original_height as f64;
    let scale_ratio = width_ratio.min(height_ratio);
    
    if scale_ratio >= 1.0 {
        // No need to scale down
        (original_width, original_height)
    } else {
        (
            (original_width as f64 * scale_ratio) as u32,
            (original_height as f64 * scale_ratio) as u32,
        )
    }
}

/// Generate responsive image srcset
pub fn generate_srcset(base_url: &str, widths: &[u32]) -> String {
    widths
        .iter()
        .map(|width| format!("{}_{}w.jpg {}w", base_url, width, width))
        .collect::<Vec<_>>()
        .join(", ")
}

/// Validate email addresses (simple validation)
pub fn is_valid_email(email: &str) -> bool {
    use regex::Regex;
    if let Ok(email_regex) = Regex::new(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$") {
        email_regex.is_match(email)
    } else {
        false
    }
}

/// Generate slug from title
pub fn generate_slug(title: &str) -> String {
    use regex::Regex;
    
    let mut slug = title.to_lowercase();
    
    // Replace spaces and special characters with hyphens
    if let Ok(space_regex) = Regex::new(r"[\s\W]+") {
        slug = space_regex.replace_all(&slug, "-").to_string();
    }
    
    // Remove leading/trailing hyphens
    slug = slug.trim_matches('-').to_string();
    
    // Limit length
    if slug.len() > 50 {
        slug.truncate(50);
        slug = slug.trim_matches('-').to_string();
    }
    
    slug
}

/// Text processing utilities
pub struct TextProcessor;

impl TextProcessor {
    /// Extract headings from markdown
    pub fn extract_headings(markdown: &str) -> Vec<(u8, String)> {
        use regex::Regex;
        
        let mut headings = Vec::new();
        
        if let Ok(heading_regex) = Regex::new(r"^(#{1,6})\s+(.+)$") {
            for line in markdown.lines() {
                if let Some(caps) = heading_regex.captures(line) {
                    let level = caps[1].len() as u8;
                    let title = caps[2].to_string();
                    headings.push((level, title));
                }
            }
        }
        
        headings
    }
    
    /// Generate table of contents from headings
    pub fn generate_toc(headings: &[(u8, String)]) -> String {
        let mut toc = String::new();
        
        for (level, title) in headings {
            let indent = "  ".repeat(*level as usize - 1);
            let slug = generate_slug(title);
            toc.push_str(&format!("{}* [{}](#{})\n", indent, title, slug));
        }
        
        toc
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_random_rotation() {
        let rotation = generate_random_rotation();
        assert!(rotation >= -10.0 && rotation <= 10.0);
    }

    #[test]
    fn test_css_optimization() {
        let css = "/* comment */ body { margin: 0;    padding:   0; }";
        let optimized = optimize_css(css);
        assert_eq!(optimized, "body { margin: 0; padding: 0; }");
    }

    #[test]
    fn test_color_extraction() {
        let css = "body { color: #FF0000; background: rgb(255, 255, 255); }";
        let colors = extract_css_colors(css);
        assert!(colors.contains(&"#FF0000".to_string()));
        assert!(colors.contains(&"rgb(255, 255, 255)".to_string()));
    }

    #[test]
    fn test_image_dimensions() {
        let (width, height) = calculate_optimal_image_dimensions(1000, 800, 500, 400);
        assert_eq!((width, height), (500, 400));
    }

    #[test]
    fn test_email_validation() {
        assert!(is_valid_email("test@example.com"));
        assert!(!is_valid_email("invalid-email"));
    }

    #[test]
    fn test_slug_generation() {
        assert_eq!(generate_slug("Hello World!"), "hello-world");
        assert_eq!(generate_slug("Special @#$ Characters"), "special-characters");
    }

    #[test]
    fn test_heading_extraction() {
        let markdown = "# Main Title\n## Subtitle\n### Sub-subtitle";
        let headings = TextProcessor::extract_headings(markdown);
        assert_eq!(headings.len(), 3);
        assert_eq!(headings[0], (1, "Main Title".to_string()));
        assert_eq!(headings[1], (2, "Subtitle".to_string()));
    }
}