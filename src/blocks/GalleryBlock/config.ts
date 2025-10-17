import type { Block } from 'payload'

export const GalleryBlock: Block = {
  slug: 'galleryBlock',
  interfaceName: 'GalleryBlock',
  labels: {
    singular: 'Gallery Block',
    plural: 'Gallery Blocks',
  },
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
      name: 'title',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional Gallery Title',
      },
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Select from existing media or upload new images.',
      },
      hasMany: true,
    },
  ],
}
