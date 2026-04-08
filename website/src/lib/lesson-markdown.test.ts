import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { buildProcessedLessonContent, generateToc, resolveLessonLink } from './lesson-markdown.ts'

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

test('resolveLessonLink rewrites repo-relative markdown links to GitHub URLs', () => {
  assert.deepEqual(
    resolveLessonLink(
      '../demo/src/main/java/com/example/ainative/agent/tool/ToolRegistry.java',
      '第7课-Agent-Tools'
    ),
    {
      href: 'https://github.com/AICode-Nexus/ai-native-java-backend-bootcamp/blob/main/demo/src/main/java/com/example/ainative/agent/tool/ToolRegistry.java',
      external: true,
    }
  )

  assert.deepEqual(
    resolveLessonLink(
      '../demo/src/main/java/com/example/ainative/agent',
      '第11课-全链路整合与生产化'
    ),
    {
      href: 'https://github.com/AICode-Nexus/ai-native-java-backend-bootcamp/tree/main/demo/src/main/java/com/example/ainative/agent',
      external: true,
    }
  )

  assert.deepEqual(resolveLessonLink('#本课小结', '第7课-Agent-Tools'), {
    href: '#本课小结',
    external: false,
  })

  assert.deepEqual(resolveLessonLink('https://example.com/docs', '第7课-Agent-Tools'), {
    href: 'https://example.com/docs',
    external: true,
  })
})
