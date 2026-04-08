import { LessonContent } from '@/components/learn/lesson-content'
import { readAdvancedTopicMarkdown } from '@/lib/lesson-files'
import { advancedTopics } from '@/lib/lessons'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return advancedTopics.map((topic) => ({
    topicId: topic.id,
  }))
}

export default async function AdvancedTopicPage({
  params,
}: {
  params: Promise<{ topicId: string }>
}) {
  const { topicId } = await params
  const topic = advancedTopics.find((entry) => entry.id === topicId)
  if (!topic) {
    notFound()
  }

  const content = readAdvancedTopicMarkdown(topicId)
  const currentIndex = advancedTopics.findIndex((entry) => entry.id === topicId)
  const previousTopic = currentIndex > 0 ? advancedTopics[currentIndex - 1] : null
  const nextTopic =
    currentIndex < advancedTopics.length - 1 ? advancedTopics[currentIndex + 1] : null

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/advanced" className="transition-colors hover:text-primary">
            进阶专题
          </Link>
          <span>/</span>
          <span>专题 {topic.number}</span>
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">
          专题 {topic.number}：{topic.title}
        </h1>
        <p className="mb-4 text-lg text-muted-foreground">{topic.subtitle}</p>
        <div className="flex flex-wrap gap-2">
          {topic.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary">
              {tag}
            </span>
          ))}
          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
            {topic.duration}
          </span>
        </div>
      </div>

      {content ? (
        <LessonContent content={content} lessonDirName={topic.dirName} />
      ) : (
        <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground">
          <p className="mb-2 text-lg">专题内容加载中...</p>
          <p className="text-sm">请确认仓库根目录中的专题 Markdown 文件存在</p>
        </div>
      )}

      <div className="mt-16 flex justify-between border-t pt-8">
        {previousTopic ? (
          <Link href={previousTopic.href} className="group flex flex-col items-start">
            <span className="mb-1 text-xs text-muted-foreground">上一篇</span>
            <span className="text-xs font-medium transition-colors group-hover:text-primary md:text-sm">
              ← 专题 {previousTopic.number}：{previousTopic.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {nextTopic ? (
          <Link href={nextTopic.href} className="group flex flex-col items-end">
            <span className="mb-1 text-xs text-muted-foreground">下一篇</span>
            <span className="text-xs font-medium transition-colors group-hover:text-primary md:text-sm">
              专题 {nextTopic.number}：{nextTopic.title} →
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
