import React from 'react'
import { subscribe } from '@/actions/subscribe'
import { redirect } from 'next/navigation'
import SubscribeClient from '../page.client'

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ email: string }>
  searchParams?: Promise<{ done?: string }>
}) {
  const resolved = await params
  const resolvedSearch = await searchParams
  const email = decodeURIComponent(resolved.email)

  async function performSubscribe(formData: FormData) {
    'use server'
    const value = (formData.get('email') as string) || email
    if (!value) {
      redirect(`/subscribe/${encodeURIComponent(email)}?done=0`)
    }
    const res = await subscribe(value)
    const flag = res.ok ? '1' : '0'
    redirect(`/subscribe/${encodeURIComponent(value)}?done=${flag}`)
  }

  const done = resolvedSearch?.done === '1'

  return <SubscribeClient defaultEmail={email} done={done} action={performSubscribe} />
}
