# AI-Native Java Backend Bootcamp

> 面向 AI 应用开发者的 Java 后端训练营仓库

## 这套仓库解决什么问题

这套训练营不是教“Java 如何调用一个模型接口”，而是教“如何用 Java / Spring Boot 构建可上线、可治理、可演进的 AI-Native 后端系统”。

课程主线围绕一个企业知识助手展开，逐步覆盖：

- 模型接入
- 对话接口与流式输出
- Prompt、上下文与结构化结果
- 文件解析、知识入库与 RAG
- Redis、Elasticsearch、向量检索协同
- Tool Calling、Workflow 与异步任务
- AI 工程化治理
- 业务融合与生产化

## 适合谁学

- 主受众：AI 应用开发者
- 兼顾受众：希望补足后端能力的前端工程师
- 主技术栈：Java 21 + Spring Boot 3.x
- 主业务场景：企业知识助手

## 仓库怎么使用

推荐按下面顺序学习：

1. 先读本页，建立课程总地图
2. 启动 `website/` 课程站，从统一入口浏览课程结构
3. 再读对应课程目录下的 `final-content.md`
4. 对照 `demo/` 主项目理解代码边界
5. 最后完成 `课后练习/` 中的分层练习

如果你是授课者，可以把本仓库直接当作课程讲义、代码骨架和练习包来使用。

## 课程总览

| 课程 | 主题 | 课程正文 | 课后练习 | 对应主模块 |
|------|------|----------|----------|------------|
| 第0课 | 认知重构 | [进入课程](./第0课-认知重构/final-content.md) | [练习](./课后练习/第0课/练习.md) | `README` `课程设计文档` |
| 第1课 | Spring Boot 接入模型 | [进入课程](./第1课-Spring-Boot-接入模型/final-content.md) | [练习](./课后练习/第1课/练习.md) | `ai/model` |
| 第2课 | 对话接口与流式输出 | [进入课程](./第2课-对话接口与流式输出/final-content.md) | [练习](./课后练习/第2课/练习.md) | `chat` |
| 第3课 | Prompt、上下文与结构化输出 | [进入课程](./第3课-Prompt-上下文与结构化输出/final-content.md) | [练习](./课后练习/第3课/练习.md) | `chat` `common/api` |
| 第4课 | 文件解析与知识入库 | [进入课程](./第4课-文件解析与知识入库/final-content.md) | [练习](./课后练习/第4课/练习.md) | `knowledge/document` |
| 第5课 | RAG 检索增强 | [进入课程](./第5课-RAG-检索增强/final-content.md) | [练习](./课后练习/第5课/练习.md) | `knowledge/rag` `knowledge/retrieve` |
| 第6课 | Redis、ES、向量检索协同 | [进入课程](./第6课-Redis-ES-向量检索协同/final-content.md) | [练习](./课后练习/第6课/练习.md) | `cache` `search` `vector` |
| 第7课 | Agent 与 Tools | [进入课程](./第7课-Agent-Tools/final-content.md) | [练习](./课后练习/第7课/练习.md) | `agent/tool` |
| 第8课 | Workflow 与 MQ | [进入课程](./第8课-Workflow-与-MQ/final-content.md) | [练习](./课后练习/第8课/练习.md) | `workflow` `task` |
| 第9课 | AI 工程化治理 | [进入课程](./第9课-AI-工程化治理/final-content.md) | [练习](./课后练习/第9课/练习.md) | `ai/safety` `ops` `evals` |
| 第10课 | 业务融合与数据助手 | [进入课程](./第10课-业务融合与数据助手/final-content.md) | [练习](./课后练习/第10课/练习.md) | `dataassistant` |
| 第11课 | 全链路整合与生产化 | [进入课程](./第11课-全链路整合与生产化/final-content.md) | [练习](./课后练习/第11课/练习.md) | 全链路收束与生产演进 |

## `demo/` 主项目里有什么

当前主项目采用“教学友好的模块化单体”，优先把边界和主链路讲清楚，而不是一开始就堆满真实基础设施。

核心目录大致如下：

- `demo/src/main/java/com/example/ainative/ai`
  模型接入边界与安全策略
- `demo/src/main/java/com/example/ainative/chat`
  对话接口、请求响应对象、聊天服务
- `demo/src/main/java/com/example/ainative/knowledge`
  文档上传、切片、RAG、引用、检索接口
- `demo/src/main/java/com/example/ainative/cache`
  会话记忆与热点缓存示例
- `demo/src/main/java/com/example/ainative/search`
  关键词检索示例
- `demo/src/main/java/com/example/ainative/vector`
  向量存储边界
- `demo/src/main/java/com/example/ainative/agent`
  Tool 定义、注册与执行结果
- `demo/src/main/java/com/example/ainative/workflow`
  固定流程编排
- `demo/src/main/java/com/example/ainative/task`
  异步任务发布与消费骨架
- `demo/src/main/java/com/example/ainative/dataassistant`
  业务融合示例，当前为只读 SQL 助手
- `demo/src/main/java/com/example/ainative/ops`
  请求日志、指标等工程治理能力

## 快速开始

### 1. 启动课程网站

```bash
cd website
pnpm install
pnpm dev
```

启动后可访问：

- `http://localhost:3000`
- `http://localhost:3000/learn`

### 2. 运行后端测试

```bash
cd demo
./mvnw test
```

### 3. 启动本地后端服务

```bash
cd demo
./mvnw spring-boot:run
```

### 4. 验证健康检查

启动后可访问：

- `GET /api/health`

## 推荐学习路径

如果你偏后端基础，可以按标准顺序从第 0 课开始。  
如果你已经做过一些 AI 应用，但后端体系感还不够，建议重点看下面三条线：

### 主链路线

- 第1课：模型接入
- 第2课：对话与流式接口
- 第4课：文件解析与知识入库
- 第5课：RAG 检索增强

### 能力扩展线

- 第6课：多检索底座协同
- 第7课：Tool 与 Agent 边界
- 第8课：Workflow 与异步任务

### 工程落地线

- 第9课：治理
- 第10课：业务融合
- 第11课：生产化收束

## 课程资产

当前仓库已经包含：

- 一个独立课程网站 `website/`
- 每课一篇 `final-content.md`
- 每课一份课后练习
- 一个贯穿主项目 `demo/`
- 顶层课程设计文档与演讲大纲
- 基础 CI 检查与最小 evals 样例

## 相关文档

- [课程设计文档.md](./课程设计文档.md)
- [AI-Native-Java项目配置模板.md](./AI-Native-Java项目配置模板.md)
- [演讲大纲.md](./演讲大纲.md)
- [课后练习总览](./课后练习/README.md)
- [课程网站设计文档](./docs/superpowers/specs/2026-04-08-ai-native-java-backend-website-design.md)
- [课程网站实现计划](./docs/superpowers/plans/2026-04-08-ai-native-java-backend-website-implementation.md)

## 公众号 / 获取更新

关注公众号，获取课程更新、训练营通知与相关文章。

- 社区页：[docs/community.md](./docs/community.md)

<p align="left">
  <img src="./docs/assets/wechat-official-account-qrcode.jpg" alt="公众号二维码" width="260" />
</p>
