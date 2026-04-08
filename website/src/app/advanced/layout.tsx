import { Header } from '@/components/learn/header'
import { MobileNavProvider } from '@/components/learn/mobile-nav-context'
import { Sidebar } from '@/components/learn/sidebar'
import { getSearchEntries } from '@/lib/lesson-search.server'

export default function AdvancedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const searchEntries = getSearchEntries()

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
