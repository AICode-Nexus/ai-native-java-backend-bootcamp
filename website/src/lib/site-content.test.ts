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
  assert.equal(courseStats.length, 3)
  assert.equal(developerLifecycleMap.length >= 6, true)
  assert.equal(learningTracks.length, 2)
  assert.equal(corePrinciples.length, 5)
  assert.equal(resourceLinks.length >= 3, true)
})
