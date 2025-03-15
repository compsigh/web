import Image from 'next/image'

import styles from './Emote.module.css'

type Emote
  = 'bensonstare'
  | 'c'
  | 'calendar'
  | 'clone'
  | 'compsighLogo'
  | 'cue'
  | 'deploy23'
  | 'figma'
  | 'github'
  | 'go'
  | 'haskell'
  | 'heart'
  | 'hive'
  | 'intellijidea'
  | 'java'
  | 'leetcode'
  | 'linux'
  | 'markdown'
  | 'mehmote'
  | 'neovim'
  | 'nextjs'
  | 'nixos'
  | 'nodejs'
  | 'notepad'
  | 'obsidian'
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
  | 'threejs'
  | 'tunnel'
  | 'typescript'
  | 'usf'
  | 'ventrue'
  | 'vercel'
  | 'vim'
  | 'vscode'
  | 'warp'

const emoteSrcs: Record<Emote, string> = {
  bensonstare:  '/emotes/bensonstare.png',
  c:            '/emotes/c.svg',
  calendar:     '/emotes/calendar.svg',
  clone:        '/emotes/clone.svg',
  compsighLogo: '/assets/compsigh-logo.svg',
  cue:          '/emotes/cue.svg',
  deploy23:     '/emotes/deploy23.svg',
  figma:        '/emotes/figma.svg',
  github:       '/emotes/github.svg',
  go:           '/emotes/go.png',
  haskell:      '/emotes/haskell.svg',
  heart:        '/emotes/heart.svg',
  hive:         '/emotes/hive.svg',
  intellijidea: '/emotes/intellijidea.svg',
  java:         '/emotes/java.svg',
  leetcode:     '/emotes/leetcode.png',
  linux:        '/emotes/linux.png',
  markdown:     '/emotes/markdown.png',
  mehmote:      '/emotes/mehmote.png',
  neovim:       '/emotes/neovim.svg',
  nextjs:       '/emotes/nextjs.svg',
  nixos:        '/emotes/nixos.svg',
  nodejs:       '/emotes/nodejs.svg',
  notepad:      '/emotes/notepad.svg',
  obsidian:     '/emotes/obsidian.png',
  openBook:     '/emotes/open-book.svg',
  philmote:     '/emotes/philmote.png',
  picnic:       '/emotes/picnic.svg',
  playingCards: '/emotes/playing-cards.svg',
  python:       '/emotes/python.png',
  react:        '/emotes/react.svg',
  repost:       '/emotes/repost.svg',
  rust:         '/emotes/rust.svg',
  sunflowers:   '/emotes/sunflowers.png',
  taoFedora:    '/emotes/tao-fedora.png',
  threejs:      '/emotes/threejs.svg',
  tunnel:       '/emotes/tunnel.svg',
  typescript:   '/emotes/typescript.svg',
  usf:          '/emotes/usf.png',
  ventrue:      '/emotes/ventrue.svg',
  vercel:       '/emotes/vercel.svg',
  vim:          '/emotes/vim.svg',
  vscode:       '/emotes/vscode.png',
  warp:         '/emotes/warp.png',
}

export function Emote({ emote }: { emote: Emote }) {
  return (
    <Image
      className={styles.emote}
      src={emoteSrcs[emote]}
      alt={emote}
      width={24}
      height={24}
      style={{ animationDelay: `${Math.random() * 2}s` }}
    />
  )
}
