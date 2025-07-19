import React from 'react'
import { cn } from '@/utilities/ui'

import type { SpacerBlock } from '@/payload-types'

type Props = SpacerBlock & {
  className?: string
}

export const Spacer: React.FC<Props> = (props) => {
  const { heightMobile = 16, heightTablet = 32, heightDesktop = 48, className } = props

  return (
    <div
      className={cn(
        `h-[${heightMobile}px] md:h-[${heightTablet}px] lg:h-[${heightDesktop}px]`,
        className
      )}
    />
  )
}