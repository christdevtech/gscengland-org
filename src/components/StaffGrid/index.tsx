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
  const groupedStaff = staff.reduce((acc, staffMember) => {
    const category = staffMember.staffCategory
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(staffMember)
    return acc
  }, {} as Record<string, Staff[]>)

  const categoryLabels = {
    leadership: 'Leadership',
    pastoral: 'Pastoral Staff',
    ministry: 'Ministry Leaders',
    administrative: 'Administrative Staff',
    support: 'Support Staff',
  }

  return (
    <div className={cn('container', className)}>
      {Object.entries(groupedStaff).map(([category, categoryStaff]) => (
        <div key={category} className="mb-12 last:mb-0">
          <h3 className="text-2xl font-bold mb-8 text-center">
            {categoryLabels[category as keyof typeof categoryLabels] || category}
          </h3>
          <div
            className={cn(
              layout === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-6'
            )}
          >
            {categoryStaff.map((staffMember, index) => (
              <StaffCard
                key={staffMember.id || index}
                staff={staffMember}
                layout={layout}
                showBio={showBio}
                showContact={showContact}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}