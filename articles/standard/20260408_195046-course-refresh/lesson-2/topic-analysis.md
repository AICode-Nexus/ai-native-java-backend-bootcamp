# 第2课 话题分析

## 核心概念

接口设计和数据建模阶段的关键不是“让 AI 生成一套看起来完整的字段”，而是借助 AI 快速比较契约方案、暴露边界条件、补齐错误场景和字段语义。

## 目标受众与深度

- 目标受众：负责接口定义、DTO 设计、配置建模的后端工程师
- 深度：中级
- 阅读目标：学会用 AI 起草契约，但保留对字段语义、边界、兼容性和错误模型的人工控制

## 深度杠杆

- 机制：契约一旦模糊，联调和测试都会放大问题
- 失败模式：字段过多、命名失真、把传输模型和领域模型混在一起
- 实施细节：如何先给使用场景，再让 AI 生成字段表和错误表
- 决策规则：哪些字段可以先起草，哪些版本策略必须人工拍板

## 参考素材

- [ChatRequest.java](../../../../demo/src/main/java/com/example/ainative/chat/api/ChatRequest.java)
- [ChatResponse.java](../../../../demo/src/main/java/com/example/ainative/chat/api/ChatResponse.java)
- [RagAnswerResponse.java](../../../../demo/src/main/java/com/example/ainative/knowledge/rag/api/RagAnswerResponse.java)
- [UploadDocumentResponse.java](../../../../demo/src/main/java/com/example/ainative/knowledge/document/api/UploadDocumentResponse.java)
- [InfraProperties.java](../../../../demo/src/main/java/com/example/ainative/bootstrap/config/InfraProperties.java)
