import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/lib/theme'
import { CartProvider } from '@/lib/cart'
import Navbar from '@/components/Navbar'
import AnnouncementBar from '@/components/AnnouncementBar'
import Toast from '@/components/Toast'

export const metadata: Metadata = {
  title: "Men'z Kingdom — Give Great Shoes a Second Throne",
  description: "Karachi's premier online destination for premium men's footwear.",
  openGraph: {
    title: "Men'z Kingdom",
    description: "Give Great Shoes a Second Throne",
    images: ['/logo.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
        <ThemeProvider>
          <CartProvider>
            <AnnouncementBar />
            <Navbar />
            <main>{children}</main>
            <Toast />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
