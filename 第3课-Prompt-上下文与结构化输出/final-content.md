# 第3课 Prompt、上下文与结构化输出

## 本课目标

- 理解 Prompt 不是“一段字符串”，而是一种受控输入协议
- 明确上下文应该放在哪里管理，而不是一路拼接
- 把“文本回答”演进成“结构化结果”

## 本课对应 demo 代码落点

当前仓库还没有单独拆出 `ai/prompt`、`ai/parser` 模块，但已经有三个天然插槽：

- 模型调用边界：[ChatModelGateway.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/ai/model/ChatModelGateway.java)
- 聊天业务层：[ChatService.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/chat/service/ChatService.java)
- 会话记忆边界：[SessionMemoryStore.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/cache/SessionMemoryStore.java)

## 这一课最重要的认知

### 1. Prompt 要参数化

不要在 Service 里随手拼：

`"你是一个助手，请回答：" + message`

更合理的方式是先拆分：

- system role
- user input
- retrieved context
- output constraint

这样后面才能安全地加规则、加引用、加结构化约束。

### 2. 上下文不应该天然跟着请求跑

真正的对话系统一定会遇到这些问题：

- 会话历史放在哪里
- 每轮传多少上下文
- 是按用户存，还是按会话存
- 上下文命中失败时如何降级

所以本课虽然不急着把 Memory 做复杂，但要先让学员知道：上下文应该是一个独立能力层，而不是每个 Controller 自己处理。

### 3. 结构化输出是工程能力，不是“让模型返回 JSON”这么简单

结构化输出至少包含三层约束：

- 提示词约束：告诉模型必须输出哪些字段
- 解析层约束：对字段做校验和兜底
- 业务层约束：不让非法字段继续流向下游

在当前 demo 中，`ChatResponse`、`RagAnswerResponse`、`UploadDocumentResponse` 都是在为这件事打基础。

## 课堂建议

- 用一次“纯文本返回”和“一次结构化返回”做对比
- 讲清 `Prompt -> Model -> Parser -> DTO` 的职责边界
- 明确后续接 Spring AI / LangChain4j 时，Prompt 和 Memory 应该挂到哪里

## 常见误区

- 误区一：Prompt 直接散落在 Controller 和 Service 中
- 误区二：把完整会话历史无脑拼给模型
- 误区三：让前端自己从大段文本里正则提取字段

## 本课小结

这一课解决的是“怎么把 AI 结果变得可控”。下一课开始，系统不再只处理用户一句话，而是要能处理外部文档，让企业知识真正进入后端能力链。
