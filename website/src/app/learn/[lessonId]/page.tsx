import { LessonContent } from '@/components/learn/lesson-content'
import { readLessonMarkdown } from '@/lib/lesson-files'
import { lessons } from '@/lib/lessons'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return lessons.map((lesson) => ({
    lessonId: lesson.id,
  }))
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>
}) {
  const { lessonId } = await params
  const lesson = lessons.find((entry) => entry.id === lessonId)
  if (!lesson) {
    notFound()
  }

  const content = readLessonMarkdown(lessonId)
  const currentIndex = lessons.findIndex((entry) => entry.id === lessonId)
  const previousLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/learn" className="transition-colors hover:text-primary">
            课程
          </Link>
          <span>/</span>
          <span>第 {lesson.number} 课</span>
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">
          第 {lesson.number} 课：{lesson.title}
        </h1>
        <p className="mb-4 text-lg text-muted-foreground">{lesson.subtitle}</p>
        <div className="flex flex-wrap gap-2">
          {lesson.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary">
              {tag}
            </span>
          ))}
          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
            {lesson.duration}
          </span>
        </div>
      </div>

      {content ? (
        <LessonContent content={content} />
      ) : (
        <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground">
          <p className="mb-2 text-lg">课程内容加载中...</p>
          <p className="text-sm">请确认仓库根目录中的课程 Markdown 文件存在</p>
        </div>
      )}

      <div className="mt-16 flex justify-between border-t pt-8">
        {previousLesson ? (
          <Link href={`/learn/${previousLesson.id}`} className="group flex flex-col items-start">
            <span className="mb-1 text-xs text-muted-foreground">上一课</span>
            <span className="text-xs font-medium transition-colors group-hover:text-primary md:text-sm">
              ← 第 {previousLesson.number} 课：{previousLesson.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {nextLesson ? (
          <Link href={`/learn/${nextLesson.id}`} className="group flex flex-col items-end">
            <span className="mb-1 text-xs text-muted-foreground">下一课</span>
            <span className="text-xs font-medium transition-colors group-hover:text-primary md:text-sm">
              第 {nextLesson.number} 课：{nextLesson.title} →
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
