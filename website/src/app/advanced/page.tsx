import { advancedTopics } from '@/lib/lessons'
import Link from 'next/link'

export default function AdvancedPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">
      <div className="mb-12">
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">进阶专题</h1>
        <p className="mb-6 text-base text-muted-foreground md:text-lg">
          这里保留原有 AI-Native 系统建设相关内容。建议先完成主线课程，再进入模型接入、 RAG、Tools /
          Workflow / Agent 边界，以及 AI 系统治理与生产化。
        </p>
      </div>

      <div className="space-y-3">
        {advancedTopics.map((topic) => (
          <Link
            key={topic.id}
            href={topic.href}
            className="group flex items-start gap-4 rounded-xl border p-5 transition-all hover:border-primary hover:shadow-md"
          >
            <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-base font-bold text-primary-foreground">
              专{topic.number}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-semibold transition-colors group-hover:text-primary">
                  {topic.title}
                </h2>
                <span className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                  {topic.duration}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{topic.subtitle}</p>
              <p className="mt-2 text-sm text-muted-foreground">{topic.summary}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {topic.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
