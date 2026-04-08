export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl items-center px-6 py-20">
      <section className="space-y-6">
        <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm text-sky-700">
          Course Website Bootstrap
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-slate-950">
            AI-Native Java Backend Bootcamp
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            独立课程网站正在搭建中。后续这里会接入课程首页、学习区、搜索和 Markdown
            课程阅读体验。
          </p>
        </div>
      </section>
    </main>
  )
}
