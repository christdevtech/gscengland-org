'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function subscribe(email: string): Promise<{ ok: boolean; message: string }> {
  const payload = await getPayload({ config: configPromise })

  try {
    await payload.create({ collection: 'subscribers', data: { email } })
    return { ok: true, message: 'Thank you for subscribing!' }
  } catch (e) {
    console.log('Subscribe Error: ', e)
    const msg = e instanceof Error ? e.message.toLowerCase() : String(e).toLowerCase()
    if (msg.includes('invalid')) {
      return { ok: true, message: 'You are already subscribed.' }
    }
    return { ok: false, message: 'Something went wrong. Please try again.' }
  }
}

export async function unsubscribe(email: string): Promise<{ ok: boolean; message: string }> {
  const payload = await getPayload({ config: configPromise })

  try {
    const existing = await payload.find({
      collection: 'subscribers',
      limit: 1,
      where: { email: { equals: email } },
    })

    if (existing.docs.length > 0) {
      await payload.delete({ collection: 'subscribers', where: { email: { equals: email } } })
      return { ok: true, message: 'You have been unsubscribed.' }
    }

    return { ok: true, message: 'You are already unsubscribed.' }
  } catch (e) {
    return { ok: false, message: 'Something went wrong. Please try again.' }
  }
}
