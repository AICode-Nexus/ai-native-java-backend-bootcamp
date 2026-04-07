# AI-Native Java Backend Demo

这是训练营的贯穿主项目，目标是把“企业知识助手”逐步演进为一个具备聊天、RAG、Tool Calling、Workflow 与工程治理能力的 Java AI 后端。

## 这个 demo 当前是什么

当前 `demo/` 的定位不是一个已经完整接好所有基础设施的生产项目，而是：

- 一个教学友好的 Spring Boot 主项目
- 一条可跑通的 AI 后端最小主链路
- 一组清晰的边界抽象和可逐步替换的底层接口

也就是说，这个 demo 优先解决的是：

- 系统怎么分层
- 主链路怎么组织
- 哪些地方应该先抽出边界

而不是一开始就把所有中间件、模型框架和生产基础设施全部接满。

## 当前已实现的教学能力

当前 demo 已具备以下最小主链路：

1. 健康检查与统一响应
2. 同步聊天与流式聊天
3. 文档上传、切片与内存入库
4. RAG 检索回答与引用返回
5. 混合检索边界、Tool Registry、Workflow 骨架
6. 只读 SQL 预览型业务融合示例
7. 安全策略、请求日志、指标门面、最小 evals 与 CI

## 当前主项目的实际工程基础

- Java 21
- Spring Boot 3.x
- `spring-boot-starter-web`
- `spring-boot-starter-validation`
- Reactor Core
- JUnit + Spring Boot Test

## 已预留但未全部落地的配置与基础设施边界

当前仓库已经为后续演进预留了配置和本地基础设施入口，例如：

- `app.ai`
- `app.mysql`
- `app.redis`
- `app.elasticsearch`
- `app.rabbitmq`
- `app.retrieval`
- `app.session`

以及：

- `docker-compose.yml`
- `scripts/start-infra.sh`
- `scripts/stop-infra.sh`
- `scripts/load-sample-data.sh`

这些内容说明仓库在为后续真实基础设施接入做准备，  
但并不等于当前主链路已经全面依赖 MySQL、Redis、Elasticsearch、RabbitMQ 运行。

## 后续可演进的目标方向

当课程主项目从教学 Demo 继续演进时，可以逐步替换为更真实的底层能力，例如：

- 真实模型供应商接入
- Redis 缓存与会话记忆
- Elasticsearch 关键词检索
- 向量数据库
- RabbitMQ 或其他消息队列 / 工作流引擎
- 更完整的模型治理和可观测体系

这里的关键是：  
边界先稳定，底层再替换，而不是推倒重写。

## 快速开始

### 1. 运行测试

```bash
./mvnw test
```

### 2. 启动应用

```bash
./mvnw spring-boot:run
```

### 3. 验证健康检查

可访问：

- `GET /api/health`

## 可选的本地基础设施准备

如果你想提前体验仓库预留的本地基础设施脚本，可以使用：

- `bash scripts/start-infra.sh`
- `bash scripts/stop-infra.sh`
- `bash scripts/load-sample-data.sh`

以及环境变量文件：

- `.env.example`

但对于当前课程主链路学习来说，优先级仍然是先理解边界和代码结构，再逐步接入真实依赖。

## 当前值得重点阅读的目录

- `src/main/java/com/example/ainative/ai`
  模型边界与安全策略
- `src/main/java/com/example/ainative/chat`
  聊天接口与服务
- `src/main/java/com/example/ainative/knowledge`
  文档上传、切片、RAG、引用、检索
- `src/main/java/com/example/ainative/agent`
  Tool 定义、注册与执行结果
- `src/main/java/com/example/ainative/workflow`
  工作流编排
- `src/main/java/com/example/ainative/task`
  异步任务骨架
- `src/main/java/com/example/ainative/dataassistant`
  业务融合示例
- `src/main/java/com/example/ainative/ops`
  日志与指标等治理能力

## 治理与评测

- 安全策略：`src/main/java/com/example/ainative/ai/safety`
- 请求日志：`src/main/java/com/example/ainative/ops/logging`
- 指标门面：`src/main/java/com/example/ainative/ops/metrics`
- 最小 evals：`evals/`
- 测试：`src/test/java/com/example/ainative`

## 公众号 / 获取更新

如果你希望持续获取课程更新、训练营通知与相关文章，可以关注公众号：

- 社区页：[`../docs/community.md`](../docs/community.md)

<p align="left">
  <img src="../docs/assets/wechat-official-account-qrcode.jpg" alt="公众号二维码" width="220" />
</p>
