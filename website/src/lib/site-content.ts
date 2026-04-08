export interface SiteStat {
  label: string
  value: string
}

export interface LifecycleStep {
  stage: string
  actions: string[]
}

export interface LearningTrack {
  title: string
  href: string
  description: string
}

export interface CorePrinciple {
  title: string
  description: string
}

export interface ResourceLink {
  label: string
  href: string
  description: string
}

const repoBaseUrl = 'https://github.com/AICode-Nexus/ai-native-java-backend-bootcamp'

export const exerciseOverviewUrl = `${repoBaseUrl}/blob/main/%E8%AF%BE%E5%90%8E%E7%BB%83%E4%B9%A0/README.md`
export const exerciseTemplateUrl = `${repoBaseUrl}/blob/main/%E8%AF%BE%E5%90%8E%E7%BB%83%E4%B9%A0/%E9%80%9A%E7%94%A8%E6%8F%90%E4%BA%A4%E6%A8%A1%E6%9D%BF.md`

export const courseStats: SiteStat[] = [
  { label: '主线课程', value: '12 节' },
  { label: '进阶专题', value: '4 个' },
  { label: '练习体系', value: '12 套 + 通用模板' },
  { label: '技术底座', value: 'Java 21 + Spring Boot 3.x' },
]

export const developerLifecycleMap: LifecycleStep[] = [
  { stage: '需求理解', actions: ['澄清问题', '拆解任务', '补齐边界'] },
  { stage: '接口设计', actions: ['设计 DTO', '整理错误码', '锁定契约'] },
  { stage: '工程搭建', actions: ['模块切分', '脚手架草图', '最小骨架'] },
  { stage: '编码实现', actions: ['补样板', '守分层', '收敛职责'] },
  { stage: '测试验证', actions: ['边界样例', '回归清单', '真实运行'] },
  { stage: '联调排障', actions: ['整理证据', '压缩排查路径', '沉淀复现记录'] },
  { stage: '发布运维', actions: ['发布检查', '监控摘要', '故障复盘'] },
  { stage: '团队落地', actions: ['统一模板', '规范沉淀', '试点推广'] },
]

export const learningTracks: LearningTrack[] = [
  {
    title: '主线课程',
    href: '/learn',
    description: '围绕传统后端研发全流程，讲清 AI 在每个研发动作里的正确位置，并给出每课对应练习。',
  },
  {
    title: '进阶专题',
    href: '/advanced',
    description: '独立保留 AI-Native 系统建设内容，作为完成主线后的进阶阅读。',
  },
]

export const corePrinciples: CorePrinciple[] = [
  {
    title: '工作流优先',
    description: '先定义研发动作和验证方式，再决定 AI 参与在哪一步。',
  },
  {
    title: '上下文先行',
    description: '不给真实代码、约束和目标，AI 只会生成看起来合理的猜测。',
  },
  {
    title: '验证必选',
    description: '测试、构建、日志和评审是 AI 协作的收口动作，不是附属步骤。',
  },
  {
    title: '边界明确',
    description: '生成速度不能替代分层、权限、兼容性和风险边界。',
  },
  {
    title: '团队复用',
    description: '课程目标不是个人提效技巧，而是可被团队复用的模板和规范。',
  },
]

export const resourceLinks: ResourceLink[] = [
  {
    label: '仓库 README',
    href: `${repoBaseUrl}#readme`,
    description: '课程总览、学习路径与主线入口。',
  },
  {
    label: 'Java 示例项目',
    href: `${repoBaseUrl}/blob/main/demo/README.md`,
    description: '用于需求、设计、测试、排障和交接演练的 Spring Boot 项目。',
  },
  {
    label: '课程设计文档',
    href: `${repoBaseUrl}/blob/main/%E8%AF%BE%E7%A8%8B%E8%AE%BE%E8%AE%A1%E6%96%87%E6%A1%A3.md`,
    description: '完整课程定位、主线与进阶专题设计。',
  },
  {
    label: '课后练习总览',
    href: exerciseOverviewUrl,
    description: '统一查看 12 节主线课练习入口、阶段推进建议和验收原则。',
  },
  {
    label: '练习通用提交模板',
    href: exerciseTemplateUrl,
    description: '记录 AI 输入、人工删改和验证结果的统一交付模板。',
  },
  {
    label: '社区与更新',
    href: `${repoBaseUrl}/blob/main/docs/community.md`,
    description: '获取课程更新、训练营通知与相关文章。',
  },
]
