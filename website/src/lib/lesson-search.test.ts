import assert from 'node:assert/strict'
import test from 'node:test'
import { getHighlightParts, searchLessons } from './lesson-search.ts'
import { getLessonSearchEntries } from './lesson-search.server.ts'

test('searchLessons matches lesson content beyond metadata', () => {
  const results = searchLessons('allowlist', getLessonSearchEntries())

  assert.equal(results.length > 0, true)
  assert.equal(results[0]?.id, 'lesson-7')
})

test('getHighlightParts highlights case-insensitive matches', () => {
  assert.deepEqual(
    getHighlightParts('Tool allowlist protects execution', 'ALLOWLIST'),
    [
      { text: 'Tool ', highlighted: false },
      { text: 'allowlist', highlighted: true },
      { text: ' protects execution', highlighted: false },
    ]
  )
})
