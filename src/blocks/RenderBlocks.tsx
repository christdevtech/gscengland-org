import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CallToActionImageBlock } from '@/blocks/CallToActionImage/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { ContentImageBlock } from '@/blocks/ContentImageBlock/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { IntroBlock } from '@/blocks/IntroBlock/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { StaffBlock } from '@/blocks/StaffBlock/Component'
import { Spacer } from '@/blocks/Spacer/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  contentImageBlock: ContentImageBlock,
  cta: CallToActionBlock,
  ctaImage: CallToActionImageBlock,
  formBlock: FormBlock,
  introBlock: IntroBlock,
  mediaBlock: MediaBlock,
  staffBlock: StaffBlock,
  spacer: Spacer,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
