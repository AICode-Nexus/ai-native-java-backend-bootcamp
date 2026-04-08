import assert from 'node:assert/strict'
import test from 'node:test'
import {
  corePrinciples,
  courseStats,
  developerLifecycleMap,
  learningTracks,
  resourceLinks,
} from './site-content.ts'

test('site-content exposes the homepage and learn overview sections', () => {
  assert.deepEqual(
    courseStats.map((item) => item.label),
    ['主线课程', '进阶专题', '练习体系', '技术底座']
  )
  assert.equal(developerLifecycleMap.length >= 6, true)
  assert.equal(learningTracks.length, 2)
  assert.equal(corePrinciples.length, 5)
  assert.equal(resourceLinks.length >= 5, true)
})
