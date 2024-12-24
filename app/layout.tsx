import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/layout/Footer'
import AdminLayout from '@/components/layout/Header'
import ReduxLayout from '@/components/layout/ReduxLayout'
export const metadata: Metadata = {
  title: 'admin_panel',
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
            <AdminLayout />
            <main className="flex-1 min-h-screen overflow-y-auto bg-gray-100 ">
              <ReduxLayout> {children}</ReduxLayout>
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
