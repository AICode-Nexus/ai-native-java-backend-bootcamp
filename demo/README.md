# AI-Native Java Backend Demo

这是训练营的贯穿主项目，目标是把“企业知识助手”逐步演进为一个具备聊天、RAG、Tool Calling、Workflow 与工程治理能力的 Java AI 后端。

## 计划中的技术栈

- Java 21
- Spring Boot 3.x
- Spring AI
- LangChain4j
- MySQL
- Redis
- Elasticsearch
- RabbitMQ

## 当前阶段

当前优先完成：

1. 最小 Spring Boot 骨架
2. 健康检查
3. 聊天接口
4. 文档上传、切片与 RAG MVP

## 本地基础设施

通过以下文件启动本地依赖：

- `docker-compose.yml`
- `scripts/start-infra.sh`
- `scripts/stop-infra.sh`
- `scripts/load-sample-data.sh`

## 快速开始

1. 准备环境变量
   - 可直接复制 `.env.example` 为 `.env`
   - 如果没有 `.env`，启动脚本会回退使用 `.env.example`
2. 启动本地依赖
   - `bash scripts/start-infra.sh`
3. 停止本地依赖
   - `bash scripts/stop-infra.sh`

## 当前配置模型

当前通过 `app.*` 命名空间统一绑定：

- `app.ai`
- `app.mysql`
- `app.redis`
- `app.elasticsearch`
- `app.rabbitmq`
- `app.retrieval`
- `app.session`

## 当前主链路

当前 demo 已具备以下最小链路：

1. 健康检查与统一响应
2. 同步聊天与流式聊天
3. 文档上传、切片与内存入库
4. RAG 检索回答与引用返回
5. 混合检索边界、Tool Registry、Workflow 骨架
6. 只读 SQL 预览示例

## 治理与评测

- 安全策略：`src/main/java/com/example/ainative/ai/safety`
- 请求日志：`src/main/java/com/example/ainative/ops/logging`
- 指标门面：`src/main/java/com/example/ainative/ops/metrics`
- 最小 evals：`evals/`
