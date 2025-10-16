'use client'

import React from 'react'
import { MapPin, Phone, Mail, Copy, Check, PhoneCall, Send } from 'lucide-react'
import { ContactBlock as Props } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { cn } from '@/utilities/ui'

export const ContactBlock: React.FC<Props> = ({ address, phone, email, anchor }) => {
  const [copied, setCopied] = React.useState<{
    address?: boolean
    phone?: boolean
    email?: boolean
  }>({})

  const copyToClipboard = React.useCallback(
    (field: 'address' | 'phone' | 'email', value: string) => {
      if (!value) return
      navigator.clipboard.writeText(value).then(() => {
        setCopied((prev) => ({ ...prev, [field]: true }))
        setTimeout(() => setCopied((prev) => ({ ...prev, [field]: false })), 1500)
      })
    },
    [],
  )

  if (!address && !phone && !email) return null

  return (
    <section id={anchor || undefined} className="container py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Contact Us</h2>
        <p className="text-muted-foreground mt-2">Reach us through any of the channels below</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Address */}
        {address && (
          <Card
            className={cn(
              'group border-border bg-card text-card-foreground transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary',
              'animate-in fade-in-0 slide-in-from-bottom-2',
            )}
            style={{ animationDelay: '50ms' }}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 text-primary p-2">
                  <MapPin className="h-6 w-6" />
                </div>
                <CardTitle>Address</CardTitle>
              </div>
              <CardDescription>Find us at our location</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base leading-relaxed whitespace-pre-line">{address}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard('address', address)}
                  aria-label="Copy address"
                >
                  {copied.address ? (
                    <>
                      <Check className="h-4 w-4 mr-2" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" /> Copy
                    </>
                  )}
                </Button>
                <Button size="sm" asChild variant="default">
                  <a
                    href={`https://www.google.com/maps?q=${encodeURIComponent(address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open map"
                  >
                    <MapPin className="h-4 w-4 mr-2" /> Open Map
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Phone */}
        {phone && (
          <Card
            className={cn(
              'group border-border bg-card text-card-foreground transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary',
              'animate-in fade-in-0 slide-in-from-bottom-2',
            )}
            style={{ animationDelay: '150ms' }}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 text-primary p-2">
                  <Phone className="h-6 w-6" />
                </div>
                <CardTitle>Phone</CardTitle>
              </div>
              <CardDescription>Call or copy our phone number</CardDescription>
            </CardHeader>
            <CardContent className="justify-between">
              <p className="text-sm md:text-base leading-relaxed">{phone}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard('phone', phone)}
                  aria-label="Copy phone number"
                >
                  {copied.phone ? (
                    <>
                      <Check className="h-4 w-4 mr-2" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" /> Copy
                    </>
                  )}
                </Button>
                <Button size="sm" asChild variant="default">
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} aria-label="Call phone number">
                    <PhoneCall className="h-4 w-4 mr-2" /> Call
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Email */}
        {email && (
          <Card
            className={cn(
              'group border-border bg-card text-card-foreground transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary',
              'animate-in fade-in-0 slide-in-from-bottom-2',
            )}
            style={{ animationDelay: '250ms' }}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 text-primary p-2">
                  <Mail className="h-6 w-6" />
                </div>
                <CardTitle>Email</CardTitle>
              </div>
              <CardDescription>Send us an email or copy the address</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base leading-relaxed">{email}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard('email', email)}
                  aria-label="Copy email address"
                >
                  {copied.email ? (
                    <>
                      <Check className="h-4 w-4 mr-2" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" /> Copy
                    </>
                  )}
                </Button>
                <Button size="sm" asChild variant="default">
                  <a href={`mailto:${email}`} aria-label="Send email">
                    <Send className="h-4 w-4 mr-2" /> Email
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
