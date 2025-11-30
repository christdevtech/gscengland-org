'use client'

import React, { useState } from 'react'
import { unsubscribe } from '@/actions/subscribe'

export default async function Page({ params }: { params: Promise<{ email: string }> }) {
  const [message, setMessage] = useState('')
  const [pending, setPending] = useState(false)
  const paramsObj = await params
  const email = decodeURIComponent(paramsObj.email)

  const formAction = async () => {
    setPending(true)
    setMessage('')
    const res = await unsubscribe(email)
    setMessage(res.message)
    setPending(false)
  }

  return (
    <div className="container py-16">
      <h1 className="text-2xl font-semibold text-foreground">Unsubscribe</h1>
      <p className="mt-2 text-sm text-muted-foreground">Email: {email}</p>
      <form action={formAction} className="mt-6">
        <button
          type="submit"
          disabled={pending}
          className="px-6 py-3 bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm Unsubscribe
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-muted-foreground">{message}</p>}
    </div>
  )
}
