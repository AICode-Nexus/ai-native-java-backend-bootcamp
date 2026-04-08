import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

test('learn shell files are present and wired through the learn layout', () => {
  const layoutSource = fs.readFileSync(
    path.join(process.cwd(), 'src/app/learn/layout.tsx'),
    'utf8'
  )

  assert.match(layoutSource, /<Header/)
  assert.match(layoutSource, /<Sidebar/)
  assert.match(layoutSource, /getLessonSearchEntries/)
})
