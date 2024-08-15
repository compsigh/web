'use client'

import { Command } from 'cmdk'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useRef, useState } from 'react'

import './Terminal.css'

export function Terminal() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const container = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const showTerminalListener = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault()
        setOpen(true)
      }
    }

    document.addEventListener('keydown', showTerminalListener)
    return () => document.removeEventListener('keydown', showTerminalListener)
  }, [])

  function Items() {
    const router = useRouter()
    return (
      <>
        <Command.Group heading="Pages">
          <Item
            onSelect={() => {
              setOpen(false)
              router.push('/', {scroll: false})
            }}
          >
            Home
          </Item>
          <Item
            onSelect={() => {
              setOpen(false)
              router.push('/events')
            }}
          >
            Events
          </Item>
          <Item
            onSelect={() => {
              setOpen(false)
              router.push('/community')
            }}
          >
            Community
          </Item>
          <Item
            onSelect={() => {
              setOpen(false)
              router.push('/docs')
            }}
          >
            Docs
          </Item>
        </Command.Group>

        <Command.Separator />

        <Command.Group heading="Socials">
          <Item
            onSelect={() => {
              setOpen(false)
              window.open('https://discord.compsigh.club')
            }}
          >
            Discord
          </Item>
          <Item
            onSelect={() => {
              setOpen(false)
              window.open('https://instagram.com/compsigh_')
            }}
          >
            Instagram
          </Item>
        </Command.Group>
      </>
    )
  }

  function Item({
    children,
    onSelect = () => {},
    disabled = false
  }: {
    children: ReactNode
    onSelect?: (value: string) => void
    disabled?: boolean
  }) {
    return (
      <Command.Item onSelect={onSelect} disabled={disabled}>
        {children}
      </Command.Item>
    )
  }

  return (
    <>
      <div id="page-dimmer"
        style={{
          opacity: open ? 0.5 : 0,
        }}
      />
      <div
        ref={container}
        id="terminal-container"
      >
        <Command.Dialog
          container={container.current ?? undefined}
          open={open}
          onOpenChange={setOpen}
        >
          <Command.List>
            <Command.Empty>No results found</Command.Empty>
            <Items />
          </Command.List>
          <div id="terminal-path">
            ~{pathname}
          </div>
          <Command.Input autoFocus />
        </Command.Dialog>
      </div>
    </>
  )
}
