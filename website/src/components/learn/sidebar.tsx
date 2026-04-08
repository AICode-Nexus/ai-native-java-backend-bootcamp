'use client'

import { advancedTopics, mainCourses } from '@/lib/lessons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMobileNav } from './mobile-nav-context'

function getNavClass(isActive: boolean): string {
  return isActive
    ? 'bg-primary text-primary-foreground'
    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
}

function SidebarContent() {
  const pathname = usePathname()
  const { close } = useMobileNav()

  return (
    <nav className="space-y-1 p-4">
      <Link
        href="/learn"
        onClick={close}
        className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${getNavClass(
          pathname === '/learn'
        )}`}
      >
        主线课程总览
      </Link>
      <Link
        href="/advanced"
        onClick={close}
        className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${getNavClass(
          pathname === '/advanced'
        )}`}
      >
        进阶专题总览
      </Link>

      <div className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground md:hidden">
        导航
      </div>
      <Link
        href="/"
        onClick={close}
        className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
      >
        网站首页
      </Link>
      <a
        href="https://github.com/AICode-Nexus/ai-native-java-backend-bootcamp"
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
      >
        GitHub
      </a>

      <div className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        主线课程
      </div>

      {mainCourses.map((course) => {
        const isActive = pathname === course.href

        return (
          <Link
            key={course.id}
            href={course.href}
            onClick={close}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${getNavClass(
              isActive
            )}`}
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-bold ${
                isActive
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-secondary text-muted-foreground'
              }`}
            >
              {course.number}
            </span>
            <div className="min-w-0">
              <div className="truncate font-medium">{course.title}</div>
              <div className="truncate text-xs opacity-70">{course.subtitle}</div>
            </div>
          </Link>
        )
      })}

      <div className="px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        进阶专题
      </div>

      {advancedTopics.map((topic) => {
        const isActive = pathname === topic.href

        return (
          <Link
            key={topic.id}
            href={topic.href}
            onClick={close}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${getNavClass(
              isActive
            )}`}
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-bold ${
                isActive
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-secondary text-muted-foreground'
              }`}
            >
              专{topic.number}
            </span>
            <div className="min-w-0">
              <div className="truncate font-medium">{topic.title}</div>
              <div className="truncate text-xs opacity-70">{topic.subtitle}</div>
            </div>
          </Link>
        )
      })}
    </nav>
  )
}

export function Sidebar() {
  const { isOpen, close } = useMobileNav()

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 top-14 z-40 bg-black/50 md:hidden"
          onClick={close}
          onKeyDown={(event) => event.key === 'Escape' && close()}
        />
      )}

      <aside
        className={`fixed left-0 top-14 z-40 h-[calc(100vh-56px)] w-72 overflow-y-auto border-r border-border bg-background transition-transform duration-200 ease-in-out md:sticky md:top-16 md:z-0 md:h-[calc(100vh-64px)] md:translate-x-0 md:bg-secondary/30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } shrink-0`}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
