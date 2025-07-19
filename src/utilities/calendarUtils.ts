import type { Event } from '@/payload-types'

export interface CalendarEventData {
  title: string
  description: string
  startDate: Date
  endDate: Date
  location?: string
  url?: string
}

/**
 * Converts Lexical editor content to plain text
 */
function lexicalToPlainText(lexicalContent: any): string {
  if (!lexicalContent?.root?.children) return ''
  
  const extractText = (children: any[]): string => {
    return children
      .map((child) => {
        if (child.type === 'text') {
          return child.text || ''
        }
        if (child.children) {
          return extractText(child.children)
        }
        return ''
      })
      .join('')
  }
  
  return extractText(lexicalContent.root.children)
}

/**
 * Converts Event data to CalendarEventData format
 */
export function eventToCalendarData(event: Event): CalendarEventData | null {
  const { title, description, isMultiDay, startDate, endDate, date, venue, isVirtual } = event
  
  let eventStartDate: Date
  let eventEndDate: Date
  
  // Determine start and end dates
  if (isMultiDay && startDate && endDate) {
    eventStartDate = new Date(startDate)
    eventEndDate = new Date(endDate)
  } else if (date) {
    eventStartDate = new Date(date)
    // If no end time specified, assume 2-hour duration
    eventEndDate = new Date(eventStartDate.getTime() + 2 * 60 * 60 * 1000)
  } else {
    return null // No valid date information
  }
  
  // Extract description text
  const descriptionText = description ? lexicalToPlainText(description) : ''
  
  // Determine location
  const location = isVirtual ? 'Online Event' : venue || ''
  
  return {
    title,
    description: descriptionText,
    startDate: eventStartDate,
    endDate: eventEndDate,
    location,
  }
}

/**
 * Formats date for calendar URLs (YYYYMMDDTHHMMSSZ format)
 */
function formatDateForCalendar(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

/**
 * Generates Google Calendar URL
 */
export function generateGoogleCalendarUrl(eventData: CalendarEventData): string {
  const { title, description, startDate, endDate, location } = eventData
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${formatDateForCalendar(startDate)}/${formatDateForCalendar(endDate)}`,
    details: description,
    location: location || '',
  })
  
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

/**
 * Generates Outlook Calendar URL
 */
export function generateOutlookCalendarUrl(eventData: CalendarEventData): string {
  const { title, description, startDate, endDate, location } = eventData
  
  const params = new URLSearchParams({
    subject: title,
    startdt: startDate.toISOString(),
    enddt: endDate.toISOString(),
    body: description,
    location: location || '',
  })
  
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
}

/**
 * Generates Yahoo Calendar URL
 */
export function generateYahooCalendarUrl(eventData: CalendarEventData): string {
  const { title, description, startDate, endDate, location } = eventData
  
  const params = new URLSearchParams({
    v: '60',
    title: title,
    st: formatDateForCalendar(startDate),
    et: formatDateForCalendar(endDate),
    desc: description,
    in_loc: location || '',
  })
  
  return `https://calendar.yahoo.com/?${params.toString()}`
}

/**
 * Generates ICS file content for download
 */
export function generateICSFile(eventData: CalendarEventData): string {
  const { title, description, startDate, endDate, location } = eventData
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//GSC England//Event Calendar//EN',
    'BEGIN:VEVENT',
    `DTSTART:${formatDateForCalendar(startDate)}`,
    `DTEND:${formatDateForCalendar(endDate)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location || ''}`,
    `UID:${Date.now()}@gscengland.org`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  
  return icsContent
}

/**
 * Downloads ICS file
 */
export function downloadICSFile(eventData: CalendarEventData): void {
  const icsContent = generateICSFile(eventData)
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${eventData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}

/**
 * Calendar provider configurations
 */
export const calendarProviders = [
  {
    name: 'Google Calendar',
    icon: '📅',
    generateUrl: generateGoogleCalendarUrl,
  },
  {
    name: 'Outlook',
    icon: '📧',
    generateUrl: generateOutlookCalendarUrl,
  },
  {
    name: 'Yahoo Calendar',
    icon: '🟣',
    generateUrl: generateYahooCalendarUrl,
  },
  {
    name: 'Download ICS',
    icon: '📥',
    generateUrl: null, // Special case for download
  },
]