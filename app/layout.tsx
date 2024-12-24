import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'GLOBAL GRADS CRM',
  description: 'ADMIN ONLY',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <div className=" flex flex-col">
          <div className="flex flex-col min-h-screen">
            {/* <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:top-0 md:left-0 md:h-full bg-slate-800 text-white">
              <Sidebar />
            </div> */}
            {/* <div className="flex-1 flex flex-col md:ml-64"> */}
            {/* <MobileSideBar /> */}
            <main className="flex-1 min-h-screen overflow-y-auto bg-gray-100 ">
              {children}
            </main>
            {/* </div> */}
          </div>
        </div>
      </body>
    </html>
  )
}
