import type { Block } from 'payload'

export const ServiceBlock: Block = {
  slug: 'serviceBlock',
  interfaceName: 'ServiceBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Our Services',
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Calendar', value: 'Calendar' },
            { label: 'Clock', value: 'Clock' },
            { label: 'Map Pin', value: 'MapPin' },
            { label: 'Video', value: 'Video' },
            { label: 'Sun', value: 'Sun' },
            { label: 'Moon', value: 'Moon' },
            { label: 'Heart', value: 'Heart' },
            { label: 'Megaphone', value: 'Megaphone' },
            { label: 'Users', value: 'Users' },
            { label: 'Star', value: 'Star' },
            { label: 'Home', value: 'Home' },
          ],
          defaultValue: 'Calendar',
        },
        {
          name: 'time',
          type: 'text',
        },
        {
          name: 'location',
          type: 'text',
        },
        {
          name: 'frequency',
          type: 'text',
        },
      ],
      defaultValue: [
        {
          title: 'Sunday Service',
          icon: 'Sun',
          time: '10:30 am',
          location: '16 The Grove, Swanscombe Council Hall, DA10 0AD',
          frequency: 'Every Sunday',
        },
        {
          title: 'Midweek Service',
          icon: 'Video',
          time: '7 pm',
          location: 'via Zoom',
          frequency: 'Every Thursday',
        },
        {
          title: 'Night of Prayer',
          icon: 'Moon',
          time: '11 pm',
          location: 'via Zoom',
          frequency: 'Every Last Friday of the Month',
        },
        {
          title: 'Fasting/Prayer',
          icon: 'Calendar',
          frequency: '1st Day of every Month',
        },
        {
          title: 'Evangelism',
          icon: 'Users',
          time: '11 am',
          frequency: 'Every Saturday',
        },
        {
          title: 'Thanksgiving Service',
          subtitle: 'Communion / Anointing Service',
          icon: 'Heart',
          frequency: 'First Sunday of Every Month',
        },
      ],
    },
  ],
}
