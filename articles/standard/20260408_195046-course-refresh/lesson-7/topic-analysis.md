# 第7课 话题分析

## 核心概念

SQL、缓存和性能问题的难点不是“没有优化建议”，而是太容易在证据不足时优化错层。AI 的价值在于帮工程师解释现象、归纳访问模式、起草实验方案和记录取舍。

## 目标受众与深度

- 目标受众：负责慢查询、缓存策略和热点路径分析的后端工程师
- 深度：中级偏分析
- 阅读目标：学会基于访问模式和指标证据让 AI 参与分析，而不是让 AI 替你决定优化方案

## 深度杠杆

- 机制：为什么错误优化会把复杂度加到错误层
- 失败模式：先加缓存、先改索引、先换实现，却没有证据支撑
- 实施细节：如何准备 SQL、访问路径、耗时和命中率信息
- 决策规则：优化建议何时值得做实验，何时应该先继续观测

## 参考素材

- [SqlAssistantController.java](../../../../demo/src/main/java/com/example/ainative/dataassistant/controller/SqlAssistantController.java)
- [SessionMemoryStore.java](../../../../demo/src/main/java/com/example/ainative/cache/SessionMemoryStore.java)
- [HybridRetriever.java](../../../../demo/src/main/java/com/example/ainative/knowledge/retrieve/HybridRetriever.java)
- [AiMetricsFacade.java](../../../../demo/src/main/java/com/example/ainative/ops/metrics/AiMetricsFacade.java)
