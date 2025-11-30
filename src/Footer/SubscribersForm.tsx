
'use client'

import React, { useState } from 'react'
import { subscribe } from '@/actions/subscribe'

export const SubscribersForm = ({ headerClass }: { headerClass: string }) => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const formAction = async (formData: FormData) => {
    const value = (formData.get('email') as string) || ''
    if (!value) {
      setMessage('Please enter your email address')
      return
    }
    setIsSubmitting(true)
    setMessage('')
    const res = await subscribe(value)
    setMessage(res.message)
    if (res.ok) setEmail('')
    setIsSubmitting(false)
  }

  return (
    <div className="w-full max-w-sm">
      <h2 className={headerClass}>Stay up to date</h2>

      <form action={formAction} className="relative">
        <div className="relative">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full px-4 py-4 pr-12 bg-blue-600/30 border border-blue-500/30 rounded-lg text-white placeholder-blue-200/60 focus:outline-none focus:border-blue-400 focus:bg-blue-600/40 transition-all duration-200"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting || !email}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-6 h-6 rotate-45"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>

        {message && (
          <p
            className={`mt-2 text-sm ${
              message.includes('Thank you') ? 'text-green-300' : 'text-red-300'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  )
}
