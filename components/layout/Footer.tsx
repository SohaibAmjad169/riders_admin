import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Rider Revolution. All rights
            reserved.
          </p>
        </div>
        {/* Social Links
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="#facebook"
            className="text-white hover:text-yellow-300 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 5.021 3.676 9.165 8.438 9.878v-6.985h-2.54v-2.893h2.54V9.718c0-2.513 1.492-3.893 3.774-3.893 1.093 0 2.235.195 2.235.195v2.454h-1.257c-1.241 0-1.625.77-1.625 1.558v1.873h2.773l-.443 2.893h-2.33v6.985C18.324 21.165 22 17.021 22 12z" />
            </svg>
          </a>
          <a
            href="#twitter"
            className="text-white hover:text-yellow-300 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.723 9.864 9.864 0 0 1-3.127 1.195 4.924 4.924 0 0 0-8.388 4.482A13.978 13.978 0 0 1 1.671 3.15a4.926 4.926 0 0 0 1.523 6.574 4.902 4.902 0 0 1-2.23-.616v.062a4.926 4.926 0 0 0 3.946 4.827 4.902 4.902 0 0 1-2.224.084 4.927 4.927 0 0 0 4.6 3.417A9.867 9.867 0 0 1 0 19.54a13.935 13.935 0 0 0 7.548 2.212c9.056 0 14.01-7.512 14.01-14.01 0-.213-.005-.425-.014-.637A10.017 10.017 0 0 0 24 4.557z" />
            </svg>
          </a>
          <a
            href="#linkedin"
            className="text-white hover:text-yellow-300 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zM8.334 19.675H5.671v-8.369h2.663v8.369zm-1.317-9.594c-.885 0-1.602-.719-1.602-1.602 0-.883.717-1.602 1.602-1.602.883 0 1.602.719 1.602 1.602 0 .883-.719 1.602-1.602 1.602zm12.654 9.594h-2.663v-4.548c0-1.084-.02-2.479-1.511-2.479-1.512 0-1.743 1.183-1.743 2.404v4.623h-2.663v-8.369h2.56v1.144h.037c.358-.681 1.233-1.4 2.537-1.4 2.713 0 3.213 1.785 3.213 4.105v4.52z" />
            </svg>
          </a>
        </div> */}
      </div>
    </footer>
  )
}

export default Footer
