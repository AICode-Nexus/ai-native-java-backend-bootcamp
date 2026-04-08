'use client'

import mermaid from 'mermaid'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import {
  type TocItem,
  buildProcessedLessonContent,
  extractTextContent,
  generateToc,
  slugifyHeading,
} from '@/lib/lesson-markdown'

let mermaidId = 0

function generateId(): string {
  mermaidId += 1
  return `mermaid-${mermaidId}`
}

function MermaidBlock({ code }: { code: string }) {
  const [svg, setSvg] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    })
  }, [])

  useEffect(() => {
    const renderDiagram = async () => {
      const id = generateId()

      try {
        const { svg: renderedSvg } = await mermaid.render(id, code.trim())
        setSvg(renderedSvg)
        setError('')
      } catch (renderError) {
        console.error('Mermaid render error:', renderError)
        setError(String(renderError))
      }
    }

    renderDiagram()
  }, [code])

  if (error) {
    return (
      <div className="my-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        <div className="mb-2 font-medium">Mermaid 图表渲染错误</div>
        <pre className="overflow-auto text-xs">{code}</pre>
      </div>
    )
  }

  return (
    <div
      className="my-3 flex justify-center overflow-x-auto rounded-lg border bg-white p-4"
      /* biome-ignore lint/security/noDangerouslySetInnerHtml: Mermaid renders trusted SVG from local lesson markdown. */
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

function TableOfContents({ toc }: { toc: TocItem[] }) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px' }
    )

    for (const item of toc) {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    }

    return () => observer.disconnect()
  }, [toc])

  if (toc.length === 0) {
    return null
  }

  return (
    <nav className="fixed right-8 top-24 hidden max-h-[calc(100vh-120px)] w-56 overflow-y-auto text-sm xl:block">
      <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        目录
      </div>
      <ul className="space-y-1">
        {toc
          .filter((item) => item.level <= 2)
          .map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block border-l-2 py-1 transition-colors ${
                  item.level === 1 ? 'pl-3' : 'pl-5'
                } ${
                  activeId === item.id
                    ? 'border-primary font-medium text-primary'
                    : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
                }`}
              >
                {item.text.length > 30 ? `${item.text.slice(0, 30)}...` : item.text}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  )
}

export function LessonContent({ content }: { content: string }) {
  const processedContent = buildProcessedLessonContent(content)
  const toc = generateToc(processedContent)
  let headingIndex = 0

  const getHeadingId = (
    level: number,
    children: React.ReactNode,
    fallbackText: string
  ): string => {
    const nextHeading = toc[headingIndex]

    if (
      nextHeading &&
      nextHeading.level === level &&
      nextHeading.text === fallbackText
    ) {
      headingIndex += 1
      return nextHeading.id
    }

    return slugifyHeading(fallbackText)
  }

  return (
    <div className="relative xl:pr-64">
      <TableOfContents toc={toc} />

      <article className="max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[[rehypeHighlight, { detect: true }]]}
          components={{
            h1: ({ children, ...props }) => {
              const text = extractTextContent(children)
              const id = getHeadingId(1, children, text)
              return (
                <h1
                  {...props}
                  id={id}
                  className="mb-6 mt-12 scroll-mt-[64px] border-b pb-3 text-2xl font-bold md:scroll-mt-[72px]"
                >
                  {children}
                </h1>
              )
            },
            h2: ({ children, ...props }) => {
              const text = extractTextContent(children)
              const id = getHeadingId(2, children, text)
              return (
                <h2
                  {...props}
                  id={id}
                  className="mb-4 mt-10 scroll-mt-[64px] border-b pb-2 text-xl font-semibold md:scroll-mt-[72px]"
                >
                  {children}
                </h2>
              )
            },
            h3: ({ children, ...props }) => {
              const text = extractTextContent(children)
              const id = getHeadingId(3, children, text)
              return (
                <h3
                  {...props}
                  id={id}
                  className="mb-3 mt-8 scroll-mt-[64px] text-lg font-semibold md:scroll-mt-[72px]"
                >
                  {children}
                </h3>
              )
            },
            p: ({ children, ...props }) => (
              <p className="mb-4 text-base leading-7 text-foreground/90" {...props}>
                {children}
              </p>
            ),
            code: ({ className, children, ...props }) => {
              const isBlock =
                className?.includes('language-') || className?.includes('hljs')

              if (isBlock) {
                const langMatch = className?.match(/language-(\w+)/)
                const lang = langMatch?.[1] || ''

                if (lang === 'mermaid') {
                  const codeContent = String(children).replace(/\n$/, '')
                  return <MermaidBlock code={codeContent} />
                }

                return (
                  <code className={className || ''} {...props}>
                    {children}
                  </code>
                )
              }

              return (
                <code
                  className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-slate-800"
                  {...props}
                >
                  {children}
                </code>
              )
            },
            pre: ({ children, ...props }) => {
              const codeElement = children as React.ReactElement<{
                className?: string
              }>
              const className = codeElement?.props?.className || ''
              const langMatch = className.match(/language-(\w+)/)
              const lang = langMatch?.[1] || ''

              if (lang === 'mermaid') {
                return <>{children}</>
              }

              return (
                <div className="group relative my-4">
                  {lang && (
                    <div className="absolute right-3 top-3 rounded bg-slate-700 px-2 py-0.5 text-xs text-slate-400 opacity-0 transition-opacity group-hover:opacity-100">
                      {lang}
                    </div>
                  )}
                  <pre
                    className="overflow-x-auto rounded-lg bg-[#0d1117] p-4 text-sm leading-6 text-[#e6edf3]"
                    {...props}
                  >
                    {children}
                  </pre>
                </div>
              )
            },
            table: ({ children, ...props }) => (
              <div className="my-6 overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-sm" {...props}>
                  {children}
                </table>
              </div>
            ),
            thead: ({ children, ...props }) => (
              <thead className="border-b border-slate-200 bg-slate-50" {...props}>
                {children}
              </thead>
            ),
            tbody: ({ children, ...props }) => (
              <tbody className="divide-y divide-slate-200" {...props}>
                {children}
              </tbody>
            ),
            tr: ({ children, ...props }) => (
              <tr className="transition-colors hover:bg-slate-50/50" {...props}>
                {children}
              </tr>
            ),
            th: ({ children, ...props }) => (
              <th
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                {...props}
              >
                {children}
              </th>
            ),
            td: ({ children, ...props }) => (
              <td className="px-4 py-3 text-slate-700" {...props}>
                {children}
              </td>
            ),
            blockquote: ({ children, ...props }) => (
              <blockquote
                className="my-4 rounded-r-lg border-l-4 border-primary/30 bg-primary/5 px-4 py-3 text-sm"
                {...props}
              >
                {children}
              </blockquote>
            ),
            ul: ({ children, ...props }) => (
              <ul
                className="mb-4 list-outside list-disc space-y-1 pl-6 text-foreground/90"
                {...props}
              >
                {children}
              </ul>
            ),
            ol: ({ children, ...props }) => (
              <ol
                className="mb-4 list-outside list-decimal space-y-1 pl-6 text-foreground/90"
                {...props}
              >
                {children}
              </ol>
            ),
            li: ({ children, ...props }) => (
              <li className="pl-1 [&>ol]:mt-2 [&>ul]:mt-2" {...props}>
                {children}
              </li>
            ),
            hr: () => <hr className="my-8 border-border" />,
            strong: ({ children, ...props }) => (
              <strong className="font-semibold text-foreground" {...props}>
                {children}
              </strong>
            ),
            a: ({ children, href, ...props }) => {
              const isAnchor = href?.startsWith('#')
              return (
                <a
                  href={href}
                  {...(!isAnchor && {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  })}
                  className="text-primary hover:underline"
                  {...props}
                >
                  {children}
                </a>
              )
            },
          }}
        >
          {processedContent}
        </ReactMarkdown>
      </article>
    </div>
  )
}
