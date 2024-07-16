'use client'

import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useRef, useState } from 'react'

import './CommandBar.css'

export function CommandBar() {
  const [open, setOpen] = useState(false)
  const container = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const showCommandBarListener = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault()
        setOpen(true)
      }
    }

    document.addEventListener('keydown', showCommandBarListener)
    return () => document.removeEventListener('keydown', showCommandBarListener)
  }, [])

  return (
    <div ref={container}>
      <Command.Dialog
        container={container.current ?? undefined}
        open={open}
        onOpenChange={setOpen}
      >
        <div
          style={{
            position: 'absolute',
            marginLeft: '-16px',
            marginTop: '2px',
            color: 'var(--color-compsigh)',
            fontFamily: 'var(--font-proto-mono)',
          }}>
            &gt;
          </div>
        <Command.Input autoFocus />
        <Command.List>
          <Command.Empty>No results found</Command.Empty>
          <Items />
        </Command.List>
      </Command.Dialog>
    </div>
  )
}

function Items() {
  const router = useRouter()
  return (
    <>
      <Command.Group heading="Pages">
        <Item onSelect={() => router.push('/', {scroll: false})}>
          Home
        </Item>
        <Item onSelect={() => router.push('/events')} disabled>
          Events
        </Item>
        <Item onSelect={() => router.push('/updates')} disabled>
          Updates
        </Item>
        <Item onSelect={() => router.push('/projects')} disabled>
          Projects
        </Item>
      </Command.Group>

      <Command.Separator />

      <Command.Group heading="Socials">
        <Item onSelect={() => window.open('https://discord.compsigh.club')}>
          Discord
        </Item>
        <Item onSelect={() => window.open('https://instagram.com/compsigh_')}>
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
