import { lessons } from '@/lib/lessons'
import { backendSystemMap, corePrinciples, courseStats } from '@/lib/site-content'
import Link from 'next/link'

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">
      <div className="mb-12">
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          AI-Native Java Backend Bootcamp
        </h1>
        <p className="mb-6 text-base text-muted-foreground md:text-lg">
          不是教“Java 如何调用一个模型接口”，而是教“如何用 Java / Spring Boot
          构建可上线、可治理、可演进的 AI-Native 后端系统”。
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground md:gap-6">
          {courseStats.map((item) => (
            <span key={item.label}>{item.value}</span>
          ))}
        </div>
      </div>

      <div className="mb-12 rounded-xl border bg-secondary/30 p-6">
        <h2 className="mb-4 font-semibold">后端系统全景图</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {backendSystemMap.map((item) => (
            <div key={item.layer} className="rounded-lg border bg-background p-3">
              <div className="mb-1 text-xs font-medium text-muted-foreground">{item.layer}</div>
              {item.techs.map((tech) => (
                <div key={tech} className="text-sm font-medium">
                  {tech}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <h2 className="mb-6 text-2xl font-semibold">课程目录</h2>
      <div className="space-y-3">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/${lesson.id}`}
            className="group flex items-center gap-3 rounded-xl border p-4 transition-all hover:border-primary hover:shadow-md md:gap-4 md:p-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-base font-bold text-primary-foreground md:h-12 md:w-12 md:text-lg">
              {lesson.number}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold transition-colors group-hover:text-primary md:text-base">
                  第 {lesson.number} 课：{lesson.title}
                </h3>
                <span className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                  {lesson.duration}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{lesson.subtitle}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {lesson.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <span className="hidden text-muted-foreground transition-colors group-hover:text-primary sm:inline">
              →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-xl border bg-secondary/30 p-6">
        <h2 className="mb-4 font-semibold">五大核心原则</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {corePrinciples.map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                ✓
              </span>
              <div>
                <div className="text-sm font-medium">{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
