'use client'

import React from 'react'

export default function UnsubscribeClient({
  email,
  done,
  action,
}: {
  email: string
  done?: boolean
  action: (formData: FormData) => Promise<void>
}) {
  return (
    <div className="container py-16">
      <h1 className="text-2xl font-semibold text-foreground">Unsubscribe</h1>
      <p className="mt-2 text-sm text-muted-foreground">Email: {email}</p>
      <form action={action} className="mt-6">
        <button
          type="submit"
          className="px-6 py-3 bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors duration-200 rounded-lg"
        >
          Confirm Unsubscribe
        </button>
      </form>
      {done && (
        <p className="mt-4 text-sm text-muted-foreground">You have been unsubscribed.</p>
      )}
    </div>
  )
}

