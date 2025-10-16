import type { Block } from 'payload'

import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const CallToActionImage: Block = {
  slug: 'ctaImage',
  interfaceName: 'CallToActionImageBlock',
  fields: [
    {
      name: 'anchor',
      type: 'text',
      label: 'Anchor ID',
      admin: {
        description:
          'Optional: Used for in-page anchor navigation. Letters, numbers, hyphens only.',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            AlignFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'addQuote',
      label: 'Add Quote Mark?',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
  labels: {
    plural: 'Calls to Action with Image',
    singular: 'Call to Action with Image',
  },
}
