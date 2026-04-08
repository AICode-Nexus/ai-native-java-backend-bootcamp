import { mainCourses } from '@/lib/lessons'
import { corePrinciples, courseStats, developerLifecycleMap } from '@/lib/site-content'
import Link from 'next/link'

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">
      <div className="mb-12">
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">主线课程</h1>
        <p className="mb-6 text-base text-muted-foreground md:text-lg">
          围绕传统后端研发全生命周期，讲清 AI 在需求、设计、编码、测试、排障、发布和
          团队落地中的正确位置。
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground md:gap-6">
          {courseStats.map((item) => (
            <span key={item.label}>
              {item.label} · {item.value}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-12 rounded-xl border bg-secondary/30 p-6">
        <h2 className="mb-4 font-semibold">生命周期地图</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {developerLifecycleMap.map((item) => (
            <div key={item.stage} className="rounded-lg border bg-background p-3">
              <div className="mb-1 text-xs font-medium text-muted-foreground">{item.stage}</div>
              {item.actions.map((action) => (
                <div key={action} className="text-sm font-medium">
                  {action}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <h2 className="mb-6 text-2xl font-semibold">课程目录</h2>
      <div className="space-y-3">
        {mainCourses.map((course) => (
          <Link
            key={course.id}
            href={course.href}
            className="group flex items-center gap-3 rounded-xl border p-4 transition-all hover:border-primary hover:shadow-md md:gap-4 md:p-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-base font-bold text-primary-foreground md:h-12 md:w-12 md:text-lg">
              {course.number}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold transition-colors group-hover:text-primary md:text-base">
                  第 {course.number} 课：{course.title}
                </h3>
                <span className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                  {course.duration}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{course.subtitle}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {course.tags.map((tag) => (
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
        <h2 className="mb-4 font-semibold">学习原则</h2>
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
