# 专题3 Tools、Workflow 与 Agent 边界

## 这个专题解决什么问题

一旦模型具备动作能力，后端系统就必须回答：哪些能力能开放、如何注册、如何审计，以及哪些长链路任务应交给 Workflow 而不是“万能 Agent”。

## 与主线课程如何衔接

主线课程中的重构、审查和风险发现，会让你建立边界意识。  
这个专题把这种边界意识继续推进到动作型 AI 能力设计。

## 当前仓库可重点阅读的位置

- [`../../demo/src/main/java/com/example/ainative/agent`](../../demo/src/main/java/com/example/ainative/agent)
- [`../../demo/src/main/java/com/example/ainative/workflow`](../../demo/src/main/java/com/example/ainative/workflow)
- [`../../demo/src/main/java/com/example/ainative/task`](../../demo/src/main/java/com/example/ainative/task)

## 重点问题

- Tool 和 Agent 不是一回事
- Workflow 和异步任务解决的是可观察、可恢复的固定流程
- allowlist、参数校验和执行结果结构化是最低要求

## 推荐阅读顺序

1. 先看 Tool 定义与注册
2. 再看执行结果和风险控制
3. 最后看 Workflow 与任务编排
