'use client'

import React from 'react'

export default function SubscribeClient({
  email,
  done,
  action,
}: {
  email?: string
  done?: boolean
  action: () => Promise<void>
}) {
  return (
    <div className="container py-16">
      <h1 className="text-2xl font-semibold text-foreground">Subscribe</h1>
      <p className="mt-2 text-sm text-muted-foreground">Email: {email || 'Not provided'}</p>
      <form action={action} className="mt-6">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-500 transition-colors duration-200 rounded-lg disabled:opacity-50"
          disabled={!email}
        >
          Confirm Subscribe
        </button>
      </form>
      {done && <p className="mt-4 text-sm text-green-300">Thank you for subscribing!</p>}
    </div>
  )
}
