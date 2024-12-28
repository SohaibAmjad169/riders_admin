'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import { clearUser } from '@/utils/Redux/Slice/UserSlice'
import { useRouter } from 'next/navigation'

export default function AdminLayout() {
  const Router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const User = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const handleSignOut = () => {
    // Clear the user from Redux
    dispatch(clearUser())

    // Remove user data from localStorage
    localStorage.removeItem('user')

    // Optionally, you can redirect the user to a different page
    // router.push('/signin')
  }

  return (
    <header className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <Image
            src="/Logo-black.png"
            alt="Rider Revolution Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold">Rider Revolution</h1>
        </div>
        <div className=" flex items-center gap-5">
          {/* Navigation Links */}
          <nav className="flex space-x-6 items-center text-sm md:text-base mt-3 md:mt-0">
            <a href="/dashboard" className="hover:text-gray-300 transition">
              Bids
            </a>
            <a href="/listing" className="hover:text-gray-300 transition">
              Listing
            </a>
          </nav>

          {/* User Info and Sign Out/Login */}
          <div className="flex space-x-4 items-center mt-3 md:mt-0">
            {User.email ? (
              <div className="flex flex-col items-center space-x-4">
                <h1 className="text-sm md:text-lg">{User.name}</h1>
                <button
                  onClick={handleSignOut}
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition text-xs md:text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => Router.push('/signin')}
                className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition text-xs md:text-sm"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
