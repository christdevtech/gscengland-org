import { Subscriber } from '@/payload-types'
import type { CollectionAfterChangeHook } from 'payload'

export const afterSubscribe: CollectionAfterChangeHook<Subscriber> = async ({
  doc,
  operation,
  req,
}) => {
  if (operation !== 'create') return doc

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://gscengland.org'
  const unsubscribeUrl = `${baseUrl}/unsubscribe/${encodeURIComponent(doc.email)}`
  const logoUrl = `${baseUrl}/logo-white.png`

  const html = `
  <div style="background:#f7fafc;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#1a202c">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08)">
      <div style="background:#1e3a8a;color:#ffffff;padding:24px 28px">
       <div style="display:flex;align-items:center;gap:14px;margin-bottom:30px">
          <img src="${logoUrl}" alt="GSC England" style="width:100px;height:auto;display:block" />
          <strong style="font-size:18px;line-height:1.4">Gateway Salvation Church</strong>
        </div>
        <h1 style="margin:0;font-size:22px;line-height:1.4">Welcome to GSC England Updates</h1>
        <p style="margin:8px 0 0;font-size:14px;opacity:0.9">You are now subscribed to our mailing list.</p>
      </div>
      <div style="padding:24px 28px">
        <p style="margin:0 0 12px;font-size:15px">Hello,</p>
        <p style="margin:0 0 16px;font-size:15px">Thank you for subscribing to Gateway Salvation Church updates. We’ll keep you informed about services, events, and community news.</p>
        <div style="text-align:center;margin:20px 0">
          <a href="${baseUrl}" style="display:inline-block;background:#1e3a8a;color:#ffffff;padding:12px 18px;border-radius:8px;text-decoration:none;font-size:14px">Visit Our Website</a>
        </div>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0" />
        <p style="margin:0 0 12px;font-size:13px;color:#4a5568">If you did not intend to subscribe or wish to opt out at any time, you can unsubscribe below.</p>
        <div style="text-align:center">
          <a href="${unsubscribeUrl}" style="display:inline-block;background:#ef4444;color:#ffffff;padding:10px 14px;border-radius:8px;text-decoration:none;font-size:13px">Unsubscribe</a>
        </div>
      </div>
      <div style="background:#f1f5f9;color:#475569;padding:16px 20px;text-align:center;font-size:12px">
        Gateway Salvation Church · United Kingdom
      </div>
    </div>
  </div>`

  try {
    await req.payload.sendEmail({
      to: doc.email,
      subject: 'Subscribed to GSC England Updates',
      html,
    })
  } catch (e) {
    req.payload.logger.error({ err: e, msg: 'Failed to send subscription email' })
  }

  return doc
}
