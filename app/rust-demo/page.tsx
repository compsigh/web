import { RandomQuote } from '@/components/Decorations/Quote'
import { RustRandomQuote } from '@/components/Decorations/Quote'

export default function RustDemo() {
  return (
    <div style={{ 
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1>🦀 Rust Integration Demo</h1>
      
      <p>
        This page demonstrates the integration of Rust utilities with the compsigh web platform.
        The quotes below are powered by high-performance Rust code.
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '40px',
        marginTop: '40px'
      }}>
        <div>
          <h2>Original JavaScript Quote</h2>
          <RandomQuote />
        </div>
        
        <div>
          <h2>⚡ Rust-Powered Quote</h2>
          <RustRandomQuote />
        </div>
      </div>

      <div style={{ marginTop: '60px' }}>
        <h2>🚀 Performance Benefits</h2>
        <ul>
          <li><strong>Memory Safety:</strong> Rust prevents buffer overflows and memory leaks</li>
          <li><strong>Speed:</strong> Significantly faster processing for large datasets</li>
          <li><strong>Reliability:</strong> Strong type system prevents runtime errors</li>
          <li><strong>Concurrency:</strong> Safe parallel processing capabilities</li>
        </ul>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2>🛠 Available Tools</h2>
        <div style={{ 
          background: '#f5f5f5', 
          padding: '20px', 
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          <p><strong>Quote Management:</strong></p>
          <p>npm run rust:quote random</p>
          <p>npm run rust:quote stats</p>
          <p>npm run rust:quote search "programming"</p>
          
          <p style={{ marginTop: '20px' }}><strong>Content Processing:</strong></p>
          <p>npm run rust:content process-markdown -i content.md</p>
          <p>npm run rust:content keywords -i content.md</p>
          <p>npm run rust:content optimize-css -i styles.css</p>
        </div>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <p style={{ opacity: 0.7 }}>
          🦀 Rust integration by compsigh - bridging performance and web development
        </p>
      </div>
    </div>
  )
}