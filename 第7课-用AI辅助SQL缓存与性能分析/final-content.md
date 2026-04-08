# 第7课 用 AI 辅助 SQL、缓存与性能分析

## 真实研发场景

线上请求变慢，开发同学第一反应往往是“先加缓存”或“先看看数据库”。真正难的不是不知道工具，而是不知道先看哪一层、怎么收敛问题。

## 传统做法的痛点

- SQL 分析耗时高
- 缓存策略靠经验
- 性能问题容易被抽象成空泛结论
- 复盘时缺少数据支撑

## AI 能提效到哪一步

AI 可以帮助你：

- 解释 SQL 语句和执行风险
- 归纳慢查询或热点访问模式
- 草拟缓存策略候选
- 辅助整理性能排查清单

## 推荐工作流

1. 提供 SQL、索引、请求路径和基础指标
2. 让 AI 先解释现象，再给优化候选
3. 人工判断哪些建议值得试验
4. 用指标、压测或实际命中率验证
5. 记录最终取舍，而不是只保留建议文本

## 与仓库代码和模板的映射

- 数据助手：[`../demo/src/main/java/com/example/ainative/dataassistant`](../demo/src/main/java/com/example/ainative/dataassistant)
- 会话缓存：[`../demo/src/main/java/com/example/ainative/cache`](../demo/src/main/java/com/example/ainative/cache)
- 搜索与检索：[`../demo/src/main/java/com/example/ainative/search`](../demo/src/main/java/com/example/ainative/search)、[`../demo/src/main/java/com/example/ainative/knowledge/retrieve`](../demo/src/main/java/com/example/ainative/knowledge/retrieve)

## 常见误用与风险

- 让 AI 直接决定索引和缓存策略
- 只看“建议看起来对”，不看真实数据
- 忽略写入成本、一致性和失效策略
- 把问题归结为“数据库慢”，却不回到访问模式

## 课后练习

- 选一段 SQL 或一条热点路径做解释和优化建议整理
- 让 AI 给出缓存方案，再人工写出风险说明
- 补一份性能排查检查表
