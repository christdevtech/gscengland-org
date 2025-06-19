'use client'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'
import { useTheme } from '@/providers/Theme'
import { useHeaderTheme } from '@/providers/HeaderTheme'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  const { theme } = useTheme()
  const { setHeaderTheme } = useHeaderTheme()
  useEffect(() => {
    setHeaderTheme(theme === 'dark' ? 'dark' : 'light')
  }, [setHeaderTheme, theme])
  return (
    <div className="container mt-16">
      <div className="max-w-[48rem]">
        {children || (richText && <RichText data={richText} enableGutter={false} />)}
      </div>
    </div>
  )
}
