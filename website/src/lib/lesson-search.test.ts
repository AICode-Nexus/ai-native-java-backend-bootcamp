import assert from 'node:assert/strict'
import test from 'node:test'
import { getSearchEntries } from './lesson-search.server.ts'
import { getHighlightParts, searchContent } from './lesson-search.ts'

test('searchContent matches both main courses and advanced topics', () => {
  const results = searchContent('RAG', getSearchEntries())

  assert.equal(results.length > 0, true)
  assert.equal(
    results.some((result) => result.section === 'advanced'),
    true
  )
  assert.equal(
    results.some((result) => result.id === 'advanced-rag-enterprise-knowledge'),
    true
  )
})

test('getHighlightParts highlights case-insensitive matches', () => {
  assert.deepEqual(getHighlightParts('Tool allowlist protects execution', 'ALLOWLIST'), [
    { text: 'Tool ', highlighted: false },
    { text: 'allowlist', highlighted: true },
    { text: ' protects execution', highlighted: false },
  ])
})
