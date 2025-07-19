import "@/app/globals.css"
import {Providers} from "./providers"
import Navbar from "./components/navbar"
import Footer from "./components/footer"

export const metadata = {
  title: "TuneFund - Malaysian Music Crowdfunding",
  description: "A blockchain-powered crowdfunding platform for Malaysian musicians. Support local talent and fund amazing music projects.",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' }
    ],
    apple: [
      { url: '/icon.svg', sizes: '180x180', type: 'image/svg+xml' }
    ]
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1 w-full">
            <div className="min-h-screen pt-16">
              {children}
            </div>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
