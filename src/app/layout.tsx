import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'VENDoRA — Every vendor. One market.',
  description: "Nigeria's first unified marketplace for small vendors, food sellers, event planners & corporate buyers.",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'VENDoRA',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0B0B0F',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#111116',
              color: '#F0F0F5',
              border: '1px solid #1E1E26',
              fontFamily: 'Syne, sans-serif',
              fontSize: '13px',
              borderRadius: '12px',
            },
            success: { iconTheme: { primary: '#00C882', secondary: '#111116' } },
            error:   { iconTheme: { primary: '#FF6B6B', secondary: '#111116' } },
          }}
        />
      </body>
    </html>
  )
}
