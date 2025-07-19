'use client'

import React, { useState } from 'react'
import { Calendar, ChevronDown, ExternalLink, Download } from 'lucide-react'
import type { Event } from '@/payload-types'
import {
  eventToCalendarData,
  calendarProviders,
  downloadICSFile,
  type CalendarEventData,
} from '@/utilities/calendarUtils'

interface AddToCalendarProps {
  event: Event
  className?: string
  variant?: 'button' | 'dropdown'
}

export const AddToCalendar: React.FC<AddToCalendarProps> = ({
  event,
  className = '',
  variant = 'dropdown',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const calendarData = eventToCalendarData(event)

  if (!calendarData) {
    return null // No valid date information
  }

  const handleProviderClick = (provider: typeof calendarProviders[0]) => {
    if (provider.name === 'Download ICS') {
      downloadICSFile(calendarData)
    } else if (provider.generateUrl) {
      const url = provider.generateUrl(calendarData)
      window.open(url, '_blank', 'noopener,noreferrer')
    }
    setIsOpen(false)
  }

  if (variant === 'button') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg transition-all duration-200 backdrop-blur-sm"
        >
          <Calendar className="w-4 h-4" />
          Add to Calendar
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
              <div className="py-2">
                {calendarProviders.map((provider) => (
                  <button
                    key={provider.name}
                    onClick={() => handleProviderClick(provider)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 text-gray-900 dark:text-gray-100"
                  >
                    <span className="text-lg">{provider.icon}</span>
                    <span className="flex-1">{provider.name}</span>
                    {provider.name === 'Download ICS' ? (
                      <Download className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
      >
        <Calendar className="w-5 h-5" />
        Add to Calendar
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Add to Calendar
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Choose your preferred calendar app
              </p>
            </div>
            <div className="py-2">
              {calendarProviders.map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => handleProviderClick(provider)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 text-gray-900 dark:text-gray-100 transition-colors"
                >
                  <span className="text-xl">{provider.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium">{provider.name}</div>
                    {provider.name === 'Download ICS' && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Works with Apple Calendar, Thunderbird, etc.
                      </div>
                    )}
                  </div>
                  {provider.name === 'Download ICS' ? (
                    <Download className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}