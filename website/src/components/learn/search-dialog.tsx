'use client'

import { getHighlightParts, searchLessons } from '@/lib/lesson-search'
import type { LessonSearchEntry } from '@/lib/lesson-search'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowRight, FileText, Search, X } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface SearchDialogProps {
  searchEntries: LessonSearchEntry[]
}

function HighlightedText({
  text,
  query,
}: {
  text: string
  query: string
}) {
  return getHighlightParts(text, query).map((part, index) =>
    part.highlighted ? (
      <mark key={`${part.text}-${index}`} className="rounded bg-yellow-300/70 px-0.5 text-inherit">
        {part.text}
      </mark>
    ) : (
      <span key={`${part.text}-${index}`}>{part.text}</span>
    )
  )
}

export function SearchDialog({ searchEntries }: SearchDialogProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const results = useMemo(() => searchLessons(query, searchEntries), [query, searchEntries])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleQueryChange = (value: string) => {
    setQuery(value)
    setSelectedIndex(0)
  }

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          setSelectedIndex((current) => (current + 1) % Math.max(results.length, 1))
          break
        case 'ArrowUp':
          event.preventDefault()
          setSelectedIndex(
            (current) => (current - 1 + Math.max(results.length, 1)) % Math.max(results.length, 1)
          )
          break
        case 'Enter':
          if (results[selectedIndex]) {
            setOpen(false)
            window.location.href = `/learn/${results[selectedIndex].id}`
          }
          break
      }
    },
    [results, selectedIndex]
  )

  const handleClose = () => {
    setOpen(false)
    setQuery('')
    setSelectedIndex(0)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">搜索课程...</span>
          <kbd className="hidden h-5 items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-xs text-muted-foreground md:inline-flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 rounded-xl border border-border bg-background shadow-2xl"
          onKeyDown={handleKeyDown}
        >
          <Dialog.Title className="sr-only">搜索课程</Dialog.Title>
          <Dialog.Description className="sr-only">
            按课程标题、标签或正文关键词快速跳转到对应章节。
          </Dialog.Description>
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索课程、正文细节或标签..."
              value={query}
              onChange={(event) => handleQueryChange(event.target.value)}
              className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
            />
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-md p-1 transition-colors hover:bg-secondary"
                onClick={handleClose}
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </Dialog.Close>
          </div>

          <div className="max-h-80 overflow-y-auto p-2">
            {query && results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <Search className="mb-3 h-10 w-10 opacity-50" />
                <p className="text-sm">未找到匹配的课程</p>
                <p className="mt-1 text-xs">尝试其他关键词</p>
              </div>
            ) : results.length > 0 ? (
              <ul className="space-y-1">
                {results.map((result, index) => (
                  <li key={result.id}>
                    <Link
                      href={`/learn/${result.id}`}
                      onClick={handleClose}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                        index === selectedIndex
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-secondary'
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                          index === selectedIndex ? 'bg-primary-foreground/20' : 'bg-secondary'
                        }`}
                      >
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium">
                          第{result.number}课 ·{' '}
                          <HighlightedText text={result.title} query={query} />
                        </div>
                        <div
                          className={`truncate text-xs ${
                            index === selectedIndex
                              ? 'text-primary-foreground/70'
                              : 'text-muted-foreground'
                          }`}
                        >
                          <HighlightedText
                            text={
                              result.matchType === 'content' ? result.matchedText : result.subtitle
                            }
                            query={query}
                          />
                          {result.matchType === 'tag' && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs">
                              #
                              <HighlightedText text={result.matchedText} query={query} />
                            </span>
                          )}
                          {result.matchType === 'content' && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs">
                              正文命中
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight
                        className={`h-4 w-4 shrink-0 ${
                          index === selectedIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-6">
                <p className="mb-4 text-center text-xs text-muted-foreground">快速跳转</p>
                <ul className="space-y-1">
                  {searchEntries.slice(0, 5).map((lesson) => (
                    <li key={lesson.id}>
                      <Link
                        href={`/learn/${lesson.id}`}
                        onClick={handleClose}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-secondary text-xs font-medium">
                          {lesson.number}
                        </span>
                        <span className="truncate">{lesson.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5">↑</kbd>
                <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5">↓</kbd>
                <span>导航</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5">↵</kbd>
                <span>打开</span>
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5">esc</kbd>
              <span>关闭</span>
            </span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
