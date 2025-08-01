import { cn } from '@/utilities/ui'
import React from 'react'
import { Staff } from '@/payload-types'
import { StaffCard } from '@/components/StaffCard'

export type StaffGridProps = {
  staff: Staff[]
  layout?: 'grid' | 'list'
  showBio?: boolean
  showContact?: boolean
  className?: string
}

export const StaffGrid: React.FC<StaffGridProps> = (props) => {
  const { staff, layout = 'grid', showBio = true, showContact = false, className } = props

  if (!staff || staff.length === 0) {
    return (
      <div className={cn('container', className)}>
        <p className="text-center text-muted-foreground">No staff members found.</p>
      </div>
    )
  }

  // Group staff by category for better organization
  const groupedStaff = staff.reduce(
    (acc, staffMember) => {
      const categories = Array.isArray(staffMember.staffCategory)
        ? staffMember.staffCategory
        : [staffMember.staffCategory]
      categories.forEach((category) => {
        if (!acc[category]) {
          acc[category] = []
        }
        acc[category].push(staffMember)
      })
      return acc
    },
    {} as Record<string, Staff[]>,
  )

  const categoryLabels = {
    trustees: 'Board of Trustees',
    pastoral: 'Pastoral Staff',
    ministers: 'Ministers',
    departments: 'Head of Departments',
  }

  // Define the order of categories
  const categoryOrder = ['trustees', 'pastoral', 'ministers', 'departments']

  return (
    <div className={cn('container', className)}>
      {categoryOrder
        .filter((category) => groupedStaff[category] && groupedStaff[category].length > 0)
        .map((category) => (
          <div key={category} className="mb-12 last:mb-0">
            <h3 className="text-2xl font-bold mb-8 text-center">
              {categoryLabels[category as keyof typeof categoryLabels] || category}
            </h3>
            <div
              className={cn(
                layout === 'grid' ? 'flex flex-wrap items-start justify-center' : 'space-y-6',
              )}
            >
              {groupedStaff[category]?.map((staffMember, index) => (
                <StaffCard
                  key={staffMember.id || index}
                  staff={staffMember}
                  layout={layout}
                  showBio={showBio}
                  showContact={showContact}
                  className={
                    layout === 'grid'
                      ? 'basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 py-4 sm:px-4'
                      : undefined
                  }
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}
