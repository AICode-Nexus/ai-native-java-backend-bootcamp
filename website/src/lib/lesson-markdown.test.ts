import assert from 'node:assert/strict'
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
