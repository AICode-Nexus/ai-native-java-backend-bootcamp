import assert from 'node:assert/strict'
import test from 'node:test'
import {
  getAdvancedTopicFileSpecs,
  getMainCourseFileSpecs,
  readAdvancedTopicMarkdown,
  readMainCourseMarkdown,
} from './lesson-files.ts'

test('every main course and advanced topic entry resolves to an existing final-content.md', () => {
  const mainCourseSpecs = getMainCourseFileSpecs()
  const advancedTopicSpecs = getAdvancedTopicFileSpecs()

  assert.equal(mainCourseSpecs.length, 12)
  assert.equal(advancedTopicSpecs.length, 4)

  for (const spec of mainCourseSpecs) {
    assert.equal(spec.contentPath.endsWith('/final-content.md'), true)
    assert.equal(
      readMainCourseMarkdown(spec.id).length > 0,
      true,
      `${spec.id} should load markdown`
    )
  }

  for (const spec of advancedTopicSpecs) {
    assert.equal(spec.contentPath.endsWith('/final-content.md'), true)
    assert.equal(
      readAdvancedTopicMarkdown(spec.id).length > 0,
      true,
      `${spec.id} should load markdown`
    )
  }
})
