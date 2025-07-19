import type { Metadata } from 'next'

import type { Media, Page, Post, Event, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  events: '/events',
  posts: '/posts',
  pages: '',
}

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url
    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | Partial<Event> | null
  collection: keyof typeof collectionPrefixMap
}): Promise<Metadata> => {
  const { doc, collection } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const metaTitle = doc?.meta?.title || doc?.title || 'Gateway Salvation Church'
  const title =
    metaTitle + (metaTitle !== 'Gateway Salvation Church' ? ' | Gateway Salvation Church' : '')

  const path = `${collectionPrefixMap[collection]}/${doc?.slug}`

  const url = getServerSideURL() + path

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url,
    }),
    title,
  }
}
