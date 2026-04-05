# 第0课 认知重构

## 为什么要先做认知重构

传统 Java 后端训练往往从表结构、DAO、Service、Controller 的 CRUD 链路开始，而 AI-Native 后端的起点不是“表单提交”，而是“推理驱动的业务请求”。用户发来的不再只是固定字段，而是自然语言、文档、上下文、工具调用意图和长链路任务。  
所以这门课第一节不急着写代码，而是先把后端分层重新摆正：`API 层 -> AI Service 层 -> Retrieval/Tool/Workflow 层 -> Data/Infra 层 -> Governance 层`。

## 本课目标

- 理解传统 CRUD 后端与 AI-Native 后端的根本差异
- 建立 Chat、RAG、Tool、Workflow、Governance 的能力地图
- 明确本训练营主线不是“做十几个散点 Demo”，而是围绕企业知识助手逐步扩能力

## 本课对应仓库位置

- 顶层课程入口：[README.md](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/README.md)
- 主项目入口：[demo/README.md](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/README.md)
- Spring Boot 启动类：[AiNativeBackendApplication.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/AiNativeBackendApplication.java)

## 这一课要讲清楚的三件事

### 1. AI-Native 后端不是“给原系统贴个大模型接口”

如果只是把大模型当成一个外部 HTTP 服务，那么你只能做一次性文案生成，系统不会自然演进出记忆、检索、工具调用和安全边界。真正的 AI-Native 后端，需要从一开始就为模型接入、上下文管理、可追溯回答和风险控制预留稳定接口。

### 2. 主线业务比技术名词更重要

Chat、RAG、Agent、Workflow 这些词如果脱离真实业务，学员很容易学成“名词收藏”。本训练营用企业知识助手作为主线，是因为它天然覆盖了：

- 聊天接口
- 文档上传与切片
- 检索增强
- 工具调用
- 异步工作流
- 安全与评测

### 3. 工程治理必须前置，而不是最后补

AI 后端最容易出问题的地方不是代码跑不起来，而是“跑起来了却不可控”。所以从一开始就要问：

- 结果能不能追溯
- 工具有没有 allowlist
- SQL 是否只读
- 日志和指标是否可观察
- 回归评测是否能重复执行

## 推荐课堂讲法

1. 先画一张传统 CRUD 架构图  
2. 再画一张 AI-Native 后端能力分层图  
3. 用企业知识助手的用户请求串联两张图的差异  
4. 最后落回当前仓库，让学员知道接下来每一课会把哪一层补出来

## 常见误区

- 误区一：把 AI 后端理解成“多一个 `/chat` 接口”
- 误区二：先把所有基础设施接满，再考虑主链路
- 误区三：把 Agent 当成一个能吞掉所有逻辑的超级 Service

## 本课小结

这门课的目标不是把 Java 变成 Python 的翻版，也不是把 Spring Boot 变成模型 SDK 的壳子，而是让 Java 后端工程师掌握一套可以承载 AI 应用的分层方法。下一课开始，我们会先把最底层的“模型接入边界”建立起来。
