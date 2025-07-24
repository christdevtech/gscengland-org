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
      <div
        className={cn(
          'flex flex-col sm:flex-row text-center sm:text-left items-center gap-6 md:gap-12 p-6 bg-white dark:bg-card rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300',
          className,
        )}
      >
        {profilePicture && (
          <div className="flex-shrink-0">
            <div className="w-40 h-40 rounded-full overflow-hidden ring-2 ring-gray-100 dark:ring-gray-800 relative">
              <Media resource={profilePicture} fill imgClassName="w-full h-full object-cover" />
            </div>
          </div>
        )}
        <div className="flex-1">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{staff.name}</h4>
          <p className="text-gray-600 dark:text-gray-400 font-medium mb-3">{staff.position}</p>
          {showBio && staff.bio && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-3 hover:line-clamp-none leading-relaxed">
              {staff.bio}
            </p>
          )}
          {showContact && (staff.email || staff.phone) && (
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm">
              {staff.email && (
                <a
                  href={`mailto:${staff.email}`}
                  className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {staff.email}
                </a>
              )}
              {staff.phone && (
                <a
                  href={`tel:${staff.phone}`}
                  className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
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
    <div className={cn(className)}>
      {profilePicture && (
        <div className="flex justify-center">
          <div className="w-full aspect-square overflow-hidden ring-2 ring-gray-200 dark:ring-gray-800 relative">
            <Media
              fill
              resource={profilePicture}
              imgClassName="w-full h-full object-cover transition-transform hover:scale-105"
            />
          </div>
        </div>
      )}
      <div
        className={cn(
          'bg-white dark:bg-card text-card rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center p-4',
          'space-y-2 -mt-12 relative mx-6',
          showContact && '-mt-16',
        )}
      >
        <h4 className="text-xl font-bold text-gray-900 dark:text-white">{staff.name}</h4>
        <p className="text-gray-600 dark:text-gray-400 font-medium">{staff.position}</p>
        {showBio && staff.bio && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 line-clamp-4 hover:line-clamp-none leading-relaxed transition-line-clamp duration-500">
            {staff.bio}
          </p>
        )}
        {showContact && (staff.email || staff.phone) && (
          <div className="flex flex-col items-center gap-2 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
            {staff.email && (
              <a
                href={`mailto:${staff.email}`}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {staff.email}
              </a>
            )}
            {staff.phone && (
              <a
                href={`tel:${staff.phone}`}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
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
