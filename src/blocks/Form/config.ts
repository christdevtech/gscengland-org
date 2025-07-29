import type { Block } from 'payload'

import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'isContactPageForm',
      type: 'checkbox',
      defaultValue: false,
      label: 'Is Contact Page Form',
    },

    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
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
      label: 'Intro Content',
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Contact Information',
      admin: {
        condition: (_, { isContactPageForm }) => Boolean(isContactPageForm),
      },
      fields: [
        {
          name: 'address',
          type: 'textarea',
          label: 'Address',
          defaultValue: '16, The Grove,\nSwanscombe Council Hall,\nDA10 0AD',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          defaultValue: '+44 (0) 1322632375',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email Address',
          defaultValue: 'admin@gscengland.org',
        },
      ],
    },
    {
      name: 'bgColor',
      type: 'select',
      options: [
        {
          label: 'White',
          value: 'bg-white',
        },
        {
          label: 'Card',
          value: 'bg-card',
        },
        {
          label: 'Primary',
          value: 'bg-primary text-primary-foreground',
        },
        {
          label: 'Accent',
          value: 'bg-accent text-accent-foreground',
        },
        {
          label: 'Brand Blue',
          value: 'bg-brand-blue text-brand-blue-foreground',
        },
      ],
      defaultValue: 'bg-accent text-accent-foreground',
    },
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    plural: 'Form Blocks',
    singular: 'Form Block',
  },
}
