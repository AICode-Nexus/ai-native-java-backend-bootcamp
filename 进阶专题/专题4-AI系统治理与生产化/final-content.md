# 专题4 AI 系统治理与生产化

## 这个专题解决什么问题

当 AI 进入业务主链路后，系统不再只需要“能跑”，还需要能观测、能评测、能降级、能控制风险，并具备生产化演进路径。

## 与主线课程如何衔接

主线课程最后几课已经覆盖了发布检查、监控分析和复盘思路。  
这个专题把这些理念放到真正的 AI 系统治理场景里，讲清更完整的工程闭环。

## 当前仓库可重点阅读的位置

- [`../../demo/src/main/java/com/example/ainative/ai/safety`](../../demo/src/main/java/com/example/ainative/ai/safety)
- [`../../demo/src/main/java/com/example/ainative/ops`](../../demo/src/main/java/com/example/ainative/ops)
- [`../../demo/evals`](../../demo/evals)
- [`../../.github/workflows`](../../.github/workflows)

## 重点问题

- 安全策略、日志、指标、评测如何形成闭环
- 哪些风险必须在上线前被显式检查
- 如何从教学示例逐步走向真实生产能力

## 推荐阅读顺序

1. 先看 safety、logging、metrics
2. 再看 evals 和 CI
3. 最后思考生产化迁移路线
