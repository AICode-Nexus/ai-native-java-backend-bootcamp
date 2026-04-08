import { LessonContent } from '@/components/learn/lesson-content'
import { readMainCourseMarkdown } from '@/lib/lesson-files'
import { mainCourses } from '@/lib/lessons'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return mainCourses.map((course) => ({
    lessonId: course.id,
  }))
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>
}) {
  const { lessonId } = await params
  const course = mainCourses.find((entry) => entry.id === lessonId)
  if (!course) {
    notFound()
  }

  const content = readMainCourseMarkdown(lessonId)
  const currentIndex = mainCourses.findIndex((entry) => entry.id === lessonId)
  const previousCourse = currentIndex > 0 ? mainCourses[currentIndex - 1] : null
  const nextCourse = currentIndex < mainCourses.length - 1 ? mainCourses[currentIndex + 1] : null

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/learn" className="transition-colors hover:text-primary">
            主线课程
          </Link>
          <span>/</span>
          <span>第 {course.number} 课</span>
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">
          第 {course.number} 课：{course.title}
        </h1>
        <p className="mb-4 text-lg text-muted-foreground">{course.subtitle}</p>
        <div className="flex flex-wrap gap-2">
          {course.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary">
              {tag}
            </span>
          ))}
          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
            {course.duration}
          </span>
        </div>
      </div>

      {content ? (
        <LessonContent content={content} lessonDirName={course.dirName} />
      ) : (
        <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground">
          <p className="mb-2 text-lg">课程内容加载中...</p>
          <p className="text-sm">请确认仓库根目录中的课程 Markdown 文件存在</p>
        </div>
      )}

      <div className="mt-16 flex justify-between border-t pt-8">
        {previousCourse ? (
          <Link href={previousCourse.href} className="group flex flex-col items-start">
            <span className="mb-1 text-xs text-muted-foreground">上一课</span>
            <span className="text-xs font-medium transition-colors group-hover:text-primary md:text-sm">
              ← 第 {previousCourse.number} 课：{previousCourse.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {nextCourse ? (
          <Link href={nextCourse.href} className="group flex flex-col items-end">
            <span className="mb-1 text-xs text-muted-foreground">下一课</span>
            <span className="text-xs font-medium transition-colors group-hover:text-primary md:text-sm">
              第 {nextCourse.number} 课：{nextCourse.title} →
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
