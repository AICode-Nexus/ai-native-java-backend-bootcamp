import fs from 'node:fs'
import path from 'node:path'
import type { AdvancedTopic, LearningEntry, MainCourse } from './lessons.ts'
import { advancedTopics, learningEntries, mainCourses } from './lessons.ts'

export type ContentFileSpec<T extends LearningEntry> = T & {
  contentPath: string
}

function getWorkspaceRoot(): string {
  return path.resolve(process.cwd(), '..')
}

function toContentFileSpec<T extends LearningEntry>(entry: T): ContentFileSpec<T> {
  return {
    ...entry,
    contentPath: path.join(getWorkspaceRoot(), entry.dirName, 'final-content.md'),
  }
}

export function getMainCourseFileSpecs(): ContentFileSpec<MainCourse>[] {
  return mainCourses.map(toContentFileSpec)
}

export function getAdvancedTopicFileSpecs(): ContentFileSpec<AdvancedTopic>[] {
  return advancedTopics.map(toContentFileSpec)
}

export function getAllContentFileSpecs(): ContentFileSpec<LearningEntry>[] {
  return learningEntries.map(toContentFileSpec)
}

export function getMainCourseFileSpec(courseId: string): ContentFileSpec<MainCourse> | undefined {
  return getMainCourseFileSpecs().find((course) => course.id === courseId)
}

export function getAdvancedTopicFileSpec(
  topicId: string
): ContentFileSpec<AdvancedTopic> | undefined {
  return getAdvancedTopicFileSpecs().find((topic) => topic.id === topicId)
}

function readFileIfExists(contentPath: string): string {
  if (!fs.existsSync(contentPath)) {
    return ''
  }

  return fs.readFileSync(contentPath, 'utf8')
}

export function readMainCourseMarkdown(courseId: string): string {
  const course = getMainCourseFileSpec(courseId)
  return course ? readFileIfExists(course.contentPath) : ''
}

export function readAdvancedTopicMarkdown(topicId: string): string {
  const topic = getAdvancedTopicFileSpec(topicId)
  return topic ? readFileIfExists(topic.contentPath) : ''
}
