import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-purple-500 text-white">
      <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Left Section */}
        <div>
          <p className="text-sm md:text-base font-light">
            &copy; {new Date().getFullYear()} Rider Revolution. All rights
            reserved.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex space-x-4">
          <a
            href="#"
            className="text-white hover:text-gray-200 transition text-sm md:text-base"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-white hover:text-gray-200 transition text-sm md:text-base"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-white hover:text-gray-200 transition text-sm md:text-base"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
