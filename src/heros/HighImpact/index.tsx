'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ highImpactFields }) => {
  const { setHeaderTheme } = useHeaderTheme()

  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  if (!highImpactFields || highImpactFields?.length < 1) {
    return null
  }

  const slides = highImpactFields

  return (
    <div className="relative text-white overflow-hidden  -mt-[10.4rem]" data-theme="dark">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current
          swiper.navigation.init()
          swiper.navigation.update()
        }}
        loop={true}
        slidesPerView={1}
        className="min-h-[80vh] relative"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[90vh]">
              {slide.media && typeof slide.media === 'object' && (
                <Media
                  fill
                  imgClassName="z-10 object-cover object-top"
                  priority
                  resource={slide.media}
                />
              )}
              <div className="container z-30 flex items-end justify-center absolute inset-0">
                <div className="max-w-[56.5rem] md:text-center pb-8 md:pb-16">
                  {slide.richText && (
                    <RichText className="mb-6" data={slide.richText} enableGutter={false} />
                  )}
                  {Array.isArray(slide.links) && slide.links.length > 0 && (
                    <ul className="flex md:justify-center gap-4">
                      {slide.links.map(({ link }, i) => (
                        <li key={i}>
                          <CMSLink {...link} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="absolute top-0 left-0 right-0 h-[15.4rem] bg-gradient-to-b from-black via-black/70 to-black/0 z-20"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 md:h-1/3 bg-gradient-to-b from-black/0 via-black/80 to-black z-20"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {slides.length > 1 && (
        <>
          <button
            ref={prevRef}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/60 rounded-full p-2 shadow-md text-white hover:bg-white/20 transition-colors z-20"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            ref={nextRef}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/60 rounded-full p-2 shadow-md text-white hover:bg-white/20 transition-colors z-20"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  )
}
