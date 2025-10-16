import type { Block } from 'payload'

import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const StaffBlock: Block = {
  slug: 'staffBlock',
  interfaceName: 'StaffBlock',
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
      name: 'introContent',
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
      label: 'Intro Content',
    },
    {
      name: 'displayBy',
      type: 'select',
      defaultValue: 'category',
      options: [
        {
          label: 'By Category',
          value: 'category',
        },
        {
          label: 'Individual Selection',
          value: 'selection',
        },
        {
          label: 'All Staff',
          value: 'all',
        },
      ],
    },
    {
      name: 'staffCategories',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData.displayBy === 'category',
      },
      hasMany: true,
      label: 'Staff Categories To Show',
      options: [
        {
          label: 'Board of Trustees',
          value: 'trustees',
        },
        {
          label: 'Pastoral Staff',
          value: 'pastoral',
        },
        {
          label: 'Ministers',
          value: 'ministers',
        },
        {
          label: 'Head of Departments',
          value: 'departments',
        },
      ],
    },
    {
      name: 'selectedStaff',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.displayBy === 'selection',
      },
      hasMany: true,
      label: 'Select Staff Members',
      relationTo: 'staff',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        {
          label: 'Grid Layout',
          value: 'grid',
        },
        {
          label: 'List Layout',
          value: 'list',
        },
      ],
    },
    {
      name: 'showBio',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Bio',
    },
    {
      name: 'showContact',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show Contact Information',
    },
  ],
  labels: {
    plural: 'Staff Blocks',
    singular: 'Staff Block',
  },
}
