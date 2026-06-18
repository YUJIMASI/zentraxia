import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zentráxia — Explore o Universo',
  description: 'Uma viagem interactiva pelo Sistema Solar.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}