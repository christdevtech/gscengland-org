'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useTheme } from '@/providers/Theme'
import React, { useEffect } from 'react'

const index = () => {
  const { theme } = useTheme()
  const { setHeaderTheme } = useHeaderTheme()
  useEffect(() => {
    setHeaderTheme(theme === 'dark' ? 'dark' : 'light')
  }, [setHeaderTheme, theme])
  return <div className="h-0"></div>
}

export default index
