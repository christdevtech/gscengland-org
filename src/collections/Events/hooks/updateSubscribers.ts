import type { CollectionAfterChangeHook } from 'payload'
import type { Event, Subscriber } from '@/payload-types'

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SERVER_URL || 'https://gscengland.org'
}

function getImageUrl(event: Event): string | undefined {
  const media = (event.meta?.image as any) || event.image
  if (media && typeof media === 'object') {
    return (
      media.sizes?.og?.url ||
      media.sizes?.large?.url ||
      media.url ||
      (media.filename ? `${getBaseUrl()}/media/${media.filename}` : undefined)
    )
  }
  return undefined
}

export const updateSubscribersForEvent: CollectionAfterChangeHook<Event> = async ({
  doc,
  operation,
  req,
  previousDoc,
}) => {
  const isPublishedNow = doc?._status === 'published'
  const wasPublishedBefore = previousDoc?._status === 'published'
  if (!isPublishedNow || wasPublishedBefore) return doc

  const baseUrl = getBaseUrl()
  const logoUrl = `${baseUrl}/logo-white.png`
  let fresh: Event | undefined
  try {
    fresh = (await req.payload.findByID({
      collection: 'events',
      id: doc.id,
      depth: 0,
      select: {
        slug: true,
        title: true,
        meta: true,
        image: true,
        venue: true,
        isMultiDay: true,
        startDate: true,
        endDate: true,
        date: true,
      },
    })) as unknown as Event
  } catch (e) {
    fresh = doc as unknown as Event
  }
  const eventUrl = `${baseUrl}/events/${encodeURIComponent(fresh?.slug || doc.slug || doc.id || '')}`
  const imageUrl = getImageUrl(fresh || doc)

  const { docs: subscribers } = await req.payload.find({
    collection: 'subscribers',
    limit: 0,
    pagination: false,
  })

  const subject = `New Event: ${fresh?.title || doc.title || ''}`

  for (const s of subscribers) {
    const unsubscribeUrl = `${baseUrl}/unsubscribe/${encodeURIComponent(s.email || '')}`

    const metaTitle = fresh?.meta?.title || fresh?.title || doc.title || ''
    const venue = fresh?.venue ? `Venue: ${fresh.venue}` : ''
    const dates =
      (fresh?.isMultiDay ?? doc.isMultiDay)
        ? `Dates: ${fresh?.startDate ? new Date(fresh.startDate).toLocaleString() : doc.startDate ? new Date(doc.startDate).toLocaleString() : ''} - ${fresh?.endDate ? new Date(fresh.endDate).toLocaleString() : doc.endDate ? new Date(doc.endDate).toLocaleString() : ''}`
        : `Date: ${fresh?.date ? new Date(fresh.date).toLocaleString() : doc.date ? new Date(doc.date).toLocaleString() : ''}`

    const html = `
    <div style="background:#f7fafc;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#1a202c">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08)">
        <img src="${logoUrl}" alt="GSC England" style="width:100px;height:auto;display:block" />
        <strong style="font-size:24px;line-height:1.4; margin-bottom:30px">Gateway Salvation Church</strong>
        <div style="padding:24px 28px">
          <h2 style="margin:0 0 8px;font-size:22px;color:#111827">${fresh?.title || doc.title || ''}</h2>
          ${metaTitle ? `<p style=\"margin:0 0 8px;font-size:14px;color:#4b5563\">${metaTitle}</p>` : ''}
          ${venue ? `<p style=\"margin:0 0 4px;font-size:14px;color:#374151\">${venue}</p>` : ''}
          <p style="margin:0 0 8px;font-size:14px;color:#374151">${dates}</p>
          ${imageUrl ? `<div style="margin:16px 0"><img src="${imageUrl}" alt="${fresh?.title || doc.title || ''}" style="width:100%;height:auto;border-radius:10px"/></div>` : ''}
          ${fresh?.meta?.description ? `<p style="margin:0 0 16px;font-size:15px;color:#1f2937">${fresh.meta.description}</p>` : ''}
          <div style="text-align:center;margin:20px 0">
            <a href="${eventUrl}" style="display:inline-block;background:#1e3a8a;color:#ffffff;padding:12px 18px;border-radius:8px;text-decoration:none;font-size:14px">View Event Details</a>
          </div>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0" />
          <p style="margin:0 0 8px;font-size:12px;color:#6b7280;text-align:center">If you no longer wish to receive updates, you can unsubscribe below.</p>
          <div style="text-align:center"><a href="${unsubscribeUrl}" style="font-size:12px;color:#ef4444;text-decoration:underline">Unsubscribe</a></div>
        </div>
        <div style="background:#f1f5f9;color:#475569;padding:12px 20px;text-align:center;font-size:12px">Gateway Salvation Church · United Kingdom</div>
      </div>
    </div>`

    try {
      await req.payload.sendEmail({ to: s.email, subject, html })
    } catch (e) {
      req.payload.logger.error({ err: e, msg: 'Failed to send event update email' })
    }
  }

  return doc
}
