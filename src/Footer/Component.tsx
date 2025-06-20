import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/'
import { SubscribersForm } from './SubscribersForm'
import SocialLinks from './SocialLinks'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const {
    footerMotto = 'Gateway Salvation Church - A place where faith, hope, and love come together. Join our community in worship, fellowship, and service.',
    footerMenus,
    socialLinks,
  } = footerData

  const headerClass: string = 'text-xl md:text-2xl mb-2 font-semibold'

  return (
    <footer className="mt-auto border-t border-border bg-blue-950 dark:bg-card text-white">
      <div className="container py-12 lg:py-16 xl:py-20 gap-8 lg:gap-16 grid grid-cols-6 lg:grid-cols-12">
        <div className="flex flex-col gap-4 col-span-6 lg:col-span-5 items-center lg:items-start">
          <Link className="flex items-center" href="/">
            <Logo theme={'dark'} />
          </Link>
          <p className="text-wrap text-center lg:text-start font-normal leading-tight">
            {footerMotto}
          </p>
          <SocialLinks {...socialLinks} />
        </div>
        {footerMenus?.map((menu, index) => {
          return (
            <div
              key={index}
              className="flex flex-col gap-4 col-span-3 md:col-span-2 lg:col-span-2 items-center md:items-start"
            >
              {menu.title && <h3 className={headerClass}>{menu.title}</h3>}
              {menu.items?.map(({ link }, i) => {
                return (
                  <CMSLink className="text-white text-base" key={i} {...link} appearance={'link'} />
                )
              })}
            </div>
          )
        })}
        <div className="flex flex-col gap-4 col-span-6 md:col-span-2 lg:col-span-3 items-center md:items-start">
          <SubscribersForm headerClass={`${headerClass} text-center md:text-start`} />
          <div className="flex justify-start items-center">
            <ThemeSelector />
          </div>
        </div>
      </div>
      <div className="w-full bg-black/20 py-4 flex justify-center items center">
        <div className="container text-center">
          © {new Date().getFullYear()} Gateway Salvation Church, England. All Rights Reserved.
          Powered by{' '}
          <Link href={'https://christdev.com'} className="hover:underline font-semibold">
            Christdev
          </Link>
        </div>
      </div>
    </footer>
  )
}
