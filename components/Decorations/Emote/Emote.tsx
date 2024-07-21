import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

import compsighLogo from '@/public/assets/compsigh-logo.svg'
import hive from '@/public/icons/hive.svg'
import bensonstare from '@/public/emotes/bensonstare.png'
import buildingBlocks from '@/public/emotes/building-blocks.svg'
import calendar from '@/public/emotes/calendar.svg'
import cascade from '@/public/emotes/cascade.png'
import cue from '@/public/emotes/cue.svg'
import heart from '@/public/emotes/heart.svg'
import mehmote from '@/public/emotes/mehmote.png'
import moon from '@/public/emotes/moon.svg'
import nextjs from '@/public/emotes/nextjs.svg'
import notepad from '@/public/emotes/notepad.svg'
import openBook from '@/public/emotes/open-book.svg'
import philmote from '@/public/emotes/philmote.png'
import picnic from '@/public/emotes/picnic.svg'
import playingCards from '@/public/emotes/playing-cards.svg'
import repost from '@/public/emotes/repost.png'
import rust from '@/public/emotes/rust.svg'
import sunflowers from '@/public/emotes/sunflowers.png'
import taoFedora from '@/public/emotes/tao-fedora.png'
import vercel from '@/public/emotes/vercel.svg'

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
  | 'random'

export function Emote({ emote }: { emote: Emote }) {
  const emotes = [
    compsighLogo,
    hive,
    bensonstare,
    buildingBlocks,
    calendar,
    cascade,
    cue,
    heart,
    mehmote,
    moon,
    nextjs,
    notepad,
    openBook,
    philmote,
    picnic,
    playingCards,
    repost,
    rust,
    sunflowers,
    taoFedora,
    vercel
  ]

  let selectedEmote: StaticImport
  switch (emote) {
    case 'compsighLogo':
      selectedEmote = compsighLogo
      break
    case 'hive':
      selectedEmote = hive
      break
    case 'bensonstare':
      selectedEmote = bensonstare
      break
    case 'buildingBlocks':
      selectedEmote = buildingBlocks
      break
    case 'calendar':
      selectedEmote = calendar
      break
    case 'cascade':
      selectedEmote = cascade
      break
    case 'cue':
      selectedEmote = cue
      break
    case 'heart':
      selectedEmote = heart
      break
    case 'mehmote':
      selectedEmote = mehmote
      break
    case 'moon':
      selectedEmote = moon
      break
    case 'nextjs':
      selectedEmote = nextjs
      break
    case 'notepad':
      selectedEmote = notepad
      break
    case 'openBook':
      selectedEmote = openBook
      break
    case 'philmote':
      selectedEmote = philmote
      break
    case 'picnic':
      selectedEmote = picnic
      break
    case 'playingCards':
      selectedEmote = playingCards
      break
    case 'repost':
      selectedEmote = repost
      break
    case 'rust':
      selectedEmote = rust
      break
    case 'sunflowers':
      selectedEmote = sunflowers
      break
    case 'taoFedora':
      selectedEmote = taoFedora
      break
    case 'vercel':
      selectedEmote = vercel
      break
    case 'random':
      selectedEmote = emotes[Math.floor(Math.random() * emotes.length)]
      break
  }

  return (
    <Image
      src={selectedEmote}
      width={24}
      height={24}
      alt=""
      style={{
        opacity: 0.5,
        animation: 'rotate 2s linear infinite',
        animationDelay: `${Math.random() * 2}s`,
        pointerEvents: 'none'
      }}
    />
  )
}
