# 第11课 全链路整合与生产化

## 本课目标

- 把整套 AI-Native Java 后端能力链串成一个完整故事
- 输出从训练营 demo 走向真实生产的迁移路径
- 让学员形成“功能、治理、交付”三位一体的收束能力

## 到这一课为止，demo 已经具备什么

- 模型接入边界：`ai/model`
- 聊天接口与流式输出：`chat`
- 文档上传、切片、知识入库：`knowledge/document`
- RAG 检索与引用回答：`knowledge/retrieve`、`knowledge/rag`
- 检索协同：`cache`、`search`、`vector`
- Tool/Workflow：`agent`、`workflow`、`task`
- 业务扩展示例：`dataassistant`
- 治理层：`ai/safety`、`ops`、`evals`、`.github/workflows`

## 生产化时要补的四个层面

### 1. 成本治理

至少要回答：

- 哪些接口最耗 token
- 哪些请求可以缓存
- 哪些模型应该降级到便宜模型
- 哪些场景值得做流式，哪些不值得

### 2. 安全治理

至少要明确：

- SQL 是否只读
- Tool 是否 allowlist
- 文档上传是否有限制
- Prompt 中是否包含敏感信息

### 3. 可观测性与评测

至少要能看到：

- 请求日志
- 核心模型调用指标
- RAG grounded 情况
- Workflow 哪一步失败
- 回归样例是否持续通过

### 4. 交付与演进

一个训练营 demo 想走向生产，不是靠一次“重写”，而是靠渐进替换：

- stub model -> real model provider
- 内存入库 -> ES / 向量库
- 内存 workflow -> MQ / workflow engine
- 占位评测 -> 自动回归体系

## 建议给学员的一份生产化清单

1. 先确认主链路最小可用  
2. 再补安全与日志  
3. 再补评测与 CI  
4. 最后才考虑多模型、多租户、多环境复杂化

## 本课最关键的收束语

AI-Native Java 后端不是一个新框架，而是一套新的系统组织方式。  
Spring Boot 仍然是骨架，Java 仍然是工程底座，只是系统的核心流程从“表单和事务”扩展到了“推理、检索、工具和治理”。

## 全课收束

如果学员在结课时能回答下面三个问题，这套课程就算真正完成了：

- 我的 AI 后端主链路是什么
- 我的边界和风险点在哪里
- 我如何把当前 demo 迁移到真实业务系统
