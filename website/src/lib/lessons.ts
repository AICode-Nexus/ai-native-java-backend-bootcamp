export interface Lesson {
  id: string
  number: number
  title: string
  subtitle: string
  duration: string
  tags: string[]
  dirName: string
  summary: string
}

export const lessons: Lesson[] = [
  {
    id: 'lesson-0',
    number: 0,
    title: '认知重构',
    subtitle: 'AI-Native 后端不是给 CRUD 加一个模型接口',
    duration: '2h',
    tags: ['认知', '系统边界', '课程主线'],
    dirName: '第0课-认知重构',
    summary: '建立 AI-Native Java 后端的整体认知框架，明确课程主线和系统分层。'
  },
  {
    id: 'lesson-1',
    number: 1,
    title: 'Spring Boot 接入模型',
    subtitle: '把模型调用封装成后端系统的稳定边界',
    duration: '2.5h',
    tags: ['Spring Boot', '模型接入', '网关'],
    dirName: '第1课-Spring-Boot-接入模型',
    summary: '从直接调用到统一网关，建立可演进的模型接入边界。'
  },
  {
    id: 'lesson-2',
    number: 2,
    title: '对话接口与流式输出',
    subtitle: '同步与 SSE 接口如何形成统一契约',
    duration: '2.5h',
    tags: ['Chat API', 'SSE', '接口契约'],
    dirName: '第2课-对话接口与流式输出',
    summary: '把模型能力升级成业务系统可稳定消费的聊天接口。'
  },
  {
    id: 'lesson-3',
    number: 3,
    title: 'Prompt、上下文与结构化输出',
    subtitle: '让聊天能力从可用走向可控',
    duration: '2.5h',
    tags: ['Prompt', '上下文', '结构化输出'],
    dirName: '第3课-Prompt-上下文与结构化输出',
    summary: '把 Prompt、会话上下文和结构化响应组织成清晰的服务层能力。'
  },
  {
    id: 'lesson-4',
    number: 4,
    title: '文件解析与知识入库',
    subtitle: '把文件转换成可检索、可追踪的知识片段',
    duration: '2.5h',
    tags: ['文档上传', '切片', '知识入库'],
    dirName: '第4课-文件解析与知识入库',
    summary: '搭建从上传、清洗到切片入库的最小知识处理链路。'
  },
  {
    id: 'lesson-5',
    number: 5,
    title: 'RAG 检索增强',
    subtitle: '让回答真正锚定企业知识而不是模型记忆',
    duration: '2.5h',
    tags: ['RAG', '引用', '检索增强'],
    dirName: '第5课-RAG-检索增强',
    summary: '建立带引用、可降级、可解释的最小 RAG 回答链路。'
  },
  {
    id: 'lesson-6',
    number: 6,
    title: 'Redis、ES、向量检索协同',
    subtitle: '用分层协作取代单一检索底座迷思',
    duration: '2.5h',
    tags: ['Redis', 'Elasticsearch', 'Vector'],
    dirName: '第6课-Redis-ES-向量检索协同',
    summary: '讲清缓存、关键词检索与语义召回的职责边界与组合方式。'
  },
  {
    id: 'lesson-7',
    number: 7,
    title: 'Agent 与 Tools',
    subtitle: '让工具调用成为受控能力，而不是魔法',
    duration: '2.5h',
    tags: ['Agent', 'Tools', 'Allowlist'],
    dirName: '第7课-Agent-Tools',
    summary: '明确 Tool、Agent、注册表和执行边界，控制动作型能力的风险。'
  },
  {
    id: 'lesson-8',
    number: 8,
    title: 'Workflow 与 MQ',
    subtitle: '把长链路 AI 任务变成稳定可观测的异步流程',
    duration: '2.5h',
    tags: ['Workflow', 'MQ', '异步任务'],
    dirName: '第8课-Workflow-与-MQ',
    summary: '用编排和消息队列承载长耗时、可重试、可追踪的任务流。'
  },
  {
    id: 'lesson-9',
    number: 9,
    title: 'AI 工程化治理',
    subtitle: '从可运行 demo 走向可治理系统',
    duration: '2.5h',
    tags: ['治理', '安全', '可观测'],
    dirName: '第9课-AI-工程化治理',
    summary: '建立日志、规则、评测、成本与安全的最小治理闭环。'
  },
  {
    id: 'lesson-10',
    number: 10,
    title: '业务融合与数据助手',
    subtitle: '让 AI 能力进入业务，但不越过安全边界',
    duration: '2.5h',
    tags: ['业务融合', 'SQL 助手', '只读'],
    dirName: '第10课-业务融合与数据助手',
    summary: '以只读 SQL 助手为例，讲清业务增强场景里的输入输出控制。'
  },
  {
    id: 'lesson-11',
    number: 11,
    title: '全链路整合与生产化',
    subtitle: '把训练营 demo 收束成面向生产的系统故事',
    duration: '2.5h',
    tags: ['生产化', '整合', '演进路线'],
    dirName: '第11课-全链路整合与生产化',
    summary: '收束课程主线，建立从 demo 到生产的分层演进路线。'
  }
]
