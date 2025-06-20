import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  theme?: string | null
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, theme } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="GSC Logo"
      width={150}
      height={88}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('w-[150px] h-[88px]', className)}
      src={theme === 'dark' ? '/logo-white.png' : '/logo.png'}
    />
  )
}

export default Logo
