'use client'

import React from 'react'

export default function SubscribeClient({
  defaultEmail,
  done,
  action,
}: {
  defaultEmail?: string
  done?: boolean
  action: (formData: FormData) => Promise<void>
}) {
  return (
    <div className="container py-16">
      <h1 className="text-2xl font-semibold text-foreground">Subscribe</h1>
      <p className="mt-2 text-sm text-muted-foreground">Join the GSC England mailing list.</p>
      <form action={action} className="mt-6 max-w-sm">
        <div className="relative">
          <input
            type="email"
            name="email"
            defaultValue={defaultEmail}
            placeholder="Your email address"
            className="w-full px-4 py-4 pr-12 bg-blue-600/30 border border-blue-500/30 rounded-lg text-white placeholder-blue-200/60 focus:outline-none focus:border-blue-400 focus:bg-blue-600/40 transition-all duration-200"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-200 transition-colors duration-200"
          >
            <svg className="w-6 h-6 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
      {done && (
        <p className="mt-4 text-sm text-green-300">Thank you for subscribing!</p>
      )}
    </div>
  )
}

