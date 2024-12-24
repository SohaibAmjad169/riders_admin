'use client'
import Store from '@/utils/Redux/Store/Store'
import React from 'react'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import ConditionalLayout from './ConditionalLayout'

const ReduxLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={Store}>
      <ConditionalLayout>{children}</ConditionalLayout>
      <Toaster />
    </Provider>
  )
}

export default ReduxLayout
