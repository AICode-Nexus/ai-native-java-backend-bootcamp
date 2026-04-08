# 第4课 话题分析

## 核心概念

编码阶段不是禁止 AI，而是要限制 AI 的作用颗粒度，让它在明确契约内加速实现，而不是打散控制器、服务和底层依赖的边界。

## 目标受众与深度

- 目标受众：已经开始让 AI 生成业务代码的后端工程师
- 深度：中级偏实践
- 阅读目标：学会把 AI 约束在单一职责代码块、方法契约和验证闭环内

## 深度杠杆

- 机制：为什么编码阶段最容易被模型“越权补全”
- 失败模式：胖控制器、串味服务、异常处理与 SQL 混写
- 实施细节：如何给方法输入输出、非目标和分层规则
- 决策规则：什么时候可以让 AI 直接补实现，什么时候应该先重写职责说明

## 参考素材

- [ChatController.java](../../../../demo/src/main/java/com/example/ainative/chat/controller/ChatController.java)
- [ChatService.java](../../../../demo/src/main/java/com/example/ainative/chat/service/ChatService.java)
- [SqlAssistantController.java](../../../../demo/src/main/java/com/example/ainative/dataassistant/controller/SqlAssistantController.java)
- [ToolRegistry.java](../../../../demo/src/main/java/com/example/ainative/agent/tool/ToolRegistry.java)
