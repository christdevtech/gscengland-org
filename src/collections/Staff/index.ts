import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from '@/fields/slug'

export const Staff: CollectionConfig = {
  slug: 'staff',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'position', 'staffCategory'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'position',
      type: 'text',
      required: true,
    },
    {
      name: 'profilePicture',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'staffCategory',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Leadership',
          value: 'leadership',
        },
        {
          label: 'Pastoral Staff',
          value: 'pastoral',
        },
        {
          label: 'Ministry Leaders',
          value: 'ministry',
        },
        {
          label: 'Administrative Staff',
          value: 'administrative',
        },
        {
          label: 'Support Staff',
          value: 'support',
        },
      ],
    },
    {
      name: 'bio',
      type: 'textarea',
      required: false,
    },
    {
      name: 'email',
      type: 'email',
      required: false,
    },
    {
      name: 'phone',
      type: 'text',
      required: false,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Used to order staff members within their category',
      },
    },
    ...slugField('name'),
  ],
  timestamps: true,
}
