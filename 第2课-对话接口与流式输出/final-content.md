# 第2课 对话接口与流式输出

## 先看一个真实问题

把模型接通之后，很多团队会以为“后端已经有 AI 能力了”。其实还没有。  
因为模型能被调用，和业务系统能稳定消费模型能力，是两件完全不同的事。

如果系统没有一层清晰的聊天 API，马上就会出现这些问题：

- 前端不知道该如何约束请求和解析响应
- 不同接口返回格式不一致
- 流式输出和同步输出写成两套不兼容逻辑
- 测试很难验证“接口契约”而只能人工点页面看

所以本课的重点，是把模型接入升级成真正的“聊天能力接口”。

## 本课你要拿走什么

- 理解同步聊天接口为什么依然重要
- 了解 SSE 为什么是 Web 里最适合入门 AI 流式输出的方式
- 掌握同步和流式接口的统一边界设计

## 本课对应 demo 代码

- 控制器：[`../demo/src/main/java/com/example/ainative/chat/controller/ChatController.java`](../demo/src/main/java/com/example/ainative/chat/controller/ChatController.java)
- 服务层：[`../demo/src/main/java/com/example/ainative/chat/service/ChatService.java`](../demo/src/main/java/com/example/ainative/chat/service/ChatService.java)
- 请求体：[`../demo/src/main/java/com/example/ainative/chat/api/ChatRequest.java`](../demo/src/main/java/com/example/ainative/chat/api/ChatRequest.java)
- 响应体：[`../demo/src/main/java/com/example/ainative/chat/api/ChatResponse.java`](../demo/src/main/java/com/example/ainative/chat/api/ChatResponse.java)
- 控制器测试：[`../demo/src/test/java/com/example/ainative/chat/controller/ChatControllerTest.java`](../demo/src/test/java/com/example/ainative/chat/controller/ChatControllerTest.java)

## 为什么同步接口不能被跳过

很多人一提 AI 接口，就直接想到“流式输出”。  
但在真实系统里，同步接口仍然有非常高的价值：

- 后台管理系统更容易消费
- 工作流节点更容易串联
- 接口契约更容易写测试
- 对很多低延迟场景来说，同步响应已经足够

所以更合理的做法是：

1. 先把同步接口做稳定
2. 再把流式能力作为增强层补上

当前 demo 的 `/api/chat` 就是在做这件事。

## 为什么流式输出仍然必须讲

AI 场景的一个典型特征，是用户对“开始返回”的敏感度往往高于对“最终完成”的敏感度。  
换句话说，用户未必要求你 1 秒内完整答完，但他通常希望马上看到系统开始工作。

SSE 很适合做这件事，因为它：

- 基于普通 HTTP，更容易接进现有 Web 系统
- 前端消费简单
- 非常适合 token / chunk 逐步返回

对 Java 后端学员来说，SSE 也是一个很好的切入点：它足够实用，但不会像 WebSocket 那样一上来就把连接状态管理复杂度推高。

## 当前 demo 的接口设计，为什么是这样的

### 同步接口

`POST /api/chat`

职责非常明确：

- 接收结构化请求体
- 调用 `ChatService`
- 把结果统一包进 `ApiResponse`

这让接口具备两个非常重要的工程属性：

- 可以稳定写自动化测试
- 后面切换底层模型实现时，不需要改前端契约

### 流式接口

`POST /api/chat/stream`

当前 demo 用的是 `text/event-stream + StreamingResponseBody`。  
这不是唯一实现方式，但非常适合作为教学样例，因为它能把以下概念直接讲清楚：

- 流式输出也属于 API 契约的一部分
- 内容类型必须明确
- 服务层最好同时暴露同步和流式能力，而不是做两套分裂逻辑

## 建议课堂上一定要强调的设计点

### 1. 请求和响应不要直接暴露供应商格式

一旦把底层供应商的字段原样暴露给前端，未来切 SDK 或切 provider 的时候，接口契约就会连带崩掉。

### 2. 同步与流式要共享同一条业务边界

同步和流式的差异，应该主要体现在“返回形式”，而不是“业务逻辑完全分叉”。

### 3. 测试不只测 200，还要测接口语义

当前 `ChatControllerTest` 不只是验证状态码，还验证：

- `$.success`
- `$.data.answer`
- `$.data.model`
- SSE 接口的内容类型和数据片段

这才叫真正的接口契约测试。

## 课堂里可以怎么讲 demo

可以按下面顺序带学员读代码：

1. 先看 `ChatRequest` / `ChatResponse`
2. 再看 `ChatService`
3. 最后看 `ChatController`

这样学员会先理解“接口契约长什么样”，再理解“控制器怎么把契约落到代码里”。

如果要现场演示，可以直接给两条示例：

```bash
curl -X POST http://localhost:8080/api/chat \
  -H 'Content-Type: application/json' \
  -d '{"message":"hello"}'
```

```bash
curl -N -X POST http://localhost:8080/api/chat/stream \
  -H 'Content-Type: application/json' \
  -d '{"message":"hello"}'
```

## 学员最容易踩的坑

- 误区一：同步接口和流式接口做两套完全不同的业务逻辑
- 误区二：为了快，把底层 SDK 的 chunk 直接暴露给前端
- 误区三：流式接口只靠页面目测，不写自动化测试
- 误区四：只想着“能流出来”，不考虑错误边界和内容类型

## 本课小结

这一课的核心不是“我们已经能聊天了”，而是“我们已经把模型能力变成了可被业务系统稳定消费的 API”。  
下一课开始，我们会继续往前走，解决一个更本质的问题：怎么让系统从“能回答”变成“可控地回答”。
