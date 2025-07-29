import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const AccordionBlock: Block = {
  slug: 'accordionBlock',
  interfaceName: 'AccordionBlock',
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
          defaultValue: 'Frequently Asked Questions',
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Description',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
                AlignFeature(),
              ]
            },
          }),
          defaultValue: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: "Our aspiration is for Gateway Salvation Church to serve as a secure and inviting space where you can freely pose difficult inquiries and discover a community that stands by you through life's most testing periods. We are committed to reach out to souls, develop and disciple them for the coming King.",
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
        },
      ],
    },
    // Accordion Items Section
    {
      name: 'accordionItems',
      type: 'array',
      label: 'Accordion Items',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Accordion Title',
          defaultValue: 'What time are our services?',
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Accordion Content',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, InlineToolbarFeature(), AlignFeature()]
            },
          }),
          required: true,
          defaultValue: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Our Sunday services are held at 10:00 AM and 6:00 PM. We also have midweek services on Wednesday at 7:00 PM. All are welcome to join us for worship, fellowship, and spiritual growth.',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
        },
      ],
    },
  ],

  labels: {
    plural: 'Accordion Blocks',
    singular: 'Accordion Block',
  },
}
