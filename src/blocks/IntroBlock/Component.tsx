'use client'

import React from 'react'

import type { IntroBlock as IntroBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

type Props = {
  disableInnerContainer?: boolean
} & IntroBlockProps

export const IntroBlock: React.FC<Props> = ({
  subtitle,
  title,
  description,
  images,
  aspectRatio = 'aspect-[4/3]',
  anchor,
}) => {
  if (!images || images.length === 0) {
    return null
  }

  return (
    <div id={anchor || undefined} className={'container mx-auto px-4 py-16'}>
      {/* Header Section */}
      <div className="text-center mb-12 md:max-w-xl lg:max-w-5xl mx-auto">
        {subtitle && (
          <p className="text-base font-medium text-primary uppercase tracking-wider mb-4">
            {subtitle}
          </p>
        )}
        {title && (
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground mb-6 uppercase">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
        )}
      </div>

      <div className="relative flex flex-wrap items-center">
        {images.map((item, index) => {
          if (!item) return null
          return (
            <div
              key={index}
              className={cn(
                'relative py-2 md:px-2 lg:px-4',
                aspectRatio,
                index % 3 === 0 && 'basis-full md:basis-[30%]',
                index % 3 === 1 && 'basis-full md:basis-[40%]',
                index % 3 === 2 && 'basis-full md:basis-[30%]',
              )}
            >
              <div
                className={cn(
                  'relative w-full',
                  aspectRatio,
                  'rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-500',
                )}
              >
                <Media resource={item.image} fill imgClassName="object-cover" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
