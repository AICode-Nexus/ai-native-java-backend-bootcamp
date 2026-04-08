export type LearningSection = 'main' | 'advanced'

interface LearningEntryBase {
  id: string
  order: number
  title: string
  subtitle: string
  duration: string
  tags: string[]
  dirName: string
  summary: string
  section: LearningSection
  sectionLabel: string
  href: string
}

export interface MainCourse extends LearningEntryBase {
  number: number
  section: 'main'
}

export interface AdvancedTopic extends LearningEntryBase {
  number: number
  section: 'advanced'
}

export type LearningEntry = MainCourse | AdvancedTopic

export const mainCourses: MainCourse[] = [
  {
    id: 'lesson-0',
    number: 0,
    order: 0,
    title: 'AI 时代后端工程师的工作流重构',
    subtitle: '先重构工作流，再谈如何让 AI 真正提效',
    duration: '2h',
    tags: ['认知', '工作流', '协作方式'],
    dirName: '第0课-AI时代后端工程师的工作流重构',
    summary: '建立 AI 辅助后端研发的总地图，明确 AI 在研发流程中的正确位置。',
    section: 'main',
    sectionLabel: '主线课程',
    href: '/learn/lesson-0',
  },
  {
    id: 'lesson-1',
    number: 1,
    order: 1,
    title: '用 AI 做需求理解与任务拆解',
    subtitle: '让 AI 先帮你澄清问题，而不是直接开始写代码',
    duration: '2h',
    tags: ['需求', '拆解', '边界澄清'],
    dirName: '第1课-用AI做需求理解与任务拆解',
    summary: '用 AI 辅助需求澄清、任务拆解和验收边界整理。',
    section: 'main',
    sectionLabel: '主线课程',
    href: '/learn/lesson-1',
  },
  {
    id: 'lesson-2',
    number: 2,
    order: 2,
    title: '用 AI 做接口设计与数据建模',
    subtitle: '先把契约讲清楚，再进入实现',
    duration: '2h',
    tags: ['接口设计', 'DTO', '数据建模'],
    dirName: '第2课-用AI做接口设计与数据建模',
    summary: '让 AI 参与接口草图、字段设计和错误场景梳理，但保留工程师拍板。',
    section: 'main',
    sectionLabel: '主线课程',
    href: '/learn/lesson-2',
  },
  {
    id: 'lesson-3',
    number: 3,
    order: 3,
    title: '用 AI 辅助搭 Spring Boot 工程骨架',
    subtitle: '生成最小可维护骨架，而不是最大模板工程',
    duration: '2h',
    tags: ['Spring Boot', '脚手架', '模块边界'],
    dirName: '第3课-用AI辅助搭Spring-Boot工程骨架',
    summary: '用 AI 输出模块候选和骨架草图，再手工收敛成可维护结构。',
    section: 'main',
    sectionLabel: '主线课程',
    href: '/learn/lesson-3',
  },
  {
    id: 'lesson-4',
    number: 4,
    order: 4,
    title: '用 AI 写业务代码，但守住边界',
    subtitle: '让 AI 加速实现，不让它打散分层',
    duration: '2h',
    tags: ['编码', '分层', '边界'],
    dirName: '第4课-用AI写业务代码但守住边界',
    summary: '明确 AI 在业务编码中的使用姿势，重点防止控制器、服务和依赖层串味。',
    section: 'main',
    sectionLabel: '主线课程',
    href: '/learn/lesson-4',
  },
  {
    id: 'lesson-5',
    number: 5,
    order: 5,
    title: '用 AI 补测试、造样例、做回归',
    subtitle: '把验证环节变成 AI 的高价值场景',
    duration: '2h',
    tags: ['测试', '样例', '回归'],
    dirName: '第5课-用AI补测试造样例做回归',
    summary: '让 AI 参与边界样例生成、测试补齐和回归清单整理。',
    section: 'main',
    sectionLabel: '主线课程',
    href: '/learn/lesson-5',
  },
  {
    id: 'lesson-6',
    number: 6,
    order: 6,
    title: '用 AI 联调接口与排查问题',
    subtitle: '让证据整理和排查路径收敛更快',
    duration: '2h',
    tags: ['联调', '日志', '排障'],
    dirName: '第6课-用AI联调接口与排查问题',
    summary: '通过结构化上下文让 AI 参与日志总结、契约对照和问题排查。',
    section: 'main',
    sectionLabel: '主线课程',
    href: '/learn/lesson-6',
  },
  {
    id: 'lesson-7',
    number: 7,
    order: 7,
    title: '用 AI 辅助 SQL、缓存与性能分析',
    subtitle: '先看清瓶颈，再决定要不要优化',
    duration: '2h',
    tags: ['SQL', '缓存', '性能'],
    dirName: '第7课-用AI辅助SQL缓存与性能分析',
    summary: '用 AI 辅助解释 SQL、整理访问模式和生成性能分析清单。',
    section: 'main',
    sectionLabel: '主线课程',
    href: '/learn/lesson-7',
  },
  {
    id: 'lesson-8',
    number: 8,
    order: 8,
    title: '用 AI 做重构、代码审查与风险发现',
    subtitle: '让 AI 帮你先筛风险，再做最小安全改动',
    duration: '2h',
    tags: ['重构', '代码审查', '风险'],
    dirName: '第8课-用AI做重构代码审查与风险发现',
    summary: '围绕测试、diff 和职责边界，让 AI 参与重构与审查，但不替代最终判断。',
    section: 'main',
    sectionLabel: '主线课程',
    href: '/learn/lesson-8',
  },
  {
    id: 'lesson-9',
    number: 9,
    order: 9,
    title: '用 AI 写文档、设计说明与交接材料',
    subtitle: '把代码变化沉淀为可协作资产',
    duration: '2h',
    tags: ['文档', '设计说明', '交接'],
    dirName: '第9课-用AI写文档设计说明与交接材料',
    summary: '让 AI 基于真实代码和决策草拟文档，再由工程师补齐边界、取舍和风险。',
    section: 'main',
    sectionLabel: '主线课程',
    href: '/learn/lesson-9',
  },
  {
    id: 'lesson-10',
    number: 10,
    order: 10,
    title: '用 AI 参与发布检查、监控分析与故障复盘',
    subtitle: '把上线和复盘变成可重复的工作流',
    duration: '2h',
    tags: ['发布', '监控', '复盘'],
    dirName: '第10课-用AI参与发布检查监控分析与故障复盘',
    summary: '让 AI 辅助生成发布清单、监控摘要和复盘结构，但结论仍然基于证据。',
    section: 'main',
    sectionLabel: '主线课程',
    href: '/learn/lesson-10',
  },
  {
    id: 'lesson-11',
    number: 11,
    order: 11,
    title: '团队级 AI 开发规范与落地路线',
    subtitle: '把个人提效方法沉淀成团队能力',
    duration: '2h',
    tags: ['团队规范', '模板', '落地路线'],
    dirName: '第11课-团队级AI开发规范与落地路线',
    summary: '从输入模板、验证规则到试点路线，建立团队级 AI 研发协作方式。',
    section: 'main',
    sectionLabel: '主线课程',
    href: '/learn/lesson-11',
  },
]

export const advancedTopics: AdvancedTopic[] = [
  {
    id: 'advanced-model-boundaries',
    number: 1,
    order: 1,
    title: '模型接入与 AI 能力边界',
    subtitle: '当 AI 真正进入业务系统，后端如何接住模型能力',
    duration: '1.5h',
    tags: ['模型接入', '边界', '配置'],
    dirName: '进阶专题/专题1-模型接入与AI能力边界',
    summary: '从模型网关、配置绑定到可替换能力边界，建立进入 AI 系统建设的第一层认知。',
    section: 'advanced',
    sectionLabel: '进阶专题',
    href: '/advanced/advanced-model-boundaries',
  },
  {
    id: 'advanced-rag-enterprise-knowledge',
    number: 2,
    order: 2,
    title: 'RAG 与企业知识系统',
    subtitle: '知识进入系统后，后端如何组织上传、检索与回答依据',
    duration: '1.5h',
    tags: ['RAG', '知识系统', '检索'],
    dirName: '进阶专题/专题2-RAG与企业知识系统',
    summary: '围绕文档入库、召回、引用与降级路径，理解企业知识系统的后端主链路。',
    section: 'advanced',
    sectionLabel: '进阶专题',
    href: '/advanced/advanced-rag-enterprise-knowledge',
  },
  {
    id: 'advanced-tools-workflow-agent-boundaries',
    number: 3,
    order: 3,
    title: 'Tools、Workflow 与 Agent 边界',
    subtitle: '动作型 AI 能力如何保持可控、可审计、可恢复',
    duration: '1.5h',
    tags: ['Tools', 'Workflow', 'Agent'],
    dirName: '进阶专题/专题3-Tools-Workflow-与-Agent-边界',
    summary: '从工具注册到流程编排，讲清动作能力的权限边界和结构化执行结果。',
    section: 'advanced',
    sectionLabel: '进阶专题',
    href: '/advanced/advanced-tools-workflow-agent-boundaries',
  },
  {
    id: 'advanced-ai-governance-productionization',
    number: 4,
    order: 4,
    title: 'AI 系统治理与生产化',
    subtitle: '当 AI 进入主链路，治理、评测和生产化如何收口',
    duration: '1.5h',
    tags: ['治理', '生产化', '评测'],
    dirName: '进阶专题/专题4-AI系统治理与生产化',
    summary: '围绕 safety、logging、metrics、evals 和 CI，理解 AI 系统如何走向生产。',
    section: 'advanced',
    sectionLabel: '进阶专题',
    href: '/advanced/advanced-ai-governance-productionization',
  },
]

export const learningEntries: LearningEntry[] = [...mainCourses, ...advancedTopics]
