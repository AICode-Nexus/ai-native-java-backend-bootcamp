import assert from 'node:assert/strict'
import test from 'node:test'
import { backendSystemMap, corePrinciples, courseStats, resourceLinks } from './site-content.ts'

test('site-content exposes the homepage and learn overview sections', () => {
  assert.equal(courseStats.length, 3)
  assert.equal(backendSystemMap.length >= 8, true)
  assert.equal(corePrinciples.length, 5)
  assert.equal(resourceLinks.length >= 3, true)
})
