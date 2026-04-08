import { getAllContentFileSpecs } from './lesson-files.ts'
import { readAdvancedTopicMarkdown, readMainCourseMarkdown } from './lesson-files.ts'
import { buildProcessedLessonContent } from './lesson-markdown.ts'
import type { SearchEntry } from './lesson-search.ts'

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

function readEntryMarkdown(id: string, section: SearchEntry['section']): string {
  return section === 'main' ? readMainCourseMarkdown(id) : readAdvancedTopicMarkdown(id)
}

export function getSearchEntries(): SearchEntry[] {
  return getAllContentFileSpecs().map(({ contentPath: _contentPath, ...entry }) => ({
    ...entry,
    content: stripMarkdown(buildProcessedLessonContent(readEntryMarkdown(entry.id, entry.section))),
  }))
}
