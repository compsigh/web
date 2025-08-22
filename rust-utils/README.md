# Rust Utils for compsigh Web Platform

This directory contains Rust utilities that enhance the performance and functionality of the compsigh web platform.

## Overview

The Rust utilities provide high-performance alternatives and enhancements for computationally intensive tasks, including:

- **Quote Management**: Efficient random quote selection with cryptographically secure randomness
- **Content Processing**: Fast markdown parsing, keyword extraction, and text analysis
- **Utility Functions**: CSS optimization, image processing helpers, and text processing

## Architecture

The Rust utilities are designed to complement the existing JavaScript/TypeScript codebase:

- **CLI Tools**: Standalone command-line tools for content processing
- **Library Functions**: Rust library that can be called from Node.js
- **Fallback Support**: JavaScript fallbacks ensure reliability

## Components

### Quote System (`src/quote.rs`)

- `QuoteManager`: Manages collections of quotes with advanced functionality
- Cryptographically secure random selection
- Search and filtering capabilities
- Author-based organization
- Statistics and analytics

### Content Processing (`src/content.rs`)

- `ContentProcessor`: High-performance markdown processing
- Frontmatter extraction and parsing
- Plain text extraction for analysis
- Reading time calculation
- Keyword extraction and analysis

### Utilities (`src/utils.rs`)

- CSS optimization and minification
- Color palette extraction from CSS
- Image dimension calculation
- Email validation
- Slug generation from titles
- Text processing utilities

## CLI Tools

### Quote CLI (`quote-cli`)

```bash
# Get a random quote
./target/release/quote-cli random

# Get multiple quotes
./target/release/quote-cli random-multiple --count 5

# Search quotes
./target/release/quote-cli search "rust"

# Get statistics
./target/release/quote-cli stats

# List all authors
./target/release/quote-cli authors
```

### Content Processor (`content-processor`)

```bash
# Process a markdown file
./target/release/content-processor process-markdown -i input.md

# Extract keywords
./target/release/content-processor keywords -i input.md --max-keywords 10

# Generate table of contents
./target/release/content-processor toc -i input.md

# Optimize CSS
./target/release/content-processor optimize-css -i styles.css
```

## Integration with Node.js

The Rust utilities are integrated with the Next.js application through:

1. **CLI Integration**: Node.js scripts call Rust binaries using `execSync`
2. **Build Process**: Rust compilation integrated into the build pipeline
3. **Fallback System**: JavaScript fallbacks ensure functionality if Rust fails

### Usage Example

```typescript
import { rustQuoteManager } from '@/lib/rust-utils'

// Get a random quote (falls back to JS if Rust fails)
const quote = rustQuoteManager.getRandomQuote()

// Search quotes
const searchResults = rustQuoteManager.searchQuotes("programming")
```

## Performance Benefits

The Rust implementation provides several advantages:

- **Memory Safety**: Prevents common bugs like buffer overflows
- **Performance**: Significantly faster processing for large content
- **Concurrency**: Safe parallel processing capabilities
- **Reliability**: Strong type system prevents runtime errors

## Build Instructions

```bash
# Build Rust utilities
cd rust-utils
cargo build --release

# Run tests
cargo test

# Build with npm integration
npm run build:rust
```

## Development

### Adding New Utilities

1. Add your module to `src/lib.rs`
2. Implement your functionality with proper error handling
3. Add tests for your module
4. Create CLI interface if needed in `src/bin/`
5. Update Node.js wrapper in `lib/rust-utils.ts`

### Testing

```bash
# Run Rust tests
cargo test

# Test CLI tools
./target/debug/quote-cli --help
./target/debug/content-processor --help
```

## Future Enhancements

Potential areas for expansion:

- **WebAssembly**: Compile to WASM for client-side performance
- **Database Integration**: Direct database connections for quote management
- **Image Processing**: Advanced image optimization utilities
- **Search Engine**: Full-text search capabilities for content
- **Analytics**: Advanced content analytics and insights

## Contributing

When contributing to the Rust utilities:

1. Follow Rust naming conventions and best practices
2. Add comprehensive tests for new functionality
3. Update documentation and examples
4. Ensure Node.js integration works properly
5. Test fallback behavior for error cases