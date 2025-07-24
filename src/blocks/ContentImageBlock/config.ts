import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const ContentImageBlock: Block = {
  slug: 'contentImageBlock',
  interfaceName: 'ContentImageBlock',
  fields: [
    // Intro Content Section
    {
      name: 'introContent',
      type: 'group',
      label: 'Intro Content (Optional)',
      fields: [
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle',
          defaultValue: "You May Come In As A Stranger But You'll Leave As Family",
        },
        {
          name: 'title',
          type: 'text',
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
      ],
    },
    // Content Rows Section
    {
      name: 'contentRows',
      type: 'array',
      label: 'Content Rows',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
          defaultValue: 'SHARED VALUES',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          defaultValue:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
        },
        linkGroup({
          overrides: {
            label: 'Links',
            admin: {
              description:
                'Links will be displayed under the title and description, aligned to the left',
            },
          },
        }),
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
        {
          name: 'borderRadius',
          type: 'select',
          options: [
            { label: 'None', value: 'rounded-none' },
            { label: 'Small', value: 'rounded-sm' },
            { label: 'Medium', value: 'rounded-md' },
            { label: 'Large', value: 'rounded-lg' },
            { label: 'Extra Large', value: 'rounded-xl' },
            { label: '2XL', value: 'rounded-2xl' },
          ],
          defaultValue: 'rounded-xl',
          required: true,
        },
        {
          name: 'imagePosition',
          type: 'select',
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
          admin: {
            description: 'Choose whether the image appears on the left or right side on desktop',
          },
        },
        {
          name: 'aspectRatio',
          type: 'select',
          defaultValue: 'aspect-[4/3]',
          options: [
            { label: '16:9', value: 'aspect-video' },
            { label: '4:3', value: 'aspect-[4/3]' },
            { label: '3:2', value: 'aspect-[3/2]' },
            { label: '1:1', value: 'aspect-square' },
            { label: '3:4', value: 'aspect-[3/4]' },
          ],
          admin: {
            description: 'Choose the aspect ratio for the image',
          },
          required: true,
        },
      ],
    },
  ],

  labels: {
    plural: 'Content Image Blocks',
    singular: 'Content Image Block',
  },
}
