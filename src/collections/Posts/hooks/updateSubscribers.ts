import type { CollectionAfterChangeHook } from 'payload'
import type { Post, Subscriber } from '@/payload-types'

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SERVER_URL || 'https://gscengland.org'
}

function getImageUrl(post: Post): string | undefined {
  const media = (post.meta?.image as any) || post.heroImage
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

export const updateSubscribersForPost: CollectionAfterChangeHook<Post> = async ({
  doc,
  operation,
  req,
  previousDoc,
}) => {
  const isPublishedNow = doc?._status === 'published'
  const wasPublishedBefore = previousDoc?._status === 'published'
  if (!isPublishedNow || wasPublishedBefore) return doc

  req.payload.logger.info('Updating subscribers for post')

  const baseUrl = getBaseUrl()
  const logoUrl = `${baseUrl}/logo-white.png`
  let fresh: Post | undefined
  try {
    fresh = (await req.payload.findByID({
      collection: 'posts',
      id: doc.id,
      depth: 0,
      select: {
        slug: true,
        title: true,
        meta: true,
        heroImage: true,
      },
    })) as unknown as Post
  } catch (e) {
    fresh = doc as unknown as Post
  }
  const postUrl = `${baseUrl}/posts/${encodeURIComponent(fresh?.slug || doc.slug || doc.id || '')}`
  const imageUrl = getImageUrl(fresh || doc)

  const { docs: subscribers } = await req.payload.find({
    collection: 'subscribers',
    limit: 0,
    pagination: false,
  })

  const subject = `New Post: ${fresh?.title || doc.title || ''}`

  for (const s of subscribers) {
    const unsubscribeUrl = `${baseUrl}/unsubscribe/${encodeURIComponent(s.email || '')}`

    const html = `
    <div style="background:#f7fafc;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#1a202c">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08)">
        <div style="background:#0f172a;color:#ffffff;padding:18px 24px;display:flex;align-items:center;gap:14px">
          <img src="${logoUrl}" alt="GSC England" style="width:100px;height:auto;display:block" />
          <strong style="font-size:18px;line-height:1.4">Gateway Salvation Church</strong>
        </div>
        <div style="padding:24px 28px">
          <h2 style="margin:0 0 8px;font-size:22px;color:#111827">${fresh?.title || doc.title || ''}</h2>
          ${fresh?.meta?.title ? `<p style="margin:0 0 12px;font-size:14px;color:#4b5563">${fresh.meta.title}</p>` : ''}
          ${imageUrl ? `<div style="margin:16px 0"><img src="${imageUrl}" alt="${fresh?.title || doc.title || ''}" style="width:100%;height:auto;border-radius:10px"/></div>` : ''}
          ${fresh?.meta?.description ? `<p style="margin:0 0 16px;font-size:15px;color:#1f2937">${fresh.meta.description}</p>` : ''}
          <div style="text-align:center;margin:20px 0">
            <a href="${postUrl}" style="display:inline-block;background:#1e3a8a;color:#ffffff;padding:12px 18px;border-radius:8px;text-decoration:none;font-size:14px">Read The Post</a>
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
      req.payload.logger.error({ err: e, msg: 'Failed to send post update email' })
    }
  }

  return doc
}
