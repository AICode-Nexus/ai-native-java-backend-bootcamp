import assert from 'node:assert/strict'
import test from 'node:test'
import { getLessonFileSpecs, readLessonMarkdown } from './lesson-files.ts'

test('every lesson metadata entry resolves to an existing final-content.md', () => {
  const specs = getLessonFileSpecs()

  assert.equal(specs.length, 12)

  for (const spec of specs) {
    assert.equal(spec.contentPath.endsWith('/final-content.md'), true)
    assert.equal(
      readLessonMarkdown(spec.id).length > 0,
      true,
      `${spec.id} should load markdown`
    )
  }
})
