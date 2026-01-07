import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import './assets/css/patterns.css'
import { CoverProvider } from './components/coverContext'

export const metadata: Metadata = {
  title: 'ThisCover 封面生成器',
  description: '免费、漂亮的封面生成器'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`antialiased`}>
        <CoverProvider>{children}</CoverProvider>
        {/* cloudflare analytics，不用请注释 */}
        {process.env.NODE_ENV === 'production' && (
          <Script
            defer
            src='https://static.cloudflareinsights.com/beacon.min.js'
            data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN}"}`}
          />
        )}
      </body>
    </html>
  )
}
