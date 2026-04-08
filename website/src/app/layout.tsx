import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI 辅助后端研发 Bootcamp',
  description: '面向 Java / Spring Boot 工程师的 AI 研发提效课程网站',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
