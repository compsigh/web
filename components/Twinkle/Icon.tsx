'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import styles from './Icon.module.css'

export type Icon = 'none' | 'low' | 'medium-low' | 'medium-high' | 'high'

const iconSrcs: Record<Icon, string> = {
  none: '/emotes/contribution-none.svg',
  low: '/emotes/contribution-low.svg',
  'medium-low': '/emotes/contribution-mediumlow.svg',
  'medium-high': '/emotes/contribution-mediumhigh.svg',
  high: '/emotes/contribution-high.svg'
}

export function Icon({ icon }: { icon: Icon }) {
  const [delay, setDelay] = useState(0)

  useEffect(() => {
    setDelay(Math.random() * 2)
  }, [])

  return (
    <>
      <Image
        src={iconSrcs[icon]}
        className={styles.icon}
        width={24}
        height={24}
        alt=""
        style={{ animationDelay: `${delay}s` }}
      />
    </>
  )
}
