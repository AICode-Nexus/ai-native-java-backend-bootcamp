# 第8课 话题分析

## 核心概念

重构和代码审查最怕“大而全的优雅改造”。AI 在这里最稳定的价值，是帮助工程师识别热点、缩小安全改动范围、从 diff 中筛风险，并输出结构化审查意见。

## 目标受众与深度

- 目标受众：需要做重构、PR 审查和风险识别的后端工程师
- 深度：中级偏高级
- 阅读目标：学会先锁行为与测试，再让 AI 辅助识别热点和评审 diff

## 深度杠杆

- 机制：为什么重构风险来自行为漂移而不只是代码改动量
- 失败模式：没有测试就大改、只审风格不审风险、审查意见不可执行
- 实施细节：如何用热点清单、最小改动和结构化评审收口
- 决策规则：何时该重构，何时只做局部修补

## 参考素材

- [ToolRegistry.java](../../../../demo/src/main/java/com/example/ainative/agent/tool/ToolRegistry.java)
- [KnowledgeWorkflowService.java](../../../../demo/src/main/java/com/example/ainative/workflow/KnowledgeWorkflowService.java)
- [SafetyPolicy.java](../../../../demo/src/main/java/com/example/ainative/ai/safety/SafetyPolicy.java)
- [SafetyPolicyTest.java](../../../../demo/src/test/java/com/example/ainative/ai/safety/SafetyPolicyTest.java)
