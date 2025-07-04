import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'border-radius',
      type: 'select',
      defaultValue: 'rounded-none',
      options: [
        { label: 'None', value: 'rounded-none' },
        { label: 'Small', value: 'rounded-lg' },
        { label: 'Medium', value: 'rounded-xl' },
        { label: 'Large', value: 'rounded-2xl' },
      ],
    },
  ],
}
