import styles from './Quote.module.css'

type Quote = {
  quote: string
  author: string
}

export const quotes: Quote[] = [
  {
    quote: 'I could not be more powered by AI right now',
    author: 'Jet'
  },
  {
    quote: "it's Python; type errors aren't real",
    author: 'Jet'
  },
  {
    quote: 'using machine learning to rate how well you are mewing',
    author: 'Faadil'
  },
  {
    quote: 'Just tried to auto-pair brackets on paper',
    author: 'Tao'
  },
  {
    quote: "idk who atoi() ppl are but as an INTJ I don't like the sound of it",
    author: 'Faadil'
  },
  {
    quote: "idk I think I'm fucked",
    author: 'Eric'
  },
  {
    quote: '"iteration velocity" is us committing tax fraud by the end of next week',
    author: 'Jet'
  },
  {
    quote: 'just core dumped in my pants a bit',
    author: 'Jet'
  },
  {
    quote: 'Java code makes the reader have cache misses in their brain',
    author: 'Tao'
  },
  {
    quote: 'Put your editor where your mouth is',
    author: 'Jet'
  }
]

export function Quote({ quote }: { quote: Quote }) {
  return (
    <>
      <div
        id={styles["quote-container"]}
        style={{
          // Random rotation between -10 and 10 degrees
          transform: `rotate(${Math.random() * 20 - 10}deg)`
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
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
  return (
    <>
      <Quote quote={randomQuote} />
    </>
  )
}
