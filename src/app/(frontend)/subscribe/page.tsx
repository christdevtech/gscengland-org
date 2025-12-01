import React from 'react'
import { subscribe } from '@/actions/subscribe'
import { redirect } from 'next/navigation'
import SubscribeClient from './page.client'

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ email?: string; done?: string }>
}) {
  const resolved = await searchParams
  const email = resolved?.email ? decodeURIComponent(resolved.email) : ''

  async function performSubscribe() {
    'use server'
    if (!email) {
      redirect('/subscribe?done=0')
    }
    const res = await subscribe(email)
    const flag = res.ok ? '1' : '0'
    const qsEmail = encodeURIComponent(email)
    redirect(`/subscribe?done=${flag}&email=${qsEmail}`)
  }

  const done = resolved?.done === '1'

  return <SubscribeClient email={email} done={done} action={performSubscribe} />
}
