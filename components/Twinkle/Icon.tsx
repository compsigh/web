'use client'

import { useEffect, useState } from 'react'

import styles from './Icon.module.css'

export type Icon = 'none' | 'low' | 'medium-low' | 'medium-high' | 'high'

const None = () => (
  <div
    style={{
      width: 24,
      height: 24,
      background: '#060505',
      border: '2.4px solid rgba(255, 236, 204, 0.1)',
      borderRadius: 7.2
    }}
  />
)

const Low = () => (
  <div
    style={{
      width: 24,
      height: 24,
      background: '#664100',
      border: '2.4px solid rgba(255, 236, 204, 0.05)',
      borderRadius: 7.2
    }}
  />
)

const MediumLow = () => (
  <div
    style={{
      width: 24,
      height: 24,
      background: '#996100',
      border: '2.4px solid rgba(6, 5, 5, 0.05)',
      borderRadius: 7.2
    }}
  />
)

const MediumHigh = () => (
  <div
    style={{
      width: 24,
      height: 24,
      background: '#CC8200',
      border: '2.4px solid rgba(6, 5, 5, 0.05)',
      borderRadius: 7.2
    }}
  />
)

const High = () => (
  <div
    style={{
      width: 24,
      height: 24,
      background: '#FFA200',
      border: '2.4px solid rgba(6, 5, 5, 0.05)',
      borderRadius: 7.2
    }}
  />
)

const iconSrcs: Record<Icon, JSX.Element> = {
  none: <None />,
  low: <Low />,
  'medium-low': <MediumLow />,
  'medium-high': <MediumHigh />,
  high: <High />
}

export function Icon({ icon }: { icon: Icon }) {
  const [delay, setDelay] = useState(0)

  useEffect(() => {
    setDelay(Math.random() * 2)
  }, [])

  return (
    <>
      <div
        className={styles.icon}
        style={{ animationDelay: `${delay}s` }}
      >
        {iconSrcs[icon]}
      </div>
    </>
  )
}
