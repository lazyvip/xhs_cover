import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import './assets/css/patterns.css'
import { CoverProvider } from './components/coverContext'

export const metadata: Metadata = {
  title: 'LazyCover 懒人封面 - 程序员/自媒体必备的极简封面生成器 | LazySo',
  description: 'LazySo 旗下免费工具。一键生成技术博客、公众号、Notion 封面图。支持自定义背景、字体与图标，无需设计基础，纯前端生成。',
  keywords: ['懒人封面', 'LazyCover', 'LazySo', '封面生成器', 'Cover Generator', '免费设计', '公众号封面', '文章配图', '设计工具', '在线设计', '懒人笔记'],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: [{ url: '/favicon-180-precomposed.png', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/favicon-192.png'
      }
    ]
  }
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
