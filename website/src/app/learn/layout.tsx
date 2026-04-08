import { Header } from '@/components/learn/header'
import { MobileNavProvider } from '@/components/learn/mobile-nav-context'
import { Sidebar } from '@/components/learn/sidebar'
import { getLessonSearchEntries } from '@/lib/lesson-search.server'

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const searchEntries = getLessonSearchEntries()

  return (
    <MobileNavProvider>
      <div className="min-h-screen">
        <Header searchEntries={searchEntries} />
        <div className="flex">
          <Sidebar />
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </MobileNavProvider>
  )
}
