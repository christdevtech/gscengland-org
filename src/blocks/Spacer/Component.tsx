import React from 'react'
import { cn } from '@/utilities/ui'

import type { SpacerBlock } from '@/payload-types'

type Props = SpacerBlock & {
  className?: string
}

export const Spacer: React.FC<Props> = (props) => {
  const { heightMobile = 16, heightTablet = 32, heightDesktop = 48, className, anchor } = props

  const spacerClass = `spacer-${heightMobile}-${heightTablet}-${heightDesktop}`

  return (
    <div
      id={anchor || undefined}
      className={cn('w-full', spacerClass, className)}
      style={{
        '--height-mobile': `${heightMobile}px`,
        '--height-tablet': `${heightTablet}px`,
        '--height-desktop': `${heightDesktop}px`,
        height: `var(--height-mobile)`,
      } as React.CSSProperties & {
        '--height-mobile': string
        '--height-tablet': string
        '--height-desktop': string
      }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (min-width: 768px) {
            .${spacerClass} {
              height: var(--height-tablet) !important;
            }
          }
          @media (min-width: 1024px) {
            .${spacerClass} {
              height: var(--height-desktop) !important;
            }
          }
        `
      }} />
    </div>
  )
}