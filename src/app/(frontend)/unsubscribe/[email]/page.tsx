import React from 'react'
import { unsubscribe } from '@/actions/subscribe'
import { redirect } from 'next/navigation'
import UnsubscribeClient from './page.client'

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

  async function performUnsubscribe() {
    'use server'
    await unsubscribe(email)
    redirect(`/unsubscribe/${encodeURIComponent(email)}?done=1`)
  }

  const done = resolvedSearch?.done === '1'

  return <UnsubscribeClient email={email} done={done} action={performUnsubscribe} />
}
