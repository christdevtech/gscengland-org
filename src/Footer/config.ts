import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'footerMotto',
      type: 'text',
      defaultValue:
        'Gateway Salvation Church - A place where faith, hope, and love come together. Join our community in worship, fellowship, and service.',
    },

    {
      name: 'footerMenus',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/Footer/RowLabel#RowLabel',
            },
          },
          maxRows: 6,
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#MenuLabel',
        },
      },
      maxRows: 3,
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'instagram',
          type: 'text',
          defaultValue:
            'https://www.instagram.com/gatewaysalvationchurch?utm_source=ig_web_button_share_sheet&igsh=MW95ZG8wbjZ3aGZjYQ==',
        },
        {
          name: 'youtube',
          type: 'text',
          defaultValue: 'https://www.youtube.com/channel/UCMICN79DIkhfusOBDPDCscw',
        },
        {
          name: 'website',
          type: 'text',
          defaultValue: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
        },
        {
          name: 'facebook',
          type: 'text',
          defaultValue: 'https://www.facebook.com/gatewaysalvationchurch',
        },
      ],
    },
    {
      name: 'registration',
      type: 'text',
      defaultValue:
        'Gateway Salvation Church is a charity registered in England & Wales no. 1203676',
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
