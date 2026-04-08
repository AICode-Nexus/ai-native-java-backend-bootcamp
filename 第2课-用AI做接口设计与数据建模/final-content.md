# 第2课 用 AI 做接口设计与数据建模

## 真实研发场景

需求已经明确，但你还没写代码。真正影响后续返工成本的，常常是接口契约、字段命名、错误码、数据结构有没有先设计清楚。

## 传统做法的痛点

- DTO、VO、错误码和状态定义经常一边写一边改
- 表结构和接口契约缺少统一讨论稿
- 设计评审成本高，很多问题只能在联调时暴露

## AI 能提效到哪一步

AI 可以帮你快速生成：

- 接口草图
- 字段说明
- 状态流转候选
- 错误场景清单

但最终契约必须由工程师拍板。

## 推荐工作流

1. 提供业务背景、已有接口和约束条件
2. 让 AI 先产出契约草图，不直接产代码
3. 重点审查命名、必填字段、兼容性和异常场景
4. 确认后再进入 DTO、实体或 SQL 设计
5. 最终以文档或测试样例锁定契约

## 与仓库代码和模板的映射

- 聊天接口：[`../demo/src/main/java/com/example/ainative/chat/api`](../demo/src/main/java/com/example/ainative/chat/api)
- RAG 接口：[`../demo/src/main/java/com/example/ainative/knowledge/rag/api`](../demo/src/main/java/com/example/ainative/knowledge/rag/api)
- 统一响应：[`../demo/src/main/java/com/example/ainative/common/api/ApiResponse.java`](../demo/src/main/java/com/example/ainative/common/api/ApiResponse.java)

## 常见误用与风险

- 让 AI 直接给出最终表结构，不审查业务语义
- 把错误处理、权限标记和兼容字段遗漏掉
- 接口文档和真实实现口径不一致
- 命名看起来整齐，但与当前项目风格脱节

## 课后练习

- 为 `demo/` 现有接口补一版契约说明
- 用 AI 产出字段表，再人工删掉冗余字段
- 补一组接口成功 / 失败示例输入输出
