# 第2课 对话接口与流式输出

## 本课目标

- 建立同步聊天接口 `/api/chat`
- 建立最小流式接口 `/api/chat/stream`
- 让学员理解“模型可调用”与“业务可使用”之间还差一层 API 设计

## 本课对应 demo 代码

- 控制器：[ChatController.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/chat/controller/ChatController.java)
- 服务层：[ChatService.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/chat/service/ChatService.java)
- 请求响应：[ChatRequest.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/chat/api/ChatRequest.java)、[ChatResponse.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/chat/api/ChatResponse.java)

## 同步接口为什么重要

很多团队一上来就迷恋流式输出，但对大多数业务接入来说，同步接口依然是最容易被其他系统消费的入口。  
比如后台管理系统、工作流节点、审核平台、BI 报表系统，更容易消费结构化的同步响应。

所以本课强调先把同步接口做“稳定、统一、可测试”，再补流式输出。

## 流式接口为什么仍然必须讲

AI 场景下，用户对时延的感知和传统 API 很不一样。  
当回答需要 5 到 15 秒生成时，如果一直等完整结果再返回，前端体验会明显变差。SSE 的意义不只是“看起来更炫”，而是：

- 更快给用户反馈
- 更适合模型 token 逐步返回
- 更容易在 Web 环境里落地

当前 demo 里用 `StreamingResponseBody` 输出 `text/event-stream`，足够讲清 Java 侧的最小流式形态。

## 这节课要强调的接口设计点

- 请求体不要直接透传供应商格式
- 响应体必须统一包裹在 `ApiResponse`
- 流式接口也要有明确的内容类型和错误边界

## 横向对比建议

- WebSocket 更适合双向会话和复杂连接状态，不是本课主线
- 长轮询在 AI 场景体验和成本都不占优
- Python/FastAPI、Go/Gin、NestJS 对比样例可以帮助学员理解“流式接口的语言差异在框架写法，不在能力本质”

## 常见误区

- 误区一：同步和流式做两套互不相干的业务逻辑
- 误区二：为了流式而直接把底层 SDK 输出暴露给前端
- 误区三：只验证 happy path，不测响应头和事件格式

## 本课小结

这一课的本质，是把模型能力包装成真正可消费的后端接口。下一课我们会继续解决一个更难的问题：如何让聊天结果“更可控”，而不是简单地把消息送给模型。
