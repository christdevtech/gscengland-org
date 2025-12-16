'use client'

import React from 'react'
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Sun,
  Moon,
  Heart,
  Megaphone,
  Users,
  Star,
  Home,
} from 'lucide-react'
import type { ServiceBlock as ServiceBlockProps } from '@/payload-types'

const iconMap = {
  Calendar,
  Clock,
  MapPin,
  Video,
  Sun,
  Moon,
  Heart,
  Megaphone,
  Users,
  Star,
  Home,
}

export const ServiceBlock: React.FC<ServiceBlockProps> = ({ title, items }) => {
  return (
    <div className="container py-12 md:py-20">
      {title && <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{title}</h2>}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items?.map((item, index) => {
          const IconComponent =
            item.icon && iconMap[item.icon as keyof typeof iconMap]
              ? iconMap[item.icon as keyof typeof iconMap]
              : Calendar

          return (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm border text-card-foreground text-center h-full transition-all hover:shadow-md"
            >
              <div className="p-3 bg-primary/10 rounded-full mb-4 text-primary">
                <IconComponent className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              {item.subtitle && (
                <p className="text-sm text-muted-foreground mb-4 font-medium">{item.subtitle}</p>
              )}

              <div className="space-y-2 mt-auto text-sm">
                {item.frequency && (
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{item.frequency}</span>
                  </div>
                )}
                {item.time && (
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{item.time}</span>
                  </div>
                )}
                {item.location && (
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
