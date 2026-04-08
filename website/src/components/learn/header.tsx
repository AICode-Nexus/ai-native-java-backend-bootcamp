'use client'

import type { SearchEntry } from '@/lib/lesson-search'
import Link from 'next/link'
import { useMobileNav } from './mobile-nav-context'
import { SearchDialog } from './search-dialog'

interface HeaderProps {
  searchEntries: SearchEntry[]
}

export function Header({ searchEntries }: HeaderProps) {
  const { isOpen, toggle } = useMobileNav()

  return (
    <header className="sticky top-0 z-50 h-14 border-b border-border bg-background/95 backdrop-blur md:h-16">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            className="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-secondary md:hidden"
            aria-label={isOpen ? '关闭菜单' : '打开菜单'}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="text-foreground"
              aria-hidden="true"
            >
              <title>{isOpen ? '关闭菜单' : '打开菜单'}</title>
              {isOpen ? (
                <>
                  <line
                    x1="4"
                    y1="4"
                    x2="14"
                    y2="14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="14"
                    y1="4"
                    x2="4"
                    y2="14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </>
              ) : (
                <>
                  <line
                    x1="3"
                    y1="5"
                    x2="15"
                    y2="5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="3"
                    y1="9"
                    x2="15"
                    y2="9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="3"
                    y1="13"
                    x2="15"
                    y2="13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </>
              )}
            </svg>
          </button>

          <Link href="/learn" className="flex items-center gap-2 md:gap-3">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
              role="img"
              aria-labelledby="site-logo-title"
            >
              <title id="site-logo-title">AI 辅助后端研发 Bootcamp 标志</title>
              <defs>
                <linearGradient id="backend-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#38bdf8', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <rect x="4" y="6" width="24" height="5" rx="2.5" fill="url(#backend-grad)" />
              <rect x="4" y="14" width="24" height="5" rx="2.5" fill="url(#backend-grad)" />
              <rect x="4" y="22" width="16" height="5" rx="2.5" fill="url(#backend-grad)" />
            </svg>
            <div>
              <div className="text-sm font-semibold">AI 辅助后端研发 Bootcamp</div>
              <div className="hidden text-xs text-muted-foreground sm:block">
                主线课程 / 进阶专题
              </div>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <SearchDialog searchEntries={searchEntries} />

          <nav className="hidden items-center gap-4 md:flex">
            <Link
              href="/"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              网站首页
            </Link>
            <Link
              href="/learn"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              主线课程
            </Link>
            <Link
              href="/advanced"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              进阶专题
            </Link>
            <a
              href="https://github.com/AICode-Nexus/ai-native-java-backend-bootcamp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
