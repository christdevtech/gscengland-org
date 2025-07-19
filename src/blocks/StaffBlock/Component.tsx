import type { Staff, StaffBlock as StaffBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { StaffGrid } from '@/components/StaffGrid'

export const StaffBlock: React.FC<
  StaffBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    introContent,
    displayBy,
    staffCategories,
    selectedStaff,
    layout,
    showBio,
    showContact,
  } = props

  let staff: Staff[] = []

  const payload = await getPayload({ config: configPromise })

  if (displayBy === 'all') {
    const fetchedStaff = await payload.find({
      collection: 'staff',
      depth: 1,
      sort: ['staffCategory', 'order', 'name'],
    })
    staff = fetchedStaff.docs
  } else if (displayBy === 'category' && staffCategories?.length) {
    const fetchedStaff = await payload.find({
      collection: 'staff',
      depth: 1,
      sort: ['staffCategory', 'order', 'name'],
      where: {
        staffCategory: {
          in: staffCategories,
        },
      },
    })
    staff = fetchedStaff.docs
  } else if (displayBy === 'selection' && selectedStaff?.length) {
    const filteredSelectedStaff = selectedStaff
      .map((staffMember) => {
        if (typeof staffMember === 'object') return staffMember
        return null
      })
      .filter(Boolean) as Staff[]

    staff = filteredSelectedStaff
  }

  return (
    <div className="py-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <StaffGrid
        staff={staff}
        layout={layout || 'grid'}
        showBio={showBio ? showBio : false}
        showContact={showContact ? showContact : false}
      />
    </div>
  )
}
