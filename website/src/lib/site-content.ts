export interface SiteStat {
  label: string
  value: string
}

export interface SystemMapItem {
  layer: string
  techs: string[]
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

export const courseStats: SiteStat[] = [
  { label: '课程数量', value: '12 节课' },
  { label: '主技术栈', value: 'Java 21 + Spring Boot 3.x' },
  { label: '主业务场景', value: '企业知识助手' },
]

export const backendSystemMap: SystemMapItem[] = [
  { layer: '模型接入层', techs: ['Spring Boot', 'Provider Gateway'] },
  { layer: '接口层', techs: ['REST', 'SSE', '统一响应'] },
  { layer: 'Prompt / Context 层', techs: ['Prompt 模板', '上下文管理'] },
  { layer: '知识层', techs: ['文件解析', '切片', '知识入库'] },
  { layer: 'RAG 层', techs: ['Retriever', 'Citation', 'Grounded Answer'] },
  { layer: '检索协同层', techs: ['Redis', 'Elasticsearch', 'Vector'] },
  { layer: '工具层', techs: ['Tool Registry', 'Allowlist', 'Agent'] },
  { layer: '流程层', techs: ['Workflow', 'MQ', 'Async Task'] },
  { layer: '治理层', techs: ['Safety', 'Metrics', 'Evals', 'Ops'] },
]

export const corePrinciples: CorePrinciple[] = [
  {
    title: '边界先行',
    description: '先把模型、检索、工具和业务边界讲清楚，再谈能力堆叠。',
  },
  {
    title: '链路优先',
    description: '课程围绕企业知识助手主链路推进，而不是散点示例拼装。',
  },
  {
    title: '治理内建',
    description: '日志、规则、评测和安全从一开始就是系统能力，不是后补。',
  },
  {
    title: '渐进演进',
    description: '优先教学友好的模块化单体，再逐步替换真实基础设施。',
  },
  {
    title: '对比驱动',
    description: '每节课都用“深讲一个、横向对比多个”的方式建立判断力。',
  },
]

export const resourceLinks: ResourceLink[] = [
  {
    label: '仓库 README',
    href: `${repoBaseUrl}#readme`,
    description: '课程总览、学习路径与仓库入口。',
  },
  {
    label: 'Java Demo',
    href: `${repoBaseUrl}/blob/main/demo/README.md`,
    description: '贯穿训练营的 Spring Boot 主项目说明。',
  },
  {
    label: '课程设计文档',
    href: `${repoBaseUrl}/blob/main/%E8%AF%BE%E7%A8%8B%E8%AE%BE%E8%AE%A1%E6%96%87%E6%A1%A3.md`,
    description: '完整课程设计、主线和章节目标。',
  },
  {
    label: '社区与更新',
    href: `${repoBaseUrl}/blob/main/docs/community.md`,
    description: '获取课程更新、训练营通知与相关文章。',
  },
]
