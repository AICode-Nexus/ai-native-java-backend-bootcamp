# 第10课 话题分析

## 核心概念

发布检查、监控分析和故障复盘都属于“事实很多、摘要很贵、标准必须统一”的场景。AI 的价值在于加速事实整理、清单生成和时间线组织，但不能替团队做上线与事故责任判断。

## 目标受众与深度

- 目标受众：需要参与上线检查、监控看板分析和故障复盘的后端工程师或 TL
- 深度：中级偏运维协作
- 阅读目标：学会用 AI 做证据组织和模板化沉淀，而不是让 AI 替你宣布“可以上线”或“根因已定”

## 深度杠杆

- 机制：为什么发布和复盘都依赖统一输入格式
- 失败模式：检查单靠记忆、监控摘要失真、复盘只写空话
- 实施细节：如何整理变更范围、验证结果、指标与日志
- 决策规则：事实、推测、结论如何分层表达

## 参考素材

- [demo/evals](../../../../demo/evals)
- [RequestLogFilter.java](../../../../demo/src/main/java/com/example/ainative/ops/logging/RequestLogFilter.java)
- [AiMetricsFacade.java](../../../../demo/src/main/java/com/example/ainative/ops/metrics/AiMetricsFacade.java)
- [demo/scripts](../../../../demo/scripts)
