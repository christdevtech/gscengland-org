'use client'

import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Event } from '@/payload-types'

import { Media } from '@/components/Media'
import { AddToCalendar } from '@/components/AddToCalendar'
import { MapPinIcon, TimerIcon } from 'lucide-react'

export const EventHero: React.FC<{
  event: Event
}> = ({ event }) => {
  const { image, title, isVirtual, venue, isMultiDay, startDate, endDate, date, publishedAt } =
    event

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

  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-1 md:col-span-2">
          {/* Event Type and Multi-day Badges */}
          <div className="flex gap-3 mb-6">
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                isVirtual
                  ? 'bg-blue-500/20 text-blue-200 border border-blue-400/30'
                  : 'bg-green-500/20 text-green-200 border border-green-400/30'
              }`}
            >
              {isVirtual ? 'Virtual Event' : 'In-Person Event'}
            </span>
            {isMultiDay && (
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30">
                Multi-Day Event
              </span>
            )}
          </div>

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl font-bold">{title}</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            {/* Event Date */}
            <div className="flex flex-col gap-1">
              <p className="text-sm uppercase tracking-wide opacity-80 flex items-center gap-2">
                <TimerIcon /> Event Date and Time
              </p>
              <p className="text-lg font-medium">{formatEventDate()}</p>
            </div>

            {/* Venue Information */}
            {!isVirtual && venue && (
              <div className="flex flex-col gap-1">
                <p className="text-sm uppercase tracking-wide opacity-80 flex items-center gap-2">
                  <MapPinIcon /> Venue
                </p>
                <p className="text-lg font-medium">{venue}</p>
              </div>
            )}

            {/* Virtual Event Info */}
            {isVirtual && (
              <div className="flex flex-col gap-1">
                <p className="text-sm uppercase tracking-wide opacity-80">Location</p>
                <p className="text-lg font-medium flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Online Event
                </p>
              </div>
            )}

            {/* Published Date */}
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm uppercase tracking-wide opacity-80">Published</p>
                <time dateTime={publishedAt} className="text-lg font-medium">
                  {formatDateTime(publishedAt)}
                </time>
              </div>
            )}
            {/* Add to Calendar Button */}
            <div>
              <AddToCalendar event={event} variant="button" />
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-[90vh] select-none">
        {image && typeof image !== 'string' && (
          <Media fill priority imgClassName="-z-10 object-cover object-center" resource={image} />
        )}
        {!image && (
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600 to-purple-700" />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-black via-black/70 to-black/0 to-100%"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black/0 via-black/80 to-black"></div>
    </div>
  )
}
