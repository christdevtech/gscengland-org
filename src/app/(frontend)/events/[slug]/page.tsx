import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Event } from '@/payload-types'

import { EventHero } from '@/heros/EventHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { EventGallery } from '@/components/EventGallery'
import { RelatedEvents } from '@/components/RelatedEvents'
import { formatHumanDate, formatTimeRange } from '@/utilities/formatDateTime'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, MapPin } from 'lucide-react'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const events = await payload.find({
    collection: 'events',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = events.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Event({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/events/' + slug
  const event = await queryEventBySlug({ slug })

  if (!event) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <EventHero event={event} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          {event.description && (
            <RichText
              className="max-w-none mx-auto"
              data={event.description}
              enableGutter={false}
            />
          )}
          {/* Event Sessions */}
          {event.sessions && event.sessions.length > 0 && (
            <div className="max-w-none mx-auto mt-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Event Sessions</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Discover the detailed schedule and sessions for this event
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {event.sessions.map((session, index) => (
                  <Card
                    key={session.id || index}
                    className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary"
                  >
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors duration-200">
                        {session.sessionName}
                      </CardTitle>
                      <CardDescription className="flex flex-col gap-3 mt-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="font-medium">
                            {formatHumanDate(session.sessionDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="font-medium">
                            {formatTimeRange(session.startTime, session.endTime)}
                          </span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    {session.description && (
                      <CardContent className="pt-0">
                        <div className="prose prose-sm max-w-none dark:prose-invert">
                          <RichText data={session.description} enableGutter={false} />
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Event Gallery */}
          {event.eventGallery && event.eventGallery.length > 0 && (
            <div className="max-w-none mx-auto mt-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Event Gallery</h2>
              <EventGallery images={event.eventGallery} />
            </div>
          )}

          {/* Related Events */}
          {event.relatedEvents && event.relatedEvents.length > 0 && (
            <RelatedEvents
              className="mt-12 max-w-none lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={event.relatedEvents.filter((event) => typeof event === 'object')}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const event = await queryEventBySlug({ slug })

  return generateMeta({ doc: event, collection: 'events' })
}

const queryEventBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'events',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
