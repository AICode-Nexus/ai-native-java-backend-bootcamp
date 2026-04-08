import { buildProcessedLessonContent } from './lesson-markdown.ts'
import { getLessonFileSpecs, readLessonMarkdown } from './lesson-files.ts'
import type { LessonSearchEntry } from './lesson-search.ts'

function stripMarkdown(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/[*_~]/g, ' ')
    .replace(/\|/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function getLessonSearchEntries(): LessonSearchEntry[] {
  return getLessonFileSpecs().map(({ contentPath: _contentPath, ...lesson }) => ({
    ...lesson,
    content: stripMarkdown(buildProcessedLessonContent(readLessonMarkdown(lesson.id))),
  }))
}
