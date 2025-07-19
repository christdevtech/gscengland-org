import React from 'react'

import type { CallToActionImageBlock as CallToActionImageBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { QuoteIcon } from 'lucide-react'

export const CallToActionImageBlock: React.FC<CallToActionImageBlockProps> = ({
  backgroundImage,
  links,
  richText,
  addQuote,
}) => {
  const image = typeof backgroundImage === 'object' ? backgroundImage : null

  return (
    <div className="relative py-16 px-4 md:px-8 lg:px-16 md:py-20 lg:py-24 xl:py-32">
      {image && (
        <Media resource={image} fill imgClassName="absolute inset-0 object-cover w-full h-full" />
      )}
      <div className="absolute inset-0 bg-black opacity-30"></div> {/* Overlay for readability */}
      <div className="container relative z-10 mx-auto text-center text-foreground">
        <div className="relative max-w-3xl mx-auto bg-background bg-opacity-80 p-8 md:px-12 md:py-16 rounded-lg shadow-lg text-wrap">
          {addQuote && (
            <QuoteIcon className="absolute top-1/3 right-1/4 h-32 w-32 text-blue-600/10" />
          )}
          {richText && <RichText className="mb-6 relative" data={richText} enableGutter={false} />}
          <div className="flex justify-start gap-4 relative">
            {(links || []).map(({ link }, i) => {
              return <CMSLink key={i} size="lg" {...link} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
