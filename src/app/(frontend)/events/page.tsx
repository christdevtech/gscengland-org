import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { EventCard } from '@/components/EventCard'
import type { Event } from '@/payload-types'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const events = await payload.find({
    collection: 'events',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      image: true,
      meta: true,
      isVirtual: true,
      venue: true,
      isMultiDay: true,
      startDate: true,
      endDate: true,
      date: true,
      publishedAt: true,
    },
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: ['-date', '-startDate'],
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Events</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="events"
          currentPage={events.page}
          limit={12}
          totalDocs={events.totalDocs}
        />
      </div>

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.docs.map((event) => (
            <EventCard key={event.id} event={event as Event} />
          ))}
        </div>
      </div>

      <div className="container">
        {events.totalPages > 1 && events.page && (
          <Pagination page={events.page} totalPages={events.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Gateway Salvation Church Events`,
  }
}
