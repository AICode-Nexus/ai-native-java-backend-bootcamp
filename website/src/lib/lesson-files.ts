import fs from 'node:fs'
import path from 'node:path'
import type { Lesson } from './lessons.ts'
import { lessons } from './lessons.ts'

export interface LessonFileSpec extends Lesson {
  contentPath: string
}

function getWorkspaceRoot(): string {
  return path.resolve(process.cwd(), '..')
}

export function getLessonFileSpecs(): LessonFileSpec[] {
  return lessons.map((lesson) => ({
    ...lesson,
    contentPath: path.join(getWorkspaceRoot(), lesson.dirName, 'final-content.md'),
  }))
}

export function getLessonFileSpec(lessonId: string): LessonFileSpec | undefined {
  return getLessonFileSpecs().find((lesson) => lesson.id === lessonId)
}

export function readLessonMarkdown(lessonId: string): string {
  const lesson = getLessonFileSpec(lessonId)

  if (!lesson || !fs.existsSync(lesson.contentPath)) {
    return ''
  }

  return fs.readFileSync(lesson.contentPath, 'utf8')
}
