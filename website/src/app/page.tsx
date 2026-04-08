import { advancedTopics, mainCourses } from '@/lib/lessons'
import {
  corePrinciples,
  courseStats,
  developerLifecycleMap,
  exerciseOverviewUrl,
  exerciseTemplateUrl,
  learningTracks,
  resourceLinks,
} from '@/lib/site-content'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
      <section className="mb-14 space-y-6">
        <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm text-sky-700">
          AI 辅助后端研发 Bootcamp
        </div>
        <div className="space-y-4">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            传统 Java 后端开发，如何把 AI 用进需求、设计、编码、测试与交付
          </h1>
          <p className="max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            这套课程不再主讲如何做一个 AI 产品，而是主讲后端工程师怎样把 AI 变成研发提效工具链。
            主线课程围绕研发生命周期展开，进阶专题单独保留 AI-Native 系统建设内容。每节正文都配有课后练习入口，
            练习统一要求保留结构化输入、人工判断和验证结果。
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/learn"
            className="inline-flex items-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            进入主线课程
          </Link>
          <Link
            href="/advanced"
            className="inline-flex items-center rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            查看进阶专题
          </Link>
          <a
            href={exerciseOverviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            查看练习总览
          </a>
        </div>

        <p className="text-sm text-muted-foreground">
          推荐学法：先读课程正文，再打开课后练习；如果要留痕或组织评审，可直接复用
          <a
            href={exerciseTemplateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 font-medium text-primary hover:underline"
          >
            通用提交模板
          </a>
          。
        </p>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {courseStats.map((item) => (
            <div key={item.label} className="rounded-xl border bg-background p-4">
              <div className="text-sm text-muted-foreground">{item.label}</div>
              <div className="mt-1 text-lg font-semibold">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14 rounded-2xl border bg-secondary/30 p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">学习路径</h2>
          <div className="text-sm text-muted-foreground">先主线，后进阶</div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {learningTracks.map((track) => (
            <Link
              key={track.title}
              href={track.href}
              className="rounded-xl border bg-background p-4 transition-all hover:border-primary hover:shadow-md"
            >
              <div className="font-semibold">{track.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{track.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-14 rounded-2xl border bg-secondary/30 p-6">
        <h2 className="mb-4 text-xl font-semibold">研发全生命周期提效地图</h2>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {developerLifecycleMap.map((item) => (
            <div key={item.stage} className="rounded-lg border bg-background p-4">
              <div className="mb-2 text-sm font-medium text-muted-foreground">{item.stage}</div>
              <div className="space-y-1">
                {item.actions.map((action) => (
                  <div key={action} className="text-sm font-medium">
                    {action}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">主线课程预览</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              按需求、设计、编码、测试、排障、发布和团队落地顺序推进，每节都配套可执行练习。
            </p>
          </div>
          <Link href="/learn" className="text-sm font-medium text-primary hover:underline">
            查看全部主线课程 →
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {mainCourses.slice(0, 6).map((course) => (
            <Link
              key={course.id}
              href={course.href}
              className="group flex gap-4 rounded-xl border p-4 transition-all hover:border-primary hover:shadow-md"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                {course.number}
              </span>
              <div className="min-w-0">
                <div className="font-semibold transition-colors group-hover:text-primary">
                  第 {course.number} 课：{course.title}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{course.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">进阶专题预览</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              完成主线后，再进入 AI-Native 系统建设视角。
            </p>
          </div>
          <Link href="/advanced" className="text-sm font-medium text-primary hover:underline">
            查看全部进阶专题 →
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {advancedTopics.map((topic) => (
            <Link
              key={topic.id}
              href={topic.href}
              className="rounded-xl border p-4 transition-all hover:border-primary hover:shadow-md"
            >
              <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                专题 {topic.number}
              </div>
              <div className="font-semibold">{topic.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{topic.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-14 rounded-2xl border bg-secondary/30 p-6">
        <h2 className="mb-4 text-xl font-semibold">五条核心原则</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {corePrinciples.map((item) => (
            <div key={item.title} className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                ✓
              </span>
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">资源入口</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {resourceLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border p-4 transition-all hover:border-primary hover:shadow-md"
            >
              <div className="font-medium">{item.label}</div>
              <div className="mt-1 text-sm text-muted-foreground">{item.description}</div>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
