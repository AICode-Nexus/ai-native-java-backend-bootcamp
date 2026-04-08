import type { LearningEntry } from './lessons.ts'

export type SearchEntry = LearningEntry & {
  content: string
}

export type SearchResult = LearningEntry & {
  matchType: 'title' | 'subtitle' | 'tag' | 'content'
  matchedText: string
}

export interface HighlightPart {
  text: string
  highlighted: boolean
}

function buildContentExcerpt(content: string, query: string): string {
  const normalizedContent = content.replace(/\s+/g, ' ').trim()
  const lowerContent = normalizedContent.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const matchIndex = lowerContent.indexOf(lowerQuery)

  if (matchIndex === -1) {
    return normalizedContent.slice(0, 120)
  }

  const excerptStart = Math.max(0, matchIndex - 36)
  const excerptEnd = Math.min(normalizedContent.length, matchIndex + query.length + 48)
  const prefix = excerptStart > 0 ? '...' : ''
  const suffix = excerptEnd < normalizedContent.length ? '...' : ''

  return `${prefix}${normalizedContent.slice(excerptStart, excerptEnd)}${suffix}`
}

export function getHighlightParts(text: string, query: string): HighlightPart[] {
  const normalizedQuery = query.trim()

  if (!text || !normalizedQuery) {
    return [{ text, highlighted: false }]
  }

  const lowerText = text.toLowerCase()
  const lowerQuery = normalizedQuery.toLowerCase()
  const parts: HighlightPart[] = []
  let startIndex = 0

  while (startIndex < text.length) {
    const matchIndex = lowerText.indexOf(lowerQuery, startIndex)

    if (matchIndex === -1) {
      const remainingText = text.slice(startIndex)
      if (remainingText) {
        parts.push({ text: remainingText, highlighted: false })
      }
      break
    }

    if (matchIndex > startIndex) {
      parts.push({
        text: text.slice(startIndex, matchIndex),
        highlighted: false,
      })
    }

    parts.push({
      text: text.slice(matchIndex, matchIndex + normalizedQuery.length),
      highlighted: true,
    })

    startIndex = matchIndex + normalizedQuery.length
  }

  return parts
}

export function searchContent(query: string, entries: SearchEntry[]): SearchResult[] {
  if (!query.trim()) {
    return []
  }

  const lowerQuery = query.toLowerCase()
  const results: SearchResult[] = []

  for (const entry of entries) {
    if (entry.title.toLowerCase().includes(lowerQuery)) {
      results.push({ ...entry, matchType: 'title', matchedText: entry.title })
      continue
    }

    if (entry.subtitle.toLowerCase().includes(lowerQuery)) {
      results.push({
        ...entry,
        matchType: 'subtitle',
        matchedText: entry.subtitle,
      })
      continue
    }

    const matchedTag = entry.tags.find((tag) => tag.toLowerCase().includes(lowerQuery))
    if (matchedTag) {
      results.push({ ...entry, matchType: 'tag', matchedText: matchedTag })
      continue
    }

    if (entry.content.toLowerCase().includes(lowerQuery)) {
      results.push({
        ...entry,
        matchType: 'content',
        matchedText: buildContentExcerpt(entry.content, query),
      })
    }
  }

  return results
}
