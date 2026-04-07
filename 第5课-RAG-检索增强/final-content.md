# 第5课 RAG 检索增强

## 先看一个真实问题

系统已经能聊天，也能把文档切成知识片段了，但如果没有检索增强，知识片段依然只是“躺在系统里”。  
对用户来说，真正有价值的是：

- 我提问之后，系统能不能基于企业知识回答
- 回答能不能告诉我依据来自哪
- 没查到时，系统会不会坦诚说“我不知道”

这就是 RAG 的意义。  
它不是“先查一下再问模型”这么简单，而是一条受控的回答链路设计。

## 本课你要拿走什么

- 理解 RAG 为什么是知识助手落地的分水岭
- 掌握最小 RAG 链路的核心组成
- 明确“检索为空时必须降级”是接口语义，不是实现细节

## 本课对应 demo 代码

- 检索协议：[`../demo/src/main/java/com/example/ainative/knowledge/retrieve/Retriever.java`](../demo/src/main/java/com/example/ainative/knowledge/retrieve/Retriever.java)
- RAG 服务：[`../demo/src/main/java/com/example/ainative/knowledge/rag/RagService.java`](../demo/src/main/java/com/example/ainative/knowledge/rag/RagService.java)
- RAG 接口：[`../demo/src/main/java/com/example/ainative/knowledge/rag/controller/RagController.java`](../demo/src/main/java/com/example/ainative/knowledge/rag/controller/RagController.java)
- 引用模型：[`../demo/src/main/java/com/example/ainative/knowledge/citation/Citation.java`](../demo/src/main/java/com/example/ainative/knowledge/citation/Citation.java)
- 返回结构：[`../demo/src/main/java/com/example/ainative/knowledge/rag/api/RagAnswerResponse.java`](../demo/src/main/java/com/example/ainative/knowledge/rag/api/RagAnswerResponse.java)
- 测试：[`../demo/src/test/java/com/example/ainative/knowledge/rag/RagServiceTest.java`](../demo/src/test/java/com/example/ainative/knowledge/rag/RagServiceTest.java)、[`../demo/src/test/java/com/example/ainative/knowledge/rag/RagControllerTest.java`](../demo/src/test/java/com/example/ainative/knowledge/rag/RagControllerTest.java)

## 为什么 RAG 是知识助手真正的分水岭

如果没有 RAG，系统能做的事情更接近“通用聊天”；  
有了 RAG，系统才开始变成“企业知识助手”。

这两者的差别不是模型名字，而是回答依据：

- 通用聊天依赖模型已有知识
- 企业知识问答依赖企业自己的知识底座

也正因为如此，RAG 不只是一个技术组件，而是系统可信度的核心来源。

## 当前 demo 的最小 RAG 链路长什么样

可以把当前链路拆成五步：

1. 用户问题进入 `RagController`
2. `RagService` 调用 `Retriever`
3. 系统把召回的片段拼成受控上下文
4. 模型基于上下文生成回答
5. 接口返回 `answer + citations + mode`

这五步里面，真正最值得课堂上讲透的，不是 prompt 文案本身，而是边界：

- 检索负责“找依据”
- 模型负责“组织回答”
- 接口负责“结构化表达”

## 为什么 citations 是必须字段

很多团队会在 RAG 场景里只返回一个 `answer`，然后说“这个回答是基于知识库的”。  
但如果没有引用信息，系统其实无法证明这一点。

引用字段至少承担三层价值：

- 给用户解释依据
- 给业务侧做审核
- 给研发侧做调试和评测

这就是为什么当前 demo 要单独定义 `Citation`，而不是把引用信息埋在一段自然语言说明里。

## 为什么检索为空时一定要显式降级

这是这节课必须反复强调的安全边界。  
在 AI 系统里，最危险的失败方式往往不是报错，而是“检索失败了，但模型还是给出一个看起来合理的答案”。

所以当前 demo 的策略非常明确：

- 有召回结果：返回 `mode=RAG`
- 无召回结果：返回 `mode=NO_KNOWLEDGE`

这件事非常重要，因为它把“系统不知道”变成了一个可观察、可测试、可被上游处理的状态。

## 这节课课堂上可以怎么讲

### 先讲“为什么不能只靠大模型”

用一个企业内部知识问题举例，让学员看到没有 RAG 时模型的局限。

### 再讲“为什么不能只做检索”

只把片段搜出来给用户看，并不能替代受控回答。  
真正有价值的是“检索 + 组织 + 引用”一起形成一个完整接口。

### 最后讲“为什么不能假装知道”

把 `NO_KNOWLEDGE` 这条降级分支讲透，这会直接决定学员是否真的建立了 AI 系统安全意识。

## 当前 demo 中最值得带学员读的点

- `Retriever` 为什么要做成接口
- `RagService` 为什么不直接依赖某个具体检索底座
- `RagController` 为什么返回的是结构化 DTO，而不是纯文本

## 学员最容易踩的坑

- 误区一：把 RAG 理解成“查一下，然后照样自由发挥”
- 误区二：只返回 answer，不返回 citations
- 误区三：检索为空仍然强行调用模型作答
- 误区四：把检索逻辑直接写死在 Service 里

## 本课小结

这一课之后，系统第一次具备了真正可演示的企业知识问答能力。  
下一课我们会继续解决一个非常关键的问题：知识检索并不是靠一个底座就能解决，缓存、关键词检索和向量召回必须协同起来。
