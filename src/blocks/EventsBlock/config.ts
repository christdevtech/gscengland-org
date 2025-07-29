import type { Block } from 'payload'

import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const EventsBlock: Block = {
  slug: 'eventsBlock',
  interfaceName: 'EventsBlock',
  fields: [
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
      defaultValue: 'status',
      options: [
        {
          label: 'Event Status',
          value: 'status',
        },
        {
          label: 'Individual Selection',
          value: 'selection',
        },
      ],
    },
    {
      name: 'eventStatus',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData.displayBy === 'status',
      },
      defaultValue: 'upcoming',
      options: [
        {
          label: 'Upcoming & Ongoing Events',
          value: 'upcoming',
        },
        {
          label: 'Past Events',
          value: 'past',
        },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.displayBy === 'status',
        step: 1,
      },
      defaultValue: 6,
      label: 'Limit',
    },
    {
      name: 'selectedEvents',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.displayBy === 'selection',
      },
      hasMany: true,
      label: 'Select Events',
      relationTo: 'events',
    },
    {
      name: 'showVenue',
      type: 'checkbox',
      label: 'Show Venue',
      defaultValue: true,
    },
  ],
  labels: {
    plural: 'Events Blocks',
    singular: 'Events Block',
  },
}
