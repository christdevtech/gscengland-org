import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidateSite } from '@/hooks/revalidateSite'
import type { Staff } from '@/payload-types'

export const revalidateStaff: CollectionAfterChangeHook<Staff> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating pages that display staff blocks')
    revalidateSite()
  }

  return doc
}

export const revalidateStaffDelete: CollectionAfterDeleteHook<Staff> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating pages that display staff blocks')
    revalidateSite()
  }

  return doc
}
