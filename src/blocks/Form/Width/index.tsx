import { cn } from '@/utilities/ui'
import * as React from 'react'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  function percentageToColSpan(width: number | string): string {
    const percentage = Number(width)

    if (isNaN(percentage)) {
      return 'col-span-12'
    }

    if (percentage < 0 || percentage > 100) {
      return 'col-span-12'
    }

    // Calculate the number of columns based on the percentage
    const columns = Math.round((percentage / 100) * 12)

    // Ensure the columns are at least 1 and at most 12
    const colSpan = Math.min(Math.max(columns, 1), 12)

    // Use a mapping instead of a template string
    const colSpanClasses = {
      1: 'col-span-12 sm:col-span-1',
      2: 'col-span-12 sm:col-span-2',
      3: 'col-span-12 sm:col-span-3',
      4: 'col-span-12 sm:col-span-4',
      5: 'col-span-12 sm:col-span-5',
      6: 'col-span-12 sm:col-span-6',
      7: 'col-span-12 sm:col-span-7',
      8: 'col-span-12 sm:col-span-8',
      9: 'col-span-12 sm:col-span-9',
      10: 'col-span-12 sm:col-span-10',
      11: 'col-span-12 sm:col-span-11',
      12: 'col-span-12 sm:col-span-12',
    }

    return colSpanClasses[colSpan as keyof typeof colSpanClasses]
  }

  const widthClass = width ? percentageToColSpan(width) : ''
  return <div className={cn(className, widthClass, 'flex flex-col gap-2 sm:gap-4')}>{children}</div>
}
