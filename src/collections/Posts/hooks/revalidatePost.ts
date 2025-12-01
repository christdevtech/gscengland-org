import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/posts/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidateTag('posts-sitemap')
      revalidatePath('/posts')
      ;(async () => {
        const res = await payload.find({
          collection: 'posts',
          limit: 12,
          pagination: true,
          // select: { id: true },
        })
        for (let i = 1; i <= (res.totalPages || 1); i++) {
          revalidatePath(`/posts/page/${i}`)
        }
      })()
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/posts/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('posts-sitemap')
      revalidatePath('/posts')
      ;(async () => {
        const res = await payload.find({
          collection: 'posts',
          limit: 12,
          pagination: true,
          // select: { id: true },
        })
        for (let i = 1; i <= (res.totalPages || 1); i++) {
          revalidatePath(`/posts/page/${i}`)
        }
      })()
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/posts/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('posts-sitemap')
  }

  return doc
}
