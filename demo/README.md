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

未来通过以下文件启动本地依赖：

- `docker-compose.yml`
- `scripts/start-infra.sh`
- `scripts/stop-infra.sh`
- `scripts/load-sample-data.sh`
