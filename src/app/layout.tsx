import type { Metadata } from 'next'
import Providers from './providers'
import '../index.css'

export const metadata: Metadata = {
  title: 'RS React App',
  description: 'Migrated Vite → Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}