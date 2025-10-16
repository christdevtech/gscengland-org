'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import type { AccordionBlock as AccordionBlockType } from '@/payload-types'

type Props = {
  className?: string
} & AccordionBlockType

export const AccordionBlock: React.FC<Props> = ({ className, anchor, introContent, accordionItems }) => {
  const [openItem, setOpenItem] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index)
  }

  return (
    <div id={anchor || undefined} className={cn('w-full py-16', className)}>
      <div className="container max-w-4xl">
        {/* Intro Content */}
        {introContent && (
          <div className="mb-12 text-center">
            {introContent.subtitle && (
              <p className="text-sm font-medium text-primary mb-2 uppercase tracking-wider">
                {introContent.subtitle}
              </p>
            )}
            {introContent.title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                {introContent.title}
              </h2>
            )}
            {introContent.description && (
              <div className="text-lg text-muted-foreground max-w-3xl mx-auto">
                <RichText data={introContent.description} enableGutter={false} />
              </div>
            )}
          </div>
        )}

        {/* Accordion Items */}
        {accordionItems && accordionItems.length > 0 && (
          <div className="space-y-4">
            {accordionItems.map((item, index) => {
              const isOpen = openItem === index

              return (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-600"
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-600"
                    aria-expanded={isOpen}
                    aria-controls={`accordion-content-${index}`}
                  >
                    <h3 className="text-lg font-semibold text-foreground pr-4">{item.title}</h3>
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 text-muted-foreground transition-transform duration-600 ease-in-out flex-shrink-0',
                        isOpen && 'rotate-180',
                      )}
                    />
                  </button>

                  {/* Accordion Content */}
                  <div
                    id={`accordion-content-${index}`}
                    className={cn(
                      'overflow-hidden transition-all duration-600 ease-in-out',
                      isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0',
                    )}
                  >
                    <div className="px-6 pb-6 pt-2">
                      <div className="text-muted-foreground border-t border-border pt-4">
                        <RichText data={item.content} enableGutter={false} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
