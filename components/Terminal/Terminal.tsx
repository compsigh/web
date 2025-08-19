'use client'

import { Command } from 'cmdk'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { FaDiscord, FaInstagram } from 'react-icons/fa'

import './Terminal.css'

export function Terminal() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const container = useRef<HTMLDivElement | null>(null)
  const [displayToggle, setDisplayToggle] = useState(false)
  const [displayTerminalEdu, setDisplayTerminalEdu] = useState(false)
  const [terminalEduStyle, setTerminalEduStyle] = useState<'subtle' | 'full'>('full')

  useEffect(() => {
    const hasOpenedTerminal = () => {
      return localStorage.getItem('opened-terminal')
    }

    const showTerminalListener = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault()
        if (!hasOpenedTerminal())
          localStorage.setItem('opened-terminal', 'true')
        setOpen(true)
        setDisplayTerminalEdu(false)
      }
    }

    const resetTerminalEduStyle = () => {
      const opened = hasOpenedTerminal()
      if (opened)
        setTerminalEduStyle('subtle')
      else
        setTerminalEduStyle('full')
    }

    const hideTerminalEduOnSmallerScreens = () => {
      if (window.innerWidth < 860) {
        setDisplayTerminalEdu(false)
        setDisplayToggle(true)
      }
    }

    const hideSubtleTerminalEduAfterDelay = () => {
      if (hasOpenedTerminal())
        setTimeout(() => setDisplayTerminalEdu(false), 3200)
    }

    resetTerminalEduStyle()
    setDisplayTerminalEdu(true)
    hideTerminalEduOnSmallerScreens()
    hideSubtleTerminalEduAfterDelay()
    document.addEventListener('keydown', showTerminalListener)
    window.addEventListener('resize', hideTerminalEduOnSmallerScreens)
    return () => {
      document.removeEventListener('keydown', showTerminalListener)
      window.removeEventListener('resize', hideTerminalEduOnSmallerScreens)
    }
  }, [terminalEduStyle, pathname])

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
              router.push('/discord')
            }}
          >
            <FaDiscord size={16} />
            Discord
          </Item>
          <Item
            onSelect={() => {
              setOpen(false)
              router.push('/instagram')
            }}
          >
            <FaInstagram size={16} />
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

  function TerminalToggle() {
    return (
      <button
        id="terminal-toggle"
        onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: '/' }))}
      >
        <kbd>/</kbd>
      </button>
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
        {
          displayTerminalEdu &&
            <div
              id="terminal-edu"
              className={terminalEduStyle}
            >
              <span>&gt;</span>
              <span>
                {terminalEduStyle === 'full' && <>Hit <kbd>/</kbd> to pull up the Terminal</>}
                {terminalEduStyle === 'subtle' && <><kbd>/</kbd> to navigate</>}
              </span>
              <span>&gt;</span>
            </div>
        }
        {
          displayToggle &&
            <TerminalToggle />
        }
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
          {
            !displayToggle &&
              <Command.Input autoFocus />
          }
        </Command.Dialog>
      </div>
    </>
  )
}
