import React from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

import type { ContentImageBlock as ContentImageBlockProps } from '@/payload-types'

type Props = ContentImageBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const ContentImageBlock: React.FC<Props> = (props) => {
  const { introContent, contentRows, className } = props

  // Create responsive aspect ratio classes that Tailwind can recognize
  const getResponsiveAspectRatio = (ratio: string) => {
    if (!ratio) ratio = 'aspect-video'
    const baseClass = ratio
    const mdClass = 'md:aspect-square'

    // Map aspect ratios to their lg equivalents
    const lgClassMap: Record<string, string> = {
      'aspect-video': 'lg:aspect-video',
      'aspect-[4/3]': 'lg:aspect-[4/3]',
      'aspect-[3/2]': 'lg:aspect-[3/2]',
      'aspect-square': 'lg:aspect-square',
      'aspect-[3/4]': 'lg:aspect-[3/4]',
    }

    const lgClass = lgClassMap[ratio] || 'lg:aspect-[4/3]'

    return `${baseClass} ${mdClass} ${lgClass}`
  }

  return (
    <div className={cn('py-16 lg:py-24', className)}>
      <div className={cn('container')}>
        {/* Intro Content Section */}
        {introContent &&
          (introContent.title || introContent.subtitle || introContent.description) && (
            <div className="text-center mb-16 lg:mb-24">
              {introContent.subtitle && (
                <p className="text-sm md:text-base text-muted-foreground mb-4 uppercase tracking-wider">
                  {introContent.subtitle}
                </p>
              )}
              {introContent.title && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground mb-6 uppercase">
                  {introContent.title}
                </h2>
              )}
              {introContent.description && (
                <p className="text-muted-foreground leading-relaxed text-base lg:text-lg max-w-3xl mx-auto">
                  {introContent.description}
                </p>
              )}
            </div>
          )}

        {/* Content Rows */}
        {contentRows && contentRows.length > 0 && (
          <div className="space-y-16 lg:space-y-24">
            {contentRows.map((row, index) => {
              const {
                title,
                description,
                links,
                image,
                imagePosition = 'left',
                aspectRatio = 'aspect-[4/3]',
                borderRadius,
              } = row

              return (
                <div
                  key={index}
                  className={cn('flex flex-col md:flex-row items-center gap-8 lg:gap-16', {
                    'md:flex-row-reverse': imagePosition === 'right',
                  })}
                >
                  {/* Image Section - Always on top on mobile, positioned based on imagePosition on md+ */}
                  <div className="w-full md:basis-1/2 flex-shrink-0">
                    <div
                      className={cn(
                        'w-full overflow-hidden',
                        borderRadius,
                        getResponsiveAspectRatio(aspectRatio),
                      )}
                    >
                      {typeof image === 'object' && image !== null && (
                        <Media
                          resource={image}
                          className="w-full h-full object-cover"
                          imgClassName="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="w-full">
                    <div className="prose max-w-none">
                      {title && (
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 uppercase tracking-wide">
                          {title}
                        </h3>
                      )}
                      {description && (
                        <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
                          {description}
                        </p>
                      )}

                      {/* Links Section - Aligned to the left */}
                      {links && links.length > 0 && (
                        <div className="flex flex-wrap gap-3 justify-start">
                          {links.map((link, linkIndex) => (
                            <CMSLink
                              key={linkIndex}
                              {...link.link}
                              size={link.size || 'default'}
                              className="not-prose"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
