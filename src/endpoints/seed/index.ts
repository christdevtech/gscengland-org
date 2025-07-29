import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'
import { Event, Staff } from '@/payload-types'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
]
const globals: GlobalSlug[] = ['header', 'footer']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {},
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding demo author and user...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'demo-author@example.com',
      },
    },
  })

  payload.logger.info(`— Seeding media...`)

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
    ),
  ])

  const [demoAuthor, image1Doc, image2Doc, image3Doc, imageHomeDoc] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        name: 'Demo Author',
        email: 'demo-author@example.com',
        password: 'password',
      },
    }),
    payload.create({
      collection: 'media',
      data: image1,
      file: image1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image3Buffer,
    }),
    payload.create({
      collection: 'media',
      data: imageHero1,
      file: hero1Buffer,
    }),

    payload.create({
      collection: 'categories',
      data: {
        title: 'Technology',
        breadcrumbs: [
          {
            label: 'Technology',
            url: '/technology',
          },
        ],
      },
    }),

    payload.create({
      collection: 'categories',
      data: {
        title: 'News',
        breadcrumbs: [
          {
            label: 'News',
            url: '/news',
          },
        ],
      },
    }),

    payload.create({
      collection: 'categories',
      data: {
        title: 'Finance',
        breadcrumbs: [
          {
            label: 'Finance',
            url: '/finance',
          },
        ],
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Design',
        breadcrumbs: [
          {
            label: 'Design',
            url: '/design',
          },
        ],
      },
    }),

    payload.create({
      collection: 'categories',
      data: {
        title: 'Software',
        breadcrumbs: [
          {
            label: 'Software',
            url: '/software',
          },
        ],
      },
    }),

    payload.create({
      collection: 'categories',
      data: {
        title: 'Engineering',
        breadcrumbs: [
          {
            label: 'Engineering',
            url: '/engineering',
          },
        ],
      },
    }),
  ])

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post1({ heroImage: image1Doc, blockImage: image2Doc, author: demoAuthor }),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post2({ heroImage: image2Doc, blockImage: image3Doc, author: demoAuthor }),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post3({ heroImage: image3Doc, blockImage: image1Doc, author: demoAuthor }),
  })

  // update each post with related posts
  await payload.update({
    id: post1Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post2Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post3Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post2Doc.id],
    },
  })

  payload.logger.info(`— Seeding staff...`)

  const images = [image1Doc.id, image2Doc.id, image3Doc.id, imageHomeDoc.id]

  const staffData: Omit<Staff, 'createdAt' | 'id' | 'sizes' | 'updatedAt'>[] = [
    {
      name: 'Pastor Ola Olaiya',
      position: 'Senior Pastor',
      staffCategory: ['pastoral'],
      bio: 'Pastor Ola grew up in Nigeria and accepted the life of Christ in the year 2000. He has been in the ministry since then. Ola loves to pray and engage in different types of evangelism. His passion is to see Jesus being preached to every man. Ola is a trained Architect and UK/EU Customs Compliance Professional.',
      email: 'ola@gscengland.org',
      phone: '+44 1322632375',
      order: 1,
      profilePicture: images[0],
    },
    {
      name: 'Pastor Grace Olaiya',
      position: 'Associate Pastor',
      staffCategory: ['pastoral', 'trustees'],
      bio: 'Grace loves to study the word of God and enjoys sharing her passion about the bible! She loves praying and listening to spiritual sermons. Grace is a trained Geographer and an Analytics Consultant by profession.',
      email: 'grace@gscengland.org',
      phone: '+44 1322632375',
      order: 2,
      profilePicture: images[1],
    },
    {
      name: 'Dora Affam',
      position: 'Trustee',
      staffCategory: ['trustees'],
      bio: 'Dora is a dedicated trustee at Gateway Salvation Church.',
      email: 'dora@gscengland.org',
      phone: '+44 1234567890',
      order: 3,
      profilePicture: images[2],
    },
    {
      name: 'Centina Sylvester',
      position: 'Trustee',
      staffCategory: ['trustees'],
      bio: 'Centina serves as a trustee and supports church administration.',
      email: 'centina@gscengland.org',
      phone: '+44 9876543210',
      order: 4,
      profilePicture: images[3],
    },
    {
      name: 'John Doe',
      position: 'Youth Minister',
      staffCategory: ['ministers'],
      bio: 'John leads the youth ministry with passion for young people in London.',
      email: 'john@gscengland.org',
      phone: '+44 1122334455',
      order: 5,
      profilePicture: images[0],
    },
    {
      name: 'Jane Smith',
      position: 'Administrative Assistant',
      staffCategory: ['departments'],
      bio: 'Jane handles administrative tasks and supports church operations in Kent.',
      email: 'jane@gscengland.org',
      phone: '+44 5566778899',
      order: 6,
      profilePicture: images[1],
    },
  ]

  const staffDocs = await Promise.all(
    staffData.map((data) => payload.create({ collection: 'staff', data })),
  )

  payload.logger.info(`— Seeding events...`)

  const eventsData: Omit<Event, 'createdAt' | 'id' | 'sizes' | 'updatedAt'>[] = [
    // Upcoming
    {
      title: '2025 Year of Possibilities',
      isMultiDay: false,
      date: '2025-02-28',
      startDate: '2025-02-28T07:20:00',
      endDate: '2025-02-28T21:50:00',
      venue: '16, The Grove, Swanscombe',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: "2025 has been declared as our year of possibilities. We claim possibilities in every area in Jesus' name.",
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
      image: images[0],
      meta: {
        title: '2025 Year of Possibilities',
        description:
          "2025 has been declared as our year of possibilities. We claim possibilities in every area in Jesus' name.",
        image: images[0],
      },
      _status: 'published',
    },
    {
      title: 'Breakfast with Jesus 2024',
      isMultiDay: false,
      date: '2024-12-23',
      venue: 'Church Hall at 16 The Grove, Swanscombe',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Jesus Christ is the reason behind our celebration. He came to the earth and was born through a divine method.',
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
      image: images[1],
      meta: {
        title: 'Breakfast with Jesus 2024',
        description:
          'Jesus Christ is the reason behind our celebration. He came to the earth and was born through a divine method.',
        image: images[1],
      },
      _status: 'published',
    },
    {
      title: 'Seed Planting Outreach',
      isMultiDay: false,
      date: '2025-03-15',
      venue: 'Swanscombe Community',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'God gave us the direction to reach out and bless our community. We uproot and plant again.',
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
      image: images[2],
      meta: {
        description:
          'God gave us the direction to reach out and bless our community. We uproot and plant again.',
        title: 'Seed Planting Outreach',
        image: images[2],
      },
      _status: 'published',
    },
    // Past
    {
      title: 'A Praying Mother - John 14:14',
      isMultiDay: false,
      date: '2024-03-10',
      startDate: '2024-03-10T10:30:00',
      endDate: '2024-03-10T13:00:00',
      venue: '16, The Grove, Swanscombe DA10 0AD',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Mothers Day 2024. This year we shall be looking at \"A Praying Mother\".',
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
      image: images[3],
      meta: {
        title: 'A Praying Mother - John 14:14',
        description: 'Mothers Day 2024. This year we shall be looking at \"A Praying Mother\".',
        image: images[3],
      },
      _status: 'published',
    },
    {
      title: 'Christmas Carol Service 2023',
      isMultiDay: false,
      date: '2023-12-24',
      venue: 'Church Hall',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Annual Christmas carol service with songs and readings.',
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
      image: images[0],
      meta: {
        title: 'Christmas Carol Service 2023',
        description: 'Annual Christmas carol service with songs and readings.',
        image: images[0],
      },
      _status: 'published',
    },
    {
      title: 'Easter Outreach 2024',
      isMultiDay: false,
      date: '2024-03-31',
      venue: 'Swanscombe Park',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Community outreach event for Easter celebrations.',
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
      image: images[1],
      meta: {
        title: 'Easter Outreach 2024',
        description: 'Community outreach event for Easter celebrations.',
        image: images[1],
      },
      _status: 'published',
    },
    // One more upcoming to make 3
    {
      title: 'The Month of April 2025: Our Month of Growth',
      isMultiDay: true,
      startDate: '2025-08-26',
      endDate: '2025-08-28',
      venue: 'Church Hall',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Our month of growth! Growth in every area of our lives in Christ Jesus!',
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
      image: images[2],
      meta: {
        title: 'The Month of April 2025: Our Month of Growth',
        description: 'Our month of growth! Growth in every area of our lives in Christ Jesus!',
        image: images[2],
      },
      _status: 'published',
    },
  ]

  const eventDocs = await Promise.all(
    eventsData.map((data) => payload.create({ collection: 'events', data })),
  )

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  payload.logger.info(`— Seeding pages...`)

  const [_, contactPage] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      data: home({ heroImage: imageHomeDoc, metaImage: image2Doc }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: contactPageData({ contactForm: contactForm }),
    }),
  ])

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Posts',
              url: '/posts',
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Contact',
              reference: {
                relationTo: 'pages',
                value: contactPage.id,
              },
            },
          },
        ],
        buttons: [
          {
            link: {
              type: 'custom',
              label: 'Give now',
              url: '/give',
              icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gift-icon lucide-gift"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>',
            },
          },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        footerMotto:
          'At GSC, we have a mandate from God to evangelize, bring men, and equip them with word of God, by the power of the Holy Spirit.',
        footerMenus: [
          {
            title: 'Quick Links',
            items: [
              {
                link: {
                  type: 'custom',
                  label: 'Website Admin',
                  url: '/admin',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Donate now',
                  newTab: true,
                  url: '/donate',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Events',
                  newTab: true,
                  url: '/events',
                },
              },
            ],
          },
          {
            title: 'Quick Links',
            items: [
              {
                link: {
                  type: 'custom',
                  label: 'Website Admin',
                  url: '/admin',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Donate now',
                  newTab: true,
                  url: '/donate',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Events',
                  newTab: true,
                  url: '/events',
                },
              },
            ],
          },
        ],
      },
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
