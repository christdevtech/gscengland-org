import type { Block } from 'payload'

export const IntroBlock: Block = {
  slug: 'introBlock',
  interfaceName: 'IntroBlock',
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
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      defaultValue: "You May Come In As A Stranger But You'll Leave As Family",
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      defaultValue: 'Welcome to our Church',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue:
        "Our aspiration is for Gateway Salvation Church to serve as a secure and inviting space where you can freely pose difficult inquiries and discover a community that stands by you through life's most testing periods. We are committed to reach out to souls, develop and disciple them for the coming King.",
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 3,
      maxRows: 3,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'aspectRatio',
      type: 'select',
      defaultValue: 'aspect-[3/4]',
      options: [
        { label: '16:9', value: 'aspect-video' },
        { label: '4:3', value: 'aspect-[4/3]' },
        { label: '3:2', value: 'aspect-[3/2]' },
        { label: '1:1', value: 'aspect-square' },
        { label: '3:4', value: 'aspect-[3/4]' },
      ],
      admin: {
        description: 'Choose the aspect ratio for all images in the slider',
      },
    },
  ],
  labels: {
    plural: 'Intro Blocks',
    singular: 'Intro Block',
  },
}
