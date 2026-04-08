# AI-Native Java Backend Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone `website/` Next.js course site for `ai-native-java-backend-bootcamp` that matches the frontend bootcamp site's structure and interactions while adapting the content and visual semantics for the Java backend curriculum.

**Architecture:** Add a new `website/` app beside the existing Java `demo/`, keep lesson markdown in the repository root as the single source of truth, and build a thin Next.js presentation layer around shared lesson metadata, content-loading utilities, Markdown rendering, search, and a learn-specific navigation shell. Deliver the work in small vertical slices: first scaffold the app and file-loading contracts, then add Markdown/search utilities, then land the learn shell and pages, then finish homepage content, bounded lesson-polish, CI, and verification.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, pnpm, Biome, React Markdown, `remark-gfm`, `rehype-highlight`, Mermaid, Node test runner, GitHub Actions

---

> **Execution notes:** Use `@test-driven-development` for each behavior slice, `@systematic-debugging` if build/render/search behavior diverges from the spec, and `@verification-before-completion` before claiming the site is ready.

## Planned File Structure

- Create `website/package.json`
  Own the website scripts, dependencies, package manager version, and test entrypoints.
- Create `website/pnpm-lock.yaml`
  Lock the website dependency graph after the first install.
- Create `website/tsconfig.json`
  Configure TypeScript for the website app and Node-based tests.
- Create `website/next.config.ts`
  Provide Next.js configuration and filesystem settings for the app router build.
- Create `website/postcss.config.mjs`
  Wire Tailwind CSS v4 into the Next.js build.
- Create `website/biome.json`
  Keep linting/formatting behavior consistent with the reference course site.
- Create `website/next-env.d.ts`
  Standard Next.js type shim.
- Create `website/.gitignore`
  Ignore `.next`, local env files, caches, and generated artifacts inside `website/`.
- Create `website/public/favicon.svg`
  Website favicon.
- Create `website/public/logo.svg`
  Website brand mark for the header if needed.
- Create `website/src/app/layout.tsx`
  Root layout and metadata for the website.
- Create `website/src/app/globals.css`
  Tailwind theme tokens and course-reading global styles.
- Create `website/src/app/page.tsx`
  Course portal homepage.
- Create `website/src/app/learn/layout.tsx`
  Shared learn-shell layout with header, sidebar, and search wiring.
- Create `website/src/app/learn/page.tsx`
  Course overview page.
- Create `website/src/app/learn/[lessonId]/page.tsx`
  Single-lesson page that reads markdown from the repo root.
- Create `website/src/components/learn/header.tsx`
  Sticky header with search trigger and responsive nav.
- Create `website/src/components/learn/sidebar.tsx`
  Desktop sidebar and mobile drawer navigation.
- Create `website/src/components/learn/mobile-nav-context.tsx`
  Client state for the mobile drawer.
- Create `website/src/components/learn/search-dialog.tsx`
  Search overlay and keyboard navigation.
- Create `website/src/components/learn/layout-shell.test.ts`
  Lightweight source-level regression test for the shared learn layout wiring.
- Create `website/src/components/learn/lesson-content.tsx`
  Markdown renderer, table of contents, Mermaid rendering, and prose styling.
- Create `website/src/components/learn/lesson-content.test.ts`
  Lightweight source-level regression tests for key lesson-content rendering conventions.
- Create `website/src/lib/lessons.ts`
  Lesson metadata used by the homepage, learn overview, and lesson routes.
- Create `website/src/lib/site-content.ts`
  Homepage and `/learn` static content such as hero copy, system map, principles, and repo links.
- Create `website/src/lib/lesson-files.ts`
  Shared lesson directory mapping and file-reading helpers so routes and search do not duplicate path logic.
- Create `website/src/lib/lesson-files.test.ts`
  Verify every lesson metadata entry resolves to a real `final-content.md`.
- Create `website/src/lib/lesson-markdown.ts`
  Markdown preprocessing, heading slugging, and TOC generation.
- Create `website/src/lib/lesson-markdown.test.ts`
  Verify title stripping, unique slugging, and TOC stability.
- Create `website/src/lib/lesson-search.ts`
  Search ranking and highlighting logic.
- Create `website/src/lib/lesson-search.server.ts`
  Server-side lesson search indexing by reading and stripping lesson markdown.
- Create `website/src/lib/lesson-search.test.ts`
  Verify title/tag/content search behavior and highlighting.
- Modify `README.md`
  Add course website local-dev and verification instructions.
- Create `.github/workflows/website-ci.yml`
  Build, type-check, and test the website on push and pull request.
- Modify `第0课-认知重构/final-content.md`
- Modify `第1课-Spring-Boot-接入模型/final-content.md`
- Modify `第2课-对话接口与流式输出/final-content.md`
- Modify `第3课-Prompt-上下文与结构化输出/final-content.md`
- Modify `第4课-文件解析与知识入库/final-content.md`
- Modify `第5课-RAG-检索增强/final-content.md`
- Modify `第6课-Redis-ES-向量检索协同/final-content.md`
- Modify `第7课-Agent-Tools/final-content.md`
- Modify `第8课-Workflow-与-MQ/final-content.md`
- Modify `第9课-AI-工程化治理/final-content.md`
- Modify `第10课-业务融合与数据助手/final-content.md`
- Modify `第11课-全链路整合与生产化/final-content.md`
  Apply bounded website-driven content fixes only where they improve metadata quality, heading consistency, or opening-screen readability.

## Chunk 1: Website foundation and lesson content contracts

### Task 1: Scaffold `website/` and lock lesson file-loading contracts

**Files:**
- Create: `website/package.json`
- Create: `website/tsconfig.json`
- Create: `website/next.config.ts`
- Create: `website/postcss.config.mjs`
- Create: `website/biome.json`
- Create: `website/next-env.d.ts`
- Create: `website/.gitignore`
- Create: `website/public/favicon.svg`
- Create: `website/public/logo.svg`
- Create: `website/src/app/layout.tsx`
- Create: `website/src/app/page.tsx`
- Create: `website/src/app/globals.css`
- Create: `website/src/lib/lessons.ts`
- Create: `website/src/lib/lesson-files.ts`
- Create: `website/src/lib/lesson-files.test.ts`
- Modify: `README.md`

- [ ] **Step 1: Create the website directory skeleton**

Run: `mkdir -p website/src/app website/src/lib website/public`
Expected: `website/` exists with app, lib, and public directories ready for config and source files.

- [ ] **Step 2: Write the website toolchain files**

Create:
- `website/package.json`
- `website/tsconfig.json`
- `website/next.config.ts`
- `website/postcss.config.mjs`
- `website/biome.json`
- `website/next-env.d.ts`
- `website/.gitignore`

Requirements:
- Use `pnpm` and Node 20+.
- Include scripts for `dev`, `build`, `start`, `lint`, `type-check`, and `test`.
- Include only the dependencies needed for the initial shell and later Markdown/search work.

- [ ] **Step 3: Install dependencies**

Run: `cd website && pnpm install`
Expected: `website/pnpm-lock.yaml` is generated and install completes without peer dependency errors.

- [ ] **Step 4: Write the failing lesson file contract test**

Test: `website/src/lib/lesson-files.test.ts`

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import { getLessonFileSpecs, readLessonMarkdown } from './lesson-files.ts'

test('every lesson metadata entry resolves to an existing final-content.md', () => {
  const specs = getLessonFileSpecs()

  assert.equal(specs.length, 12)

  for (const spec of specs) {
    assert.equal(spec.contentPath.endsWith('/final-content.md'), true)
    assert.equal(readLessonMarkdown(spec.id).length > 0, true, `${spec.id} should load markdown`)
  }
})
```

- [ ] **Step 5: Run the test to verify it fails**

Run: `cd website && pnpm exec node --test src/lib/lesson-files.test.ts`
Expected: FAIL because `lesson-files.ts` and `lessons.ts` do not exist yet.

- [ ] **Step 6: Implement the minimal website shell and lesson file loader**

Create:
- `website/src/app/layout.tsx`
- `website/src/app/page.tsx`
- `website/src/app/globals.css`
- `website/src/lib/lessons.ts`
- `website/src/lib/lesson-files.ts`

Implementation requirements:
- `lessons.ts` defines the 12 backend lessons with `id`, `number`, `title`, `subtitle`, `duration`, `tags`, `dirName`, and `summary`.
- `lesson-files.ts` exposes a single mapping/loader interface for filesystem reads so page routes and search can share it later.
- `page.tsx` can be a minimal placeholder homepage for now, but it must build cleanly through the root layout.

- [ ] **Step 7: Re-run the lesson file test**

Run: `cd website && pnpm exec node --test src/lib/lesson-files.test.ts`
Expected: PASS.

- [ ] **Step 8: Run a build smoke check**

Run: `cd website && pnpm build`
Expected: PASS with a minimal Next.js build, even if the learn routes are still placeholders.

- [ ] **Step 9: Update the root README with a temporary website bootstrap note**

Modify: `README.md`

Add:
- The existence of `website/`
- Local dev command placeholders
- A short note that the Java `demo/` remains the backend project and the website is the course portal

- [ ] **Step 10: Commit this task**

```bash
git add website README.md
git commit -m "feat: scaffold backend bootcamp website app"
```

### Task 2: Build markdown preprocessing and search utility contracts

**Files:**
- Create: `website/src/lib/lesson-markdown.ts`
- Create: `website/src/lib/lesson-markdown.test.ts`
- Create: `website/src/lib/lesson-search.ts`
- Create: `website/src/lib/lesson-search.server.ts`
- Create: `website/src/lib/lesson-search.test.ts`
- Modify: `website/package.json`

- [ ] **Step 1: Write the failing markdown utility tests**

Test: `website/src/lib/lesson-markdown.test.ts`

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import { buildProcessedLessonContent, generateToc } from './lesson-markdown.ts'

test('buildProcessedLessonContent removes the page title before TOC generation', () => {
  const processed = buildProcessedLessonContent(`# 第1课 Spring Boot 接入模型\n\n## 先看一个真实问题\n`)
  const toc = generateToc(processed)

  assert.equal(processed.startsWith('# 第1课'), false)
  assert.deepEqual(toc.map((item) => item.text), ['先看一个真实问题'])
})
```

- [ ] **Step 2: Write the failing search utility tests**

Test: `website/src/lib/lesson-search.test.ts`

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import { getHighlightParts, searchLessons } from './lesson-search.ts'
import { getLessonSearchEntries } from './lesson-search.server.ts'

test('searchLessons matches lesson content beyond metadata', () => {
  const results = searchLessons('allowlist', getLessonSearchEntries())

  assert.equal(results.length > 0, true)
  assert.equal(results[0]?.id, 'lesson-7')
})

test('getHighlightParts highlights case-insensitive matches', () => {
  assert.deepEqual(getHighlightParts('Tool allowlist protects execution', 'ALLOWLIST'), [
    { text: 'Tool ', highlighted: false },
    { text: 'allowlist', highlighted: true },
    { text: ' protects execution', highlighted: false },
  ])
})
```

- [ ] **Step 3: Run the new utility tests to verify they fail**

Run: `cd website && pnpm exec node --test src/lib/lesson-markdown.test.ts src/lib/lesson-search.test.ts`
Expected: FAIL because the markdown/search utility modules do not exist yet.

- [ ] **Step 4: Implement the markdown and search utilities**

Create:
- `website/src/lib/lesson-markdown.ts`
- `website/src/lib/lesson-search.ts`
- `website/src/lib/lesson-search.server.ts`

Implementation requirements:
- Reuse the reference site’s proven behavior for heading stripping, TOC generation, duplicate slug handling, and fenced-code exclusion.
- Build search entries from root markdown files using the shared `lesson-files.ts` helpers instead of duplicating path mapping.
- Strip markdown for content indexing so search results can show readable excerpts.

- [ ] **Step 5: Re-run the utility tests**

Run: `cd website && pnpm exec node --test src/lib/lesson-markdown.test.ts src/lib/lesson-search.test.ts`
Expected: PASS.

- [ ] **Step 6: Run the full utility regression set**

Run: `cd website && pnpm exec node --test src/lib/*.test.ts`
Expected: PASS for `lesson-files`, `lesson-markdown`, and `lesson-search`.

- [ ] **Step 7: Commit this task**

```bash
git add website
git commit -m "feat: add lesson markdown and search utilities"
```

## Chunk 2: Learn shell and lesson rendering

### Task 3: Build the learn layout shell, responsive nav, and search dialog

**Files:**
- Create: `website/src/app/learn/layout.tsx`
- Create: `website/src/components/learn/header.tsx`
- Create: `website/src/components/learn/sidebar.tsx`
- Create: `website/src/components/learn/mobile-nav-context.tsx`
- Create: `website/src/components/learn/search-dialog.tsx`
- Create: `website/src/components/learn/layout-shell.test.ts`
- Modify: `website/src/app/globals.css`

- [ ] **Step 1: Write the failing shell smoke test**

Test: `website/src/components/learn/layout-shell.test.ts`

```ts
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

test('learn shell files are present and wired through the learn layout', () => {
  const layoutSource = fs.readFileSync(path.join(process.cwd(), 'src/app/learn/layout.tsx'), 'utf8')

  assert.match(layoutSource, /<Header/)
  assert.match(layoutSource, /<Sidebar/)
  assert.match(layoutSource, /getLessonSearchEntries/)
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd website && pnpm exec node --test src/components/learn/layout-shell.test.ts`
Expected: FAIL because the learn layout and shell components do not exist yet.

- [ ] **Step 3: Implement the learn shell**

Create:
- `website/src/app/learn/layout.tsx`
- `website/src/components/learn/header.tsx`
- `website/src/components/learn/sidebar.tsx`
- `website/src/components/learn/mobile-nav-context.tsx`
- `website/src/components/learn/search-dialog.tsx`

Implementation requirements:
- Keep the same shell structure as the reference site: sticky header, sidebar, mobile drawer, and search trigger.
- Reuse the search utilities from `lesson-search.ts` / `lesson-search.server.ts`.
- Update `globals.css` only for theme tokens and shell-specific layout polish; do not add unrelated styling systems.

- [ ] **Step 4: Re-run the shell smoke test**

Run: `cd website && pnpm exec node --test src/components/learn/layout-shell.test.ts`
Expected: PASS.

- [ ] **Step 5: Run a build smoke check**

Run: `cd website && pnpm build`
Expected: PASS with the learn shell in place, even if lesson pages still show placeholders.

- [ ] **Step 6: Commit this task**

```bash
git add website
git commit -m "feat: add learn shell and search dialog"
```

### Task 4: Build single-lesson pages and the Markdown rendering pipeline

**Files:**
- Create: `website/src/app/learn/[lessonId]/page.tsx`
- Create: `website/src/components/learn/lesson-content.tsx`
- Modify: `website/src/components/learn/lesson-content.test.ts`
- Modify: `website/src/app/globals.css`

- [ ] **Step 1: Expand the lesson-content regression tests**

Modify: `website/src/components/learn/lesson-content.test.ts`

Add:

```ts
test('LessonContent renders only one table of contents instance', () => {
  const source = fs.readFileSync(path.join(process.cwd(), 'src/components/learn/lesson-content.tsx'), 'utf8')
  const matches = source.match(/<TableOfContents toc=\{toc\} \/>/g)

  assert.equal(matches?.length ?? 0, 1)
})

test('LessonContent keeps ordered lists using list-outside markers', () => {
  const source = fs.readFileSync(path.join(process.cwd(), 'src/components/learn/lesson-content.tsx'), 'utf8')

  assert.doesNotMatch(source, /list-inside list-decimal/)
  assert.match(source, /list-outside list-decimal/)
})
```

- [ ] **Step 2: Run the regression tests to verify they fail**

Run: `cd website && pnpm exec node --test src/components/learn/lesson-content.test.ts`
Expected: FAIL because `lesson-content.tsx` and the lesson page route do not exist yet.

- [ ] **Step 3: Implement the lesson page route and renderer**

Create:
- `website/src/app/learn/[lessonId]/page.tsx`
- `website/src/components/learn/lesson-content.tsx`

Implementation requirements:
- Read lesson markdown through `lesson-files.ts`.
- Render lesson headers, tags, duration, previous/next navigation, and the processed markdown body.
- Support code highlighting, tables, Mermaid, TOC generation, and anchor links.
- Keep the page structure and reading rhythm aligned with the reference course site.

- [ ] **Step 4: Re-run the lesson-content regression tests**

Run: `cd website && pnpm exec node --test src/components/learn/lesson-content.test.ts`
Expected: PASS.

- [ ] **Step 5: Run a route-level build check**

Run: `cd website && pnpm build`
Expected: PASS and statically resolve all 12 lesson routes.

- [ ] **Step 6: Commit this task**

```bash
git add website
git commit -m "feat: add lesson reading experience"
```

## Chunk 3: Homepage, course overview, and bounded content polish

### Task 5: Build the homepage and `/learn` overview pages

**Files:**
- Create: `website/src/lib/site-content.ts`
- Create: `website/src/app/learn/page.tsx`
- Modify: `website/src/app/page.tsx`
- Modify: `website/src/lib/lessons.ts`
- Modify: `website/src/app/globals.css`

- [ ] **Step 1: Write the failing course overview contract test**

Modify: `website/src/lib/lesson-files.test.ts`

Add:

```ts
test('lesson metadata remains complete enough for homepage and learn overview cards', () => {
  const specs = getLessonFileSpecs()

  for (const spec of specs) {
    assert.equal(spec.subtitle.length > 0, true)
    assert.equal(spec.summary.length > 0, true)
    assert.equal(spec.tags.length >= 2, true)
    assert.equal(spec.duration.length > 0, true)
  }
})
```

- [ ] **Step 2: Run the contract test to verify it fails**

Run: `cd website && pnpm exec node --test src/lib/lesson-files.test.ts`
Expected: FAIL until all lesson metadata is complete enough for homepage and overview rendering.

- [ ] **Step 3: Implement homepage and learn overview content**

Create or modify:
- `website/src/lib/site-content.ts`
- `website/src/app/learn/page.tsx`
- `website/src/app/page.tsx`
- `website/src/lib/lessons.ts`

Implementation requirements:
- Homepage sections must match the approved spec: hero, backend system map, course preview, core principles, and resource links.
- `/learn` must show the course introduction, backend system-map cards, the full lesson list, and principle blocks.
- Resource links should use repo URLs or site routes, not local filesystem paths.

- [ ] **Step 4: Re-run the metadata contract test**

Run: `cd website && pnpm exec node --test src/lib/lesson-files.test.ts`
Expected: PASS.

- [ ] **Step 5: Run a build smoke check**

Run: `cd website && pnpm build`
Expected: PASS with both `/` and `/learn` rendering correctly.

- [ ] **Step 6: Commit this task**

```bash
git add website
git commit -m "feat: add backend course homepage and overview"
```

### Task 6: Apply bounded lesson-content polish for website presentation

**Files:**
- Modify: `第0课-认知重构/final-content.md`
- Modify: `第1课-Spring-Boot-接入模型/final-content.md`
- Modify: `第2课-对话接口与流式输出/final-content.md`
- Modify: `第3课-Prompt-上下文与结构化输出/final-content.md`
- Modify: `第4课-文件解析与知识入库/final-content.md`
- Modify: `第5课-RAG-检索增强/final-content.md`
- Modify: `第6课-Redis-ES-向量检索协同/final-content.md`
- Modify: `第7课-Agent-Tools/final-content.md`
- Modify: `第8课-Workflow-与-MQ/final-content.md`
- Modify: `第9课-AI-工程化治理/final-content.md`
- Modify: `第10课-业务融合与数据助手/final-content.md`
- Modify: `第11课-全链路整合与生产化/final-content.md`
- Modify: `website/src/lib/lessons.ts`

- [ ] **Step 1: Write the failing TOC/heading stability regression test**

Modify: `website/src/lib/lesson-markdown.test.ts`

Add:

```ts
import fs from 'node:fs'
import path from 'node:path'

test('all lesson markdown files generate unique toc ids', () => {
  const workspaceRoot = path.resolve(process.cwd(), '..')
  const lessonDirs = fs.readdirSync(workspaceRoot).filter((name) => /^第\\d+课-/.test(name))

  for (const lessonDir of lessonDirs) {
    const markdownPath = path.join(workspaceRoot, lessonDir, 'final-content.md')
    const content = fs.readFileSync(markdownPath, 'utf8')
    const toc = generateToc(buildProcessedLessonContent(content))
    const ids = toc.map((item) => item.id)

    assert.equal(new Set(ids).size, ids.length, `${lessonDir} contains duplicate TOC ids`)
  }
})
```

- [ ] **Step 2: Run the markdown regression set**

Run: `cd website && pnpm exec node --test src/lib/lesson-markdown.test.ts`
Expected: PASS or expose the exact lesson files that need heading cleanup before the website ships.

- [ ] **Step 3: Apply bounded content edits**

Edit only what improves website presentation:
- normalize title wording where needed
- tighten the opening-screen sections for lessons that feel too sparse or uneven
- fix clear terminology drift or link errors
- keep the teaching structure intact

Priority:
- Review lessons 5, 6, and 7 first because they are shorter and most likely to feel thin in search excerpts and overview metadata.

- [ ] **Step 4: Re-run the markdown regression set**

Run: `cd website && pnpm exec node --test src/lib/lesson-markdown.test.ts`
Expected: PASS with stable TOC ids across all lesson markdown files.

- [ ] **Step 5: Run a search utility regression check**

Run: `cd website && pnpm exec node --test src/lib/lesson-search.test.ts`
Expected: PASS and still find content-level matches after lesson edits.

- [ ] **Step 6: Commit this task**

```bash
git add website 第0课-认知重构 第1课-Spring-Boot-接入模型 第2课-对话接口与流式输出 第3课-Prompt-上下文与结构化输出 第4课-文件解析与知识入库 第5课-RAG-检索增强 第6课-Redis-ES-向量检索协同 第7课-Agent-Tools 第8课-Workflow-与-MQ 第9课-AI-工程化治理 第10课-业务融合与数据助手 第11课-全链路整合与生产化
git commit -m "docs: polish lesson content for course website"
```

## Chunk 4: Repository integration and verification

### Task 7: Wire website CI and repository documentation

**Files:**
- Create: `.github/workflows/website-ci.yml`
- Modify: `README.md`

- [ ] **Step 1: Write the failing CI expectation**

Add this checklist to the plan execution notes before editing:
- website install
- website tests
- website type-check
- website build

Expected failure mode before implementation: no `website-ci.yml` workflow exists, so website changes are not protected in CI.

- [ ] **Step 2: Implement the website workflow**

Create: `.github/workflows/website-ci.yml`

Requirements:
- Trigger on `website/**`, root lesson markdown, and any workflow/config files the website depends on.
- Set up Node and pnpm.
- Run `pnpm install`, `pnpm exec node --test src/lib/*.test.ts src/components/learn/lesson-content.test.ts`, `pnpm type-check`, and `pnpm build` from `website/`.

- [ ] **Step 3: Finish the root README integration**

Modify: `README.md`

Add:
- local website commands
- the relationship between `website/` and `demo/`
- where to find the learn routes once the site runs locally

- [ ] **Step 4: Validate workflow YAML and README references**

Run: `sed -n '1,240p' .github/workflows/website-ci.yml && rg -n "website/|/learn|pnpm" README.md`
Expected: workflow syntax looks coherent and README points to the website correctly.

- [ ] **Step 5: Commit this task**

```bash
git add .github/workflows/website-ci.yml README.md
git commit -m "ci: add course website checks"
```

### Task 8: Run full verification and prepare the execution handoff

**Files:**
- Modify: `website/package.json` (only if scripts need final cleanup)
- Modify: `docs/superpowers/plans/2026-04-08-ai-native-java-backend-website-implementation.md` (check off completed steps during execution only)

- [ ] **Step 1: Run the website unit and source regression suite**

Run: `cd website && pnpm exec node --test src/lib/*.test.ts src/components/learn/lesson-content.test.ts`
Expected: PASS.

- [ ] **Step 2: Run type-check**

Run: `cd website && pnpm type-check`
Expected: PASS.

- [ ] **Step 3: Run lint**

Run: `cd website && pnpm lint`
Expected: PASS.

- [ ] **Step 4: Run production build**

Run: `cd website && pnpm build`
Expected: PASS.

- [ ] **Step 5: Run a quick repository sanity check**

Run: `git status --short`
Expected: Only intended website, workflow, README, and bounded lesson markdown changes are present.

- [ ] **Step 6: Prepare the execution handoff**

Record:
- any remaining content tweaks deferred intentionally
- any design differences kept on purpose from the frontend reference site
- the exact local commands to run the site: `cd website && pnpm dev`

- [ ] **Step 7: Final commit**

```bash
git add website .github/workflows/website-ci.yml README.md 第0课-* 第1课-* 第2课-* 第3课-* 第4课-* 第5课-* 第6课-* 第7课-* 第8课-* 第9课-* 第10课-* 第11课-*
git commit -m "feat: add backend bootcamp course website"
```

## Scope check

This plan intentionally stays within one subsystem: a new `website/` course portal that reads the existing repository content. It does not include Java feature work inside `demo/`, infra changes, or unrelated curriculum rewrites.

## Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-08-ai-native-java-backend-website-implementation.md`. Ready to execute?
