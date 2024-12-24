'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
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
      </div>
    </header>
  )
}
