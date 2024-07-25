import Image from 'next/image'

import './Emote.css'

export type Emote
  = 'bensonstare'
  | 'buildingBlocks'
  | 'c'
  | 'calendar'
  | 'compsighLogo'
  | 'cue'
  | 'deploy23'
  | 'heart'
  | 'hive'
  | 'java'
  | 'mehmote'
  | 'moon'
  | 'nextjs'
  | 'nixos'
  | 'nodejs'
  | 'notepad'
  | 'openBook'
  | 'philmote'
  | 'picnic'
  | 'playingCards'
  | 'python'
  | 'react'
  | 'repost'
  | 'rust'
  | 'sunflowers'
  | 'taoFedora'
  | 'tunnel'
  | 'typescript'
  | 'usf'
  | 'ventrue'
  | 'vercel'

export const emoteSrcs: Record<Emote, string> = {
  bensonstare: '/emotes/bensonstare.png',
  buildingBlocks: '/emotes/building-blocks.svg',
  c: '/emotes/c.svg',
  calendar: '/emotes/calendar.svg',
  compsighLogo: '/assets/compsigh-logo.svg',
  cue: '/emotes/cue.svg',
  deploy23: '/emotes/deploy23.svg',
  heart: '/emotes/heart.svg',
  hive: '/icons/hive.svg',
  java: '/emotes/java.svg',
  mehmote: '/emotes/mehmote.png',
  moon: '/emotes/moon.svg',
  nextjs: '/emotes/nextjs.svg',
  nixos: '/emotes/nixos.svg',
  nodejs: '/emotes/nodejs.svg',
  notepad: '/emotes/notepad.svg',
  openBook: '/emotes/open-book.svg',
  philmote: '/emotes/philmote.png',
  picnic: '/emotes/picnic.svg',
  playingCards: '/emotes/playing-cards.svg',
  python: '/emotes/python.svg',
  react: '/emotes/react.svg',
  repost: '/emotes/repost.svg',
  rust: '/emotes/rust.svg',
  sunflowers: '/emotes/sunflowers.png',
  taoFedora: '/emotes/tao-fedora.png',
  tunnel: '/emotes/tunnel.svg',
  typescript: '/emotes/typescript.svg',
  usf: '/emotes/usf.png',
  ventrue: '/emotes/ventrue.svg',
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
