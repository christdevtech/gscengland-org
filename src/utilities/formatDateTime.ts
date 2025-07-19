export const formatDateTime = (timestamp: string): string => {
  const now = new Date()
  let date = now
  if (timestamp) date = new Date(timestamp)
  const months = date.getMonth()
  const days = date.getDate()
  // const hours = date.getHours();
  // const minutes = date.getMinutes();
  // const seconds = date.getSeconds();

  const MM = months + 1 < 10 ? `0${months + 1}` : months + 1
  const DD = days < 10 ? `0${days}` : days
  const YYYY = date.getFullYear()
  // const AMPM = hours < 12 ? 'AM' : 'PM';
  // const HH = hours > 12 ? hours - 12 : hours;
  // const MinMin = (minutes < 10) ? `0${minutes}` : minutes;
  // const SS = (seconds < 10) ? `0${seconds}` : seconds;

  return `${MM}/${DD}/${YYYY}`
}

/**
 * Formats a date string into a human-readable format
 * @param timestamp - ISO date string or date string
 * @param options - Intl.DateTimeFormat options for customization
 * @returns Human-readable date string (e.g., "January 15, 2024", "Jan 15, 2024")
 */
export const formatHumanDate = (
  timestamp: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string => {
  if (!timestamp) return 'Date TBD'
  
  try {
    const date = new Date(timestamp)
    if (isNaN(date.getTime())) return 'Invalid Date'
    
    return date.toLocaleDateString('en-US', options)
  } catch (error) {
    return 'Invalid Date'
  }
}

/**
 * Formats a date string into a short human-readable format
 * @param timestamp - ISO date string or date string
 * @returns Short date string (e.g., "Jan 15, 2024")
 */
export const formatShortDate = (timestamp: string): string => {
  return formatHumanDate(timestamp, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Formats a time string (HH:MM format) or ISO timestamp into a human-readable 12-hour format
 * @param timeString - Time in HH:MM format (e.g., "14:30", "09:00") or ISO timestamp (e.g., "2025-07-18T07:00:00.000Z")
 * @returns Formatted time string (e.g., "2:30 PM", "9:00 AM")
 */
export const formatTime = (timeString: string): string => {
  if (!timeString) return 'Time TBD'
  
  try {
    let hours: number
    let minutes: number
    
    // Check if it's an ISO timestamp (contains 'T' or is a full date)
    if (timeString.includes('T') || timeString.includes('-') && timeString.length > 10) {
      const date = new Date(timeString)
      if (isNaN(date.getTime())) return timeString
      
      hours = date.getHours()
      minutes = date.getMinutes()
    } else {
      // Handle HH:MM and HH:MM:SS formats
      const timeParts = timeString.split(':')
      if (timeParts.length < 2) return timeString // Return as-is if not in expected format
      
      hours = parseInt(timeParts[0] || '0', 10)
      minutes = parseInt(timeParts[1] || '0', 10)
      
      if (isNaN(hours) || isNaN(minutes)) return timeString
    }
    
    // Convert to 12-hour format
    const period = hours >= 12 ? 'PM' : 'AM'
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
    const displayMinutes = minutes.toString().padStart(2, '0')
    
    return `${displayHours}:${displayMinutes} ${period}`
  } catch (error) {
    return timeString // Return original if parsing fails
  }
}

/**
 * Formats a time range from start and end time strings or ISO timestamps
 * @param startTime - Start time in HH:MM format or ISO timestamp
 * @param endTime - End time in HH:MM format or ISO timestamp
 * @returns Formatted time range (e.g., "9:00 AM - 5:30 PM")
 */
export const formatTimeRange = (startTime: string, endTime: string): string => {
  if (!startTime && !endTime) return 'Time TBD'
  if (!startTime) return `Until ${formatTime(endTime)}`
  if (!endTime) return `From ${formatTime(startTime)}`
  
  return `${formatTime(startTime)} - ${formatTime(endTime)}`
}

/**
 * Formats a full date and time into a human-readable format
 * @param timestamp - ISO date string with time
 * @returns Formatted date and time string (e.g., "January 15, 2024 at 2:30 PM")
 */
export const formatFullDateTime = (timestamp: string): string => {
  if (!timestamp) return 'Date and time TBD'
  
  try {
    const date = new Date(timestamp)
    if (isNaN(date.getTime())) return 'Invalid Date'
    
    const dateStr = formatHumanDate(timestamp)
    const timeStr = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    
    return `${dateStr} at ${timeStr}`
  } catch (error) {
    return 'Invalid Date'
  }
}
