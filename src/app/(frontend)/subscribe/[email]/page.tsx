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

  async function performSubscribe() {
    'use server'
    const value = email
    const res = await subscribe(value)
    const flag = res.ok ? '1' : '0'
    redirect(`/subscribe/${encodeURIComponent(value)}?done=${flag}`)
  }

  const done = resolvedSearch?.done === '1'

  return <SubscribeClient email={email} done={done} action={performSubscribe} />
}
