import type { Event, EventsBlock as EventsBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { EventCard, CardEventData } from '@/components/EventCard'

export const EventsBlock: React.FC<
  EventsBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    anchor,
    introContent,
    limit: limitFromProps,
    displayBy,
    eventStatus,
    selectedEvents,
    showVenue,
  } = props

  const limit = limitFromProps || 6

  let events: CardEventData[] = []

  if (displayBy === 'status') {
    const payload = await getPayload({ config: configPromise })

    const now = new Date()
    let whereCondition = {}

    if (eventStatus === 'upcoming') {
      // For upcoming events, we need to check:
      // 1. Single-day events with date in the future
      // 2. Multi-day events with endDate in the future
      whereCondition = {
        or: [
          // Upcoming single-day events
          {
            and: [{ isMultiDay: { equals: false } }, { date: { greater_than: now.toISOString() } }],
          },
          // Ongoing multi-day events
          {
            and: [
              { isMultiDay: { equals: true } },
              { endDate: { greater_than: now.toISOString() } },
            ],
          },
        ],
      }
    } else if (eventStatus === 'past') {
      // For past events, we need to check:
      // 1. Single-day events with date in the past
      // 2. Multi-day events with endDate in the past
      whereCondition = {
        or: [
          // Past single-day events
          {
            and: [{ isMultiDay: { equals: false } }, { date: { less_than: now.toISOString() } }],
          },
          // Past multi-day events
          {
            and: [{ isMultiDay: { equals: true } }, { endDate: { less_than: now.toISOString() } }],
          },
        ],
      }
    }

    const fetchedEvents = await payload.find({
      collection: 'events',
      depth: 1,
      limit,
      sort: eventStatus === 'upcoming' ? 'date' : '-date', // Sort by date ascending for upcoming, descending for past
      where: whereCondition,
    })

    events = fetchedEvents.docs as CardEventData[]
  } else if (displayBy === 'selection' && selectedEvents?.length) {
    const filteredSelectedEvents = selectedEvents
      .map((event) => {
        if (typeof event === 'object') return event
        return null
      })
      .filter(Boolean) as CardEventData[]

    events = filteredSelectedEvents
  }

  return (
    <div className="py-16" id={anchor || (id ? `block-${id}` : undefined)}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <EventCard key={index} event={event} showVenue={showVenue ? showVenue : false} />
          ))}
        </div>
        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No events found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
