'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white overflow-clip"
      data-theme="dark"
    >
      <div className="container pb-8 z-10 flex items-end justify-center absolute top-[10.4rem] bottom-0">
        <div className="max-w-[56.5rem] md:text-center">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[90vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover object-top" priority resource={media} />
        )}
      </div>
      <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-black via-black/70 to-black/0 to-100%"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black/0 via-black/80 to-black"></div>
    </div>
  )
}
