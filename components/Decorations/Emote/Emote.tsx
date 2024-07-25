import Image from 'next/image'

import './Emote.css'

export type Emote
  = 'compsighLogo'
  | 'hive'
  | 'bensonstare'
  | 'buildingBlocks'
  | 'calendar'
  | 'cascade'
  | 'cue'
  | 'heart'
  | 'mehmote'
  | 'moon'
  | 'nextjs'
  | 'notepad'
  | 'openBook'
  | 'philmote'
  | 'picnic'
  | 'playingCards'
  | 'repost'
  | 'rust'
  | 'sunflowers'
  | 'taoFedora'
  | 'vercel'

export const emoteSrcs: Record<Emote, string> = {
  compsighLogo: '/emotes/compsigh-logo.svg',
  hive: '/icons/hive.svg',
  bensonstare: '/emotes/bensonstare.png',
  buildingBlocks: '/emotes/building-blocks.svg',
  calendar: '/emotes/calendar.svg',
  cascade: '/emotes/cascade.png',
  cue: '/emotes/cue.svg',
  heart: '/emotes/heart.svg',
  mehmote: '/emotes/mehmote.png',
  moon: '/emotes/moon.svg',
  nextjs: '/emotes/nextjs.svg',
  notepad: '/emotes/notepad.svg',
  openBook: '/emotes/open-book.svg',
  philmote: '/emotes/philmote.png',
  picnic: '/emotes/picnic.svg',
  playingCards: '/emotes/playing-cards.svg',
  repost: '/emotes/repost.png',
  rust: '/emotes/rust.svg',
  sunflowers: '/emotes/sunflowers.png',
  taoFedora: '/emotes/tao-fedora.png',
  vercel: '/emotes/vercel.svg'
}

export function Emote({ emote }: { emote: Emote }) {
  return (
    <Image
      src={emoteSrcs[emote]}
      alt={emote}
      width={24}
      height={24}
      style={{
        opacity: 0.5,
        animation: 'rotate 2s linear infinite',
        animationDelay: `${Math.random() * 2}s`,
        pointerEvents: 'none'
      }}
    />
  )
}
