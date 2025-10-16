import type { Block } from 'payload'

export const ContactBlock: Block = {
  slug: 'contactBlock',
  interfaceName: 'ContactBlock',
  labels: {
    plural: 'Contact Sections',
    singular: 'Contact Section',
  },
  fields: [
    {
      name: 'address',
      type: 'textarea',
      label: 'Address',
      required: true,
      defaultValue: '16, The Grove, Swanscombe Council Hall, DA10 0AD',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
      required: true,
      defaultValue: '+44 (0) 1322632375',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      defaultValue: 'admin@gscengland.org',
    },
  ],
}