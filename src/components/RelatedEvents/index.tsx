import React from 'react'

import type { Event } from '@/payload-types'

import { EventCard } from '@/components/EventCard'

export type RelatedEventsProps = {
  className?: string
  docs?: Event[]
  introText?: string
}

export const RelatedEvents: React.FC<RelatedEventsProps> = (props) => {
  const { className, docs, introText } = props

  const hasEvents = docs && Array.isArray(docs) && docs.length > 0

  if (!hasEvents) {
    return null
  }

  return (
    <div className={className}>
      <div className="prose dark:prose-invert max-w-none">
        <h2>Related Events</h2>
        {introText && <p className="text-lg">{introText}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {docs.map((event, index) => {
          if (typeof event === 'string') return null

          return <EventCard key={event.id || index} event={event} showVenue={true} />
        })}
      </div>
    </div>
  )
}
