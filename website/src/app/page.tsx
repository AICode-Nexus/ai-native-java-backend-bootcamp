import { lessons } from '@/lib/lessons'
import { backendSystemMap, corePrinciples, courseStats, resourceLinks } from '@/lib/site-content'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
      <section className="mb-14 space-y-6">
        <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm text-sky-700">
          AI-Native Java Backend Bootcamp
        </div>
        <div className="space-y-4">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            不是教 Java 怎么调一个模型接口，而是教如何构建可上线的 AI-Native 后端系统
          </h1>
          <p className="max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            课程围绕企业知识助手主线，覆盖模型接入、聊天接口、Prompt
            组织、知识入库、RAG、检索协同、Tool Calling、Workflow 和治理生产化，帮助 AI
            应用开发者建立完整的后端系统观。
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/learn"
            className="inline-flex items-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            进入学习区
          </Link>
          <a
            href="https://github.com/AICode-Nexus/ai-native-java-backend-bootcamp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            查看 GitHub
          </a>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {courseStats.map((item) => (
            <div key={item.label} className="rounded-xl border bg-background p-4">
              <div className="text-sm text-muted-foreground">{item.label}</div>
              <div className="mt-1 text-lg font-semibold">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14 rounded-2xl border bg-secondary/30 p-6">
        <h2 className="mb-4 text-xl font-semibold">后端系统全景图</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {backendSystemMap.map((item) => (
            <div key={item.layer} className="rounded-lg border bg-background p-4">
              <div className="mb-2 text-sm font-medium text-muted-foreground">{item.layer}</div>
              <div className="space-y-1">
                {item.techs.map((tech) => (
                  <div key={tech} className="text-sm font-medium">
                    {tech}
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
            <h2 className="text-2xl font-semibold">课程总览</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              从认知重构到生产化收束，按一条主链逐课推进。
            </p>
          </div>
          <Link href="/learn" className="text-sm font-medium text-primary hover:underline">
            查看全部课程 →
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {lessons.slice(0, 6).map((lesson) => (
            <Link
              key={lesson.id}
              href={`/learn/${lesson.id}`}
              className="group flex gap-4 rounded-xl border p-4 transition-all hover:border-primary hover:shadow-md"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                {lesson.number}
              </span>
              <div className="min-w-0">
                <div className="font-semibold transition-colors group-hover:text-primary">
                  第 {lesson.number} 课：{lesson.title}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{lesson.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-14 rounded-2xl border bg-secondary/30 p-6">
        <h2 className="mb-4 text-xl font-semibold">五大核心原则</h2>
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
