import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'
import Link from 'next/link'
import { Button } from '@payloadcms/ui'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to your GSC admin dashboard!</h4>
      </Banner>
      {/* Here&apos;s what to do next:
      <ul className={`${baseClass}__instructions`}>
        <li>
          Use this link to <SeedButton />, to see what the website looks like at the start.
        </li>
      </ul> */}
      <h3>Quick Links</h3>
      <div className={`${baseClass}__buttons`}>
        <Link href={'/'} target="_blank">
          <Button>Home Page</Button>
        </Link>
        <Link href={'/posts'} target="_blank">
          <Button>News Articles</Button>
        </Link>
      </div>
    </div>
  )
}

export default BeforeDashboard
