'use client'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'
import SignIn from '@/app/signin/page'

const ConditionalLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsClient(true)
  }, [])
  const authPages = ['/login', '/signup', '/reset', '/otp']
  const isAuthPage = authPages.includes(pathname)
  if (!isClient) {
    return (
      <div className=" min-h-screen justify-center items-center flex">
        h1
        <h1>Loading....</h1>
      </div>
    ) // Show loading state
  }
  return user.email ? (
    <div className="flex bg-white min-h-screen w-[100vw]">
      <div className="flex-1">{!isAuthPage ? children : <SignIn />}</div>
    </div>
  ) : (
    <div>{isAuthPage ? children : <SignIn />}</div>
  )
}
export default ConditionalLayout
