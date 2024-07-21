'use client'

import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

import ContribNone from '@/public/icons/contrib-none.svg'
import ContribLow from '@/public/icons/contrib-low.svg'
import ContribMediumLow from '@/public/icons/contrib-mediumlow.svg'
import ContribMediumHigh from '@/public/icons/contrib-mediumhigh.svg'
import ContribHigh from '@/public/icons/contrib-high.svg'

import './ContribIcon.css'

export type Icon = 'none' | 'low' | 'medium-low' | 'medium-high' | 'high' | 'random'

export function ContribIcon({ icon }: { icon: Icon }) {
  const icons = [
    ContribNone,
    ContribLow,
    ContribMediumLow,
    ContribMediumHigh,
    ContribHigh
  ]


  let selectedIcon: StaticImport
  switch (icon) {
    case 'none':
      selectedIcon = ContribNone
      break
    case 'low':
      selectedIcon = ContribLow
      break
    case 'medium-low':
      selectedIcon = ContribMediumLow
      break
    case 'medium-high':
      selectedIcon = ContribMediumHigh
      break
    case 'high':
      selectedIcon = ContribHigh
      break
    case 'random':
      selectedIcon = icons[Math.floor(Math.random() * icons.length)]
      break
  }

  return (
    <>
      <div>
        <Image
          src={selectedIcon}
          width={24}
          height={24}
          alt=""
          style={{
            animation: 'fluctuateOpacity 2s ease infinite',
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      </div>
    </>
  )
}
