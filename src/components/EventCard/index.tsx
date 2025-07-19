'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { Event } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatDateTime } from '@/utilities/formatDateTime'
import { TimerIcon } from 'lucide-react'

export type CardEventData = Pick<
  Event,
  | 'slug'
  | 'meta'
  | 'title'
  | 'image'
  | 'isVirtual'
  | 'venue'
  | 'isMultiDay'
  | 'startDate'
  | 'endDate'
  | 'date'
  | 'publishedAt'
>

export const EventCard: React.FC<{
  alignItems?: 'center'
  className?: string
  event?: CardEventData
  showVenue?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, event, showVenue = true, title: titleFromProps } = props

  const { slug, meta, title, image, isVirtual, venue, isMultiDay, startDate, endDate, date } =
    event || {}
  const { description, image: metaImage } = meta || {}

  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/events/${slug}`

  // Determine the display image
  const displayImage = image || metaImage

  // Format event date(s)
  const formatEventDate = () => {
    if (isMultiDay && startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)

      // If same month and year, show abbreviated format
      if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
        return `${start.getDate()}-${end.getDate()} ${start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
      }

      return `${formatDateTime(startDate)} - ${formatDateTime(endDate)}`
    }

    if (date) {
      const eventDate = new Date(date)
      return eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    }

    return 'Date TBD'
  }

  // Determine event status (upcoming, ongoing, past)
  const getEventStatus = () => {
    const now = new Date()

    if (isMultiDay && startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)

      if (now < start) {
        return { status: 'upcoming', label: 'Upcoming', className: 'bg-orange-100 text-orange-800' }
      } else if (now >= start && now <= end) {
        return { status: 'ongoing', label: 'Ongoing', className: 'bg-red-100 text-red-800' }
      } else {
        return { status: 'past', label: 'Past', className: 'bg-gray-100 text-gray-800' }
      }
    }

    if (date) {
      const eventDate = new Date(date)
      // For single day events, consider it ongoing if it's the same day
      const eventDateOnly = new Date(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate(),
      )
      const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate())

      if (eventDateOnly > nowDateOnly) {
        return { status: 'upcoming', label: 'Upcoming', className: 'bg-orange-100 text-orange-800' }
      } else if (eventDateOnly.getTime() === nowDateOnly.getTime()) {
        return { status: 'ongoing', label: 'Today', className: 'bg-red-100 text-red-800' }
      } else {
        return { status: 'past', label: 'Past', className: 'bg-gray-100 text-gray-800' }
      }
    }

    // If no date is available, assume upcoming
    return { status: 'upcoming', label: 'TBD', className: 'bg-yellow-100 text-yellow-800' }
  }

  const eventStatus = getEventStatus()

  return (
    <article
      className={cn(
        'border-border border-b-8 hover:border-b-blue-500 rounded-lg overflow-hidden bg-card transition-all hover:cursor-pointer group',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative aspect-[5/3] w-full overflow-hidden">
        {!displayImage && (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            No image
          </div>
        )}
        {displayImage && typeof displayImage !== 'string' && (
          <Media
            resource={displayImage}
            imgClassName="object-cover group-hover:scale-105 transition-transform duration-300"
            fill
            size="33vw"
          />
        )}

        {/* Event Type Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={cn(
              'px-2 py-1 text-xs font-medium rounded-full',
              isVirtual ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800',
            )}
          >
            {isVirtual ? 'Virtual' : 'In-Person'}
          </span>
        </div>

        {/* Event Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={cn('px-2 py-1 text-xs font-medium rounded-full', eventStatus.className)}>
            {eventStatus.label}
          </span>
        </div>

        {/* Multi-day Badge */}
        {isMultiDay && (
          <div className="absolute top-12 right-3">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
              Multi-Day
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Event Date */}
        <div className="text-sm font-medium text-blue-600 mb-2 flex items-center gap-2">
          <TimerIcon /> {formatEventDate()}
        </div>

        {/* Event Title */}
        {titleToUse && (
          <div className="prose">
            <h3 className="mb-2">
              <Link
                className="not-prose hover:text-blue-600 transition-colors"
                href={href}
                ref={link.ref}
              >
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}

        {/* Event Description */}
        {description && (
          <div className="mt-2 text-sm text-gray-600 line-clamp-2">
            <p>{sanitizedDescription}</p>
          </div>
        )}

        {/* Venue Information */}
        {showVenue && !isVirtual && venue && (
          <div className="mt-3 flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="truncate">{venue}</span>
          </div>
        )}

        {/* Virtual Event Indicator */}
        {isVirtual && (
          <div className="mt-3 flex items-center text-sm text-blue-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>Online Event</span>
          </div>
        )}
      </div>
    </article>
  )
}
