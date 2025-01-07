'use client'

import { useState } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/utils/Redux/Store/Store';
import { clearUser } from '@/utils/Redux/Slice/UserSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout() {
  const Router = useRouter();
  const User = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = () => {
    dispatch(clearUser());
    localStorage.removeItem('user');
    setDropdownOpen(false);
  };

  const getInitial = () => {
    if (User.name) return User.name.charAt(0).toUpperCase();
    return '?';
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <Image
            src="/Logo-black.png"
            alt="Rider Revolution Logo"
            width={50}
            height={50}
            className="rounded-full border border-white"
          />
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-white">
            Rider Revolution
          </h1>
        </div>

        {/* Navigation & User Actions */}
        <div className="flex items-center gap-6">
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6 text-sm md:text-base">
            <Link
              href="/dashboard"
              className="hover:text-yellow-300 transition font-medium"
            >
              Bids
            </Link>
            <Link
              href="/listing"
              className="hover:text-yellow-300 transition font-medium"
            >
              Listing
            </Link>
            <Link
              href="/allorders"
              className="hover:text-yellow-300 transition font-medium"
            >
              All Orders
            </Link>
          </nav>

          {/* User Dropdown */}
          {User.email ? (
            <div className="relative">
              <button
                className="bg-white text-indigo-600 rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg hover:bg-gray-200 transition"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                {getInitial()}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md text-gray-800">
                  <div className="p-4 border-b">
                    <p className="font-semibold text-sm">Hello, {User.name}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition text-sm text-red-500 font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => Router.push('/signin')}
              className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition text-xs md:text-sm"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-blue-700 px-4 py-2">
        <nav className="flex flex-col space-y-3 text-white text-sm">
          <a
            href="/dashboard"
            className="hover:text-yellow-300 transition font-medium"
          >
            Bids
          </a>
          <a
            href="/listing"
            className="hover:text-yellow-300 transition font-medium"
          >
            Listing
          </a>
          <a
            href="/allorders"
            className="hover:text-yellow-300 transition font-medium"
          >
            All Orders
          </a>
        </nav>
      </div>
    </header>
  );
}
