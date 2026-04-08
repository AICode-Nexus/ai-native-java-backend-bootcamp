# 第1课 用 AI 做需求理解与任务拆解

## 真实研发场景

你接到一个需求：“给订单接口增加智能推荐说明，并保留原有风控校验。”看起来不大，但真正动手前往往有一堆没说清楚的前提。

## 传统做法的痛点

- 需求文档信息不完整
- 开发直接开工，边做边补理解
- 风险点、非功能要求和边界条件经常漏掉
- 任务拆得不细，估时和协作都不稳定

## AI 能提效到哪一步

AI 很适合在需求初期帮助你：

- 反问缺失前提
- 拆分任务步骤
- 补齐边界条件
- 先整理一版验收清单

## 推荐工作流

1. 把原始需求、上下文文档和现有接口一起提供给 AI
2. 让 AI 输出“待确认问题清单”
3. 再让 AI 按模块、接口、测试、风险拆任务
4. 人工确认优先级、范围和不做什么
5. 最终沉淀为结构化任务卡或开发说明

## 与仓库代码和模板的映射

- 示例项目入口：[`../demo/README.md`](../demo/README.md)
- 健康检查与统一响应：[`../demo/src/main/java/com/example/ainative/common/api`](../demo/src/main/java/com/example/ainative/common/api)
- 聊天与知识模块：[`../demo/src/main/java/com/example/ainative/chat`](../demo/src/main/java/com/example/ainative/chat)、[`../demo/src/main/java/com/example/ainative/knowledge`](../demo/src/main/java/com/example/ainative/knowledge)

## 常见误用与风险

- 让 AI 直接输出“开发方案”，却没提供现有系统约束
- 把 AI 的任务拆解当成最终排期
- 不区分“待确认事项”和“已确认事项”
- 忽略兼容性、风控、权限、性能等非功能要求

## 课后练习

- 选 `demo/` 中一个模块写出需求澄清问题清单
- 用 AI 帮你拆一版任务，再手工裁剪
- 输出一份“范围内 / 范围外 / 待确认”的开发说明
