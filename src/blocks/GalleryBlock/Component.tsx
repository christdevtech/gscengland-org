'use client'

import React from 'react'
import type { GalleryBlock as GalleryBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { EventGallery as GalleryComponent } from '@/components/EventGallery'

type Props = {
  className?: string
} & GalleryBlockProps

export const GalleryBlock: React.FC<Props> = ({ anchor, images, title, className }) => {
  return (
    <div id={anchor || undefined} className={cn('py-16 container', className)}>
      {title && <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">{title}</h2>}
      {images && images.length > 0 && <GalleryComponent images={images} />}
    </div>
  )
}
