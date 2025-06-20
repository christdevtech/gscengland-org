import { cn } from '@/utilities/ui'
import React from 'react'
import { Staff, Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { Mail, Phone } from 'lucide-react'

export type StaffCardProps = {
  staff: Staff
  layout?: 'grid' | 'list'
  showBio?: boolean
  showContact?: boolean
  className?: string
}

export const StaffCard: React.FC<StaffCardProps> = (props) => {
  const { staff, layout = 'grid', showBio = true, showContact = false, className } = props

  const profilePicture = staff.profilePicture as MediaType | null

  if (layout === 'list') {
    return (
      <div className={cn('flex gap-6 p-6 bg-card rounded-lg border', className)}>
        {profilePicture && (
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <Media
                resource={profilePicture}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        <div className="flex-1">
          <h4 className="text-xl font-semibold mb-1">{staff.name}</h4>
          <p className="text-muted-foreground mb-3">{staff.position}</p>
          {showBio && staff.bio && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{staff.bio}</p>
          )}
          {showContact && (staff.email || staff.phone) && (
            <div className="flex gap-4 text-sm">
              {staff.email && (
                <a
                  href={`mailto:${staff.email}`}
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  {staff.email}
                </a>
              )}
              {staff.phone && (
                <a
                  href={`tel:${staff.phone}`}
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  {staff.phone}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('bg-card rounded-lg border overflow-hidden', className)}>
      {profilePicture && (
        <div className="aspect-square overflow-hidden">
          <Media
            resource={profilePicture}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <h4 className="text-lg font-semibold mb-1">{staff.name}</h4>
        <p className="text-muted-foreground mb-3">{staff.position}</p>
        {showBio && staff.bio && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-4">{staff.bio}</p>
        )}
        {showContact && (staff.email || staff.phone) && (
          <div className="space-y-2">
            {staff.email && (
              <a
                href={`mailto:${staff.email}`}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Mail className="w-4 h-4" />
                {staff.email}
              </a>
            )}
            {staff.phone && (
              <a
                href={`tel:${staff.phone}`}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Phone className="w-4 h-4" />
                {staff.phone}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}