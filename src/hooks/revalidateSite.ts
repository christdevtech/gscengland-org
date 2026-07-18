import { revalidatePath } from 'next/cache'

/**
 * Invalidate every frontend route that may contain collection-backed blocks.
 * Next.js regenerates each affected route on its next request.
 */
export const revalidateSite = () => {
  revalidatePath('/', 'layout')
}
