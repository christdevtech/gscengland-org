'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post, Event } from '@/payload-types'

import { Media } from '@/components/Media'

export type SearchCardData = {
  slug: string
  categories?: any[]
  meta?: {
    title?: string
    description?: string
    image?: any
  }
  title: string
  contentType: 'posts' | 'events'
}

export const SearchCard: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: SearchCardData
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, contentType } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${contentType}/${slug}`

  // Determine tag color and text based on collection type
  const tagConfig = {
    posts: {
      text: 'Post',
      bgColor: 'bg-blue-500',
      textColor: 'text-white'
    },
    events: {
      text: 'Event',
      bgColor: 'bg-green-500',
      textColor: 'text-white'
    }
  }

  const currentTag = contentType ? tagConfig[contentType] : tagConfig.posts

  return (
    <article
      className={cn(
        'border-border border-b-8 hover:border-b-blue-500 rounded-lg overflow-hidden bg-card transition-all hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative aspect-[5/3] w-full">
        {/* Collection Tag */}
        <div className={cn(
          'absolute top-3 left-3 z-10 px-2 py-1 rounded-md text-xs font-semibold',
          currentTag.bgColor,
          currentTag.textColor
        )}>
          {currentTag.text}
        </div>
        
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media resource={metaImage} imgClassName="object-cover" fill size="33vw" />
        )}
      </div>
      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
}