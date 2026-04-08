import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { buildProcessedLessonContent, generateToc } from './lesson-markdown.ts'

test('buildProcessedLessonContent removes the page title before TOC generation', () => {
  const processed = buildProcessedLessonContent(
    '# 第1课 Spring Boot 接入模型\n\n## 先看一个真实问题\n'
  )
  const toc = generateToc(processed)

  assert.equal(processed.startsWith('# 第1课'), false)
  assert.deepEqual(
    toc.map((item) => item.text),
    ['先看一个真实问题']
  )
})

test('all lesson markdown files generate unique toc ids', () => {
  const workspaceRoot = path.resolve(process.cwd(), '..')
  const lessonDirs = fs.readdirSync(workspaceRoot).filter((name) => /^第\d+课-/.test(name))

  for (const lessonDir of lessonDirs) {
    const markdownPath = path.join(workspaceRoot, lessonDir, 'final-content.md')
    if (!fs.existsSync(markdownPath)) {
      continue
    }

    const content = fs.readFileSync(markdownPath, 'utf8')
    const toc = generateToc(buildProcessedLessonContent(content))
    const ids = toc.map((item) => item.id)

    assert.equal(
      new Set(ids).size,
      ids.length,
      `${lessonDir} contains duplicate TOC ids: ${ids.join(', ')}`
    )
  }
})
