import { Subscriber } from '@/payload-types'
import type { CollectionAfterDeleteHook } from 'payload'

export const afterUnsubscribe: CollectionAfterDeleteHook<Subscriber> = async ({ doc, req }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || ''
  const subscribeUrl = `${baseUrl}/subscribe/${encodeURIComponent(doc.email)}`
  const logoUrl = `${baseUrl}/logowhite.png`

  const html = `
  <div style="background:#f7fafc;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#1a202c">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08)">
      <div style="background:#334155;color:#ffffff;padding:24px 28px">
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:30px">
          <img src="${logoUrl}" alt="GSC England" style="width:100px;height:auto;display:block" />
          <strong style="font-size:18px;line-height:1.4">Gateway Salvation Church</strong>
        </div>
        <h1 style="margin:0;font-size:22px;line-height:1.4">You have been unsubscribed</h1>
        <p style="margin:8px 0 0;font-size:14px;opacity:0.9">We’re sorry to see you go.</p>
      </div>
      <div style="padding:24px 28px">
        <p style="margin:0 0 16px;font-size:15px">Your email has been removed from the GSC England mailing list.</p>
        <p style="margin:0 0 16px;font-size:15px">If this was a mistake, you can subscribe again using the button below.</p>
        <div style="text-align:center;margin:20px 0">
          <a href="${subscribeUrl}" style="display:inline-block;background:#1e3a8a;color:#ffffff;padding:12px 18px;border-radius:8px;text-decoration:none;font-size:14px">Subscribe Again</a>
        </div>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0" />
        <p style="margin:0;font-size:13px;color:#4a5568">You can visit our website anytime to explore events, sermons, and resources.</p>
      </div>
      <div style="background:#f1f5f9;color:#475569;padding:16px 20px;text-align:center;font-size:12px">
        Gateway Salvation Church · United Kingdom
      </div>
    </div>
  </div>`

  try {
    await req.payload.sendEmail({
      to: doc?.email,
      subject: 'Unsubscribed from GSC England Updates',
      html,
    })
  } catch (e) {
    req.payload.logger.error({ err: e, msg: 'Failed to send unsubscribe email' })
  }

  return doc
}
