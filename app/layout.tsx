import type { Metadata } from 'next'
import localFont from 'next/font/local'

const Delko = localFont({
  src: [{
    path: '../public/fonts/Delko-Regular.woff',
    weight: '400',
    style: 'normal'
  }],
  variable: '--font-delko'
})

const ProtoMono = localFont({
  src: [
    {
      path: '../public/fonts/ProtoMono-Light.woff',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../public/fonts/ProtoMono-Regular.woff',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/fonts/ProtoMono-Medium.woff',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../public/fonts/ProtoMono-SemiBold.woff',
      weight: '600',
      style: 'normal'
    }
  ],
  variable: '--font-proto-mono'
})

const InstrumentSerif = localFont({
  src: [
    {
      path: '../public/fonts/InstrumentSerif-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/fonts/InstrumentSerif-Italic.woff2',
      weight: '400',
      style: 'italic'
    }
  ],
  variable: '--font-instrument-serif'
})

const TXA = localFont({
  src: [
    {
      path: '../public/fonts/TXA-Regular.woff',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/fonts/TXA-Bold.woff',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-txa'
})

const TronicaMono = localFont({
  src: [
    {
      path: '../public/fonts/TronicaMono.woff',
      weight: '400',
      style: 'normal'
    }
  ],
  variable: '--font-tronica-mono'
})

import './globals.css'

let metadataBase: URL
if (process.env.VERCEL_URL) metadataBase = new URL('https://compsigh.club')
else metadataBase = new URL(`http://localhost:${process.env.PORT || 3000}`)

export const metadata: Metadata = {
  metadataBase,
  title: 'compsigh',
  description: 'A social computer science club for meeting cool people and building cool things at the University of San Francisco',
  openGraph: {
    images: '/assets/og-image.png'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${Delko.variable} ${ProtoMono.variable} ${InstrumentSerif.variable} ${TXA.variable} ${TronicaMono.variable}`}
    >
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
