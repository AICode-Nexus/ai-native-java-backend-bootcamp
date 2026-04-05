# 第5课 RAG 检索增强

## 本课目标

- 把知识片段真正接入回答链路
- 返回带引用的结构化回答
- 明确“检索为空时必须降级”，而不是默默幻觉作答

## 本课对应 demo 代码

- 检索接口：[Retriever.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/knowledge/retrieve/Retriever.java)
- 混合检索实现：[HybridRetriever.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/knowledge/retrieve/HybridRetriever.java)
- RAG 服务：[RagService.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/knowledge/rag/RagService.java)
- 引用模型：[Citation.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/knowledge/citation/Citation.java)
- 接口层：[RagController.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/knowledge/rag/controller/RagController.java)

## 为什么 RAG 是知识助手的分水岭

到了这一课，系统开始从“我会聊天”变成“我会基于知识聊天”。  
对企业知识助手来说，真正有业务价值的不是模型自己编得多漂亮，而是：

- 回答是否基于企业知识
- 是否能指出依据来自哪里
- 没有依据时是否会停下来

这就是 RAG 的核心价值。

## 当前 demo 的最小 RAG 链路

1. 用户提问进入 `RagController`
2. `RagService` 调用 `Retriever`
3. 检索结果被拼成受控上下文 prompt
4. 模型生成 grounded answer
5. 返回 `answer + citations + mode`

这里的重点不是让 prompt 多复杂，而是让链路边界清楚、响应结构可追溯。

## 为什么一定要显式降级

AI 系统里最危险的失败方式之一，是检索失败但回答看起来很像成功。  
所以本课特别强调：如果没有召回结果，就返回 `NO_KNOWLEDGE`，并把这件事变成接口语义，而不是隐藏实现细节。

## 这一课最该反复强调的工程点

- `Retriever` 是接口，不要把检索逻辑写死在 `RagService`
- 引用必须作为结构化字段返回
- 模型只根据受控上下文回答，不直接吃整个知识库

## 常见误区

- 误区一：把 RAG 理解成“先查一下，再随便回答”
- 误区二：只返回 answer，不返回 citations
- 误区三：检索为空时仍然调用模型硬答

## 本课小结

这一课完成后，企业知识助手已经具备了最小可演示价值。下一课我们会进一步讨论：单一检索底座为什么不够，以及 Redis、ES 和向量检索该怎么协同。
