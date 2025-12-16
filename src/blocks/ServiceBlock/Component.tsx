'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
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
import { cn } from '@/utilities/ui'

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
}

export const ServiceBlock: React.FC<ServiceBlockProps> = ({ title, items }) => {
  return (
    <div className="container py-12 md:py-20">
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 dark:from-white dark:to-white/70"
        >
          {title}
        </motion.h2>
      )}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {items?.map((item, index) => {
          const IconComponent =
            item.icon && iconMap[item.icon as keyof typeof iconMap]
              ? iconMap[item.icon as keyof typeof iconMap]
              : Calendar

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
                borderColor: 'var(--brand-blue)',
              }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'flex flex-col items-center p-6 rounded-xl border border-border/50',
                'bg-gradient-to-br from-card via-card to-secondary/20',
                'text-card-foreground text-center h-full transition-colors duration-300',
                'hover:shadow-lg dark:hover:shadow-primary/5',
              )}
            >
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                className="p-4 bg-primary/5 rounded-full mb-4 text-primary ring-1 ring-primary/10 group-hover:bg-primary/10 transition-colors"
              >
                <IconComponent className="w-8 h-8" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2 tracking-tight">{item.title}</h3>
              {item.subtitle && (
                <p className="text-sm text-muted-foreground mb-4 font-medium">{item.subtitle}</p>
              )}

              <div className="space-y-3 mt-auto text-sm w-full">
                {item.frequency && (
                  <div className="flex items-center justify-center gap-2 text-muted-foreground bg-secondary/30 py-1 px-3 rounded-full w-fit mx-auto">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.frequency}</span>
                  </div>
                )}
                {item.time && (
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary/60" />
                    <span>{item.time}</span>
                  </div>
                )}
                {item.location && (
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary/60" />
                    <span>{item.location}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
