import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

test('learn shell files are present and wired through the learn layout', () => {
  const layoutSource = fs.readFileSync(path.join(process.cwd(), 'src/app/learn/layout.tsx'), 'utf8')
  const advancedPagePath = path.join(process.cwd(), 'src/app/advanced/page.tsx')

  assert.match(layoutSource, /<Header/)
  assert.match(layoutSource, /<Sidebar/)
  assert.match(layoutSource, /getSearchEntries/)
  assert.equal(fs.existsSync(advancedPagePath), true)
})

test('root layout opts in to smooth-scroll route transitions', () => {
  const rootLayoutSource = fs.readFileSync(path.join(process.cwd(), 'src/app/layout.tsx'), 'utf8')

  assert.match(rootLayoutSource, /data-scroll-behavior="smooth"/)
})

test('search dialog includes Radix title and description semantics', () => {
  const searchDialogSource = fs.readFileSync(
    path.join(process.cwd(), 'src/components/learn/search-dialog.tsx'),
    'utf8'
  )

  assert.match(searchDialogSource, /<Dialog\.Title/)
  assert.match(searchDialogSource, /<Dialog\.Description/)
  assert.match(searchDialogSource, /sectionLabel/)
})
