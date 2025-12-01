import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Event } from '@/payload-types'

export const revalidateEvent: CollectionAfterChangeHook<Event> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/events/${doc.slug}`

      payload.logger.info(`Revalidating event at path: ${path}`)

      revalidatePath(path)
      revalidateTag('events-sitemap')
      revalidatePath('/events')
      ;(async () => {
        const res = await payload.find({
          collection: 'events',
          limit: 12,
          pagination: true,
          where: { _status: { equals: 'published' } },
          // select: { id: true },
        })
        for (let i = 1; i <= (res.totalPages || 1); i++) {
          revalidatePath(`/events/page/${i}`)
        }
      })()
    }

    // If the event was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/events/${previousDoc.slug}`

      payload.logger.info(`Revalidating old event at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('events-sitemap')
      revalidatePath('/events')
      ;(async () => {
        const res = await payload.find({
          collection: 'events',
          limit: 12,
          pagination: true,
          where: { _status: { equals: 'published' } },
          // select: { id: true },
        })
        for (let i = 1; i <= (res.totalPages || 1); i++) {
          revalidatePath(`/events/page/${i}`)
        }
      })()
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Event> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/events/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('events-sitemap')
  }

  return doc
}
