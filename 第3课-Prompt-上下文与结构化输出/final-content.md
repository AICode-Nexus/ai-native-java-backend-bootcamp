# 第3课 Prompt、上下文与结构化输出

## 先看一个真实问题

系统到了“会聊天”这一步，很多团队会突然发现一个新问题：  
接口虽然能返回答案，但这个答案不稳定、不好控、也不容易被系统继续消费。

典型表现包括：

- 同样的问题，不同轮次回答风格飘忽
- 会话上下文拼着拼着就失控
- 想让模型返回结构化结果，只能靠前端正则去猜
- 一旦系统要加 RAG、Tool、Workflow，就不知道 Prompt 应该放在哪里组织

所以本课的核心，是把“聊天能力”从可用推进到可控。

## 本课你要拿走什么

- 理解 Prompt 不是随手拼的一段字符串，而是一种受控输入协议
- 知道上下文为什么要独立管理，而不是天然跟着请求跑
- 明白结构化输出是一条工程链路，不只是“让模型返回 JSON”

## 本课和当前 demo 的关系

当前仓库还没有单独拆出 `ai/prompt`、`ai/parser` 这样的目录，但已经有几个很重要的落点：

- 模型调用边界：[`../demo/src/main/java/com/example/ainative/ai/model/ChatModelGateway.java`](../demo/src/main/java/com/example/ainative/ai/model/ChatModelGateway.java)
- 聊天服务层：[`../demo/src/main/java/com/example/ainative/chat/service/ChatService.java`](../demo/src/main/java/com/example/ainative/chat/service/ChatService.java)
- 会话记忆边界：[`../demo/src/main/java/com/example/ainative/cache/SessionMemoryStore.java`](../demo/src/main/java/com/example/ainative/cache/SessionMemoryStore.java)
- 结构化响应示例：[`../demo/src/main/java/com/example/ainative/chat/api/ChatResponse.java`](../demo/src/main/java/com/example/ainative/chat/api/ChatResponse.java)、[`../demo/src/main/java/com/example/ainative/knowledge/rag/api/RagAnswerResponse.java`](../demo/src/main/java/com/example/ainative/knowledge/rag/api/RagAnswerResponse.java)

也就是说，这节课虽然偏方法论，但并不是“空讲概念”，而是在给后面演进真实模块打地基。

## Prompt 为什么必须参数化

很多项目最开始都是这么写的：

```java
String prompt = "你是一个助手，请回答：" + message;
```

这种写法短期快，长期会越来越难维护。  
更合理的 Prompt 结构，至少应该拆成这些部分：

- system role
- user input
- optional context
- output constraint

一旦拆开，后面很多事情才有地方安放：

- 安全规则
- 检索上下文
- 工具结果
- 输出 schema

## 上下文为什么要单独成为能力层

多轮对话最容易掉进一个坑：每一轮都把上一次的消息原样追加进去，最后变成无限长上下文。  
这会带来几个问题：

- token 成本迅速上升
- 模型注意力变差
- 旧信息污染当前回答
- 一旦出错，很难定位是哪段历史导致的

所以正确的问题不是“要不要传上下文”，而是：

- 上下文存在哪
- 按用户还是按会话组织
- 每轮带多少
- 命中失败时如何降级

当前仓库里的 `SessionMemoryStore` 就是在给这件事预留边界。  
即使现在还是最小实现，教学上也必须先把这个插槽讲清楚。

## 结构化输出到底难在哪

很多同学会说：“让模型返回 JSON 不就行了？”  
问题在于，真实系统里的结构化输出至少包含三层约束：

### 第一层：Prompt 约束

告诉模型必须返回什么字段、字段大致含义是什么。

### 第二层：解析约束

即使模型说自己返回的是 JSON，也不代表一定能直接被系统信任。  
你仍然需要校验字段是否存在、格式是否正确、是否缺少关键项。

### 第三层：业务约束

即使解析通过，业务层还要判断这些字段是不是满足系统要求。  
比如：

- `safe` 是否为 true
- `citations` 是否为空
- `mode` 是否合法

所以结构化输出不是“一个 JSON 字符串”，而是一条完整的数据约束链。

## 用当前 demo 能怎么向学员解释这件事

虽然我们还没在 demo 里把 Prompt 模板系统完整实现出来，但已经可以用现有 DTO 让学员理解“结构化输出”的价值。

例如：

- `ChatResponse` 说明聊天返回不应该是一段随意文本
- `UploadDocumentResponse` 说明文档入库结果应该有 `documentId`、`chunkCount`、`status`
- `RagAnswerResponse` 说明知识问答必须显式返回 `answer`、`citations`、`mode`

这类 DTO 就是在告诉学员：AI 的输出必须先被系统吸收成结构化结果，才能进入后续业务。

## 课堂建议怎么讲

### 第一段：先讲“失控”

先用几个反例让学员看到：

- Prompt 乱拼
- 上下文无脑追加
- 前端自己猜结果结构

### 第二段：再讲“边界”

把 Prompt、Memory、Parser 分别讲成三个独立职责，而不是一个大杂烩。

### 第三段：最后落回 demo

让学员看到虽然当前 demo 还没把这三层全部实现完，但接口边界已经留出来了，后续演进非常自然。

## 学员最容易踩的坑

- 误区一：Prompt 直接散落在 Controller 和 Service 里
- 误区二：会话历史不设上限地一直追加
- 误区三：让前端从大段文本里自己抠字段
- 误区四：把“返回 JSON”误解成“结构化输出已经完成”

## 本课小结

这一课解决的是系统可控性问题。  
如果前两课解决的是“模型能接进来、接口能跑起来”，那么这一课解决的就是“怎么让 AI 结果真正成为后端系统的一部分”。下一课开始，我们会把系统输入从一句话扩展到真正的业务知识载体，也就是文档和知识片段。
