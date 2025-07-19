import type { Block } from 'payload'

export const SpacerBlock: Block = {
  slug: 'spacer',
  interfaceName: 'SpacerBlock',
  fields: [
    {
      name: 'heightMobile',
      type: 'number',
      label: 'Mobile Height (px)',
      defaultValue: 16,
    },
    {
      name: 'heightTablet',
      type: 'number',
      label: 'Tablet Height (px)',
      defaultValue: 32,
    },
    {
      name: 'heightDesktop',
      type: 'number',
      label: 'Desktop Height (px)',
      defaultValue: 48,
    },
  ],
}