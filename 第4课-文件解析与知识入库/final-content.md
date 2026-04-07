# 第4课 文件解析与知识入库

## 先看一个真实问题

聊天接口做出来之后，系统仍然有一个明显短板：它只能回答模型“原本知道”的东西。  
但企业知识助手真正有价值的地方，恰恰是回答企业自己的文档、制度、产品说明、FAQ 和内部知识。

问题是，文档并不能直接拿来问答。  
一份文档从“文件”变成“可检索知识”，中间至少要经过一条明确的处理链：

1. 上传
2. 读取
3. 清洗
4. 切片
5. 入库

这节课要解决的，就是这条链路的第一阶段。

## 本课你要拿走什么

- 理解为什么文件上传不是知识入库的终点，而只是入口
- 掌握稳定切片在 AI 系统里的作用
- 明确知识片段为什么必须保留可追踪元信息

## 本课对应 demo 代码

- 上传入口：[`../demo/src/main/java/com/example/ainative/knowledge/document/controller/DocumentController.java`](../demo/src/main/java/com/example/ainative/knowledge/document/controller/DocumentController.java)
- 入库服务：[`../demo/src/main/java/com/example/ainative/knowledge/document/service/DocumentIngestService.java`](../demo/src/main/java/com/example/ainative/knowledge/document/service/DocumentIngestService.java)
- 切片器：[`../demo/src/main/java/com/example/ainative/knowledge/document/service/TextChunker.java`](../demo/src/main/java/com/example/ainative/knowledge/document/service/TextChunker.java)
- 片段模型：[`../demo/src/main/java/com/example/ainative/knowledge/document/model/DocumentChunk.java`](../demo/src/main/java/com/example/ainative/knowledge/document/model/DocumentChunk.java)
- 测试：[`../demo/src/test/java/com/example/ainative/knowledge/document/service/TextChunkerTest.java`](../demo/src/test/java/com/example/ainative/knowledge/document/service/TextChunkerTest.java)、[`../demo/src/test/java/com/example/ainative/knowledge/document/controller/DocumentControllerTest.java`](../demo/src/test/java/com/example/ainative/knowledge/document/controller/DocumentControllerTest.java)

## 为什么“上传成功”不等于“知识可用”

这是这节课最重要的认知之一。  
一个文件上传成功，只说明字节流进入了系统；它并不代表：

- 内容已经可读
- 结构已经可检索
- 片段已经可引用
- 后续 RAG 可以真正利用它

所以课程里必须把“文件处理链路”讲清楚，而不是停留在文件接口层面。

## 为什么切片是 RAG 之前必须跨过的一道坎

文档不能整篇扔给模型，原因很直接：

- 太长
- 成本高
- 检索精度差
- 引用粒度太粗

所以系统要先把文档切成“可管理、可引用、可召回”的片段。  
当前 demo 里的 `TextChunker` 用的是最小可教版本：

- 固定 `chunkSize`
- 固定 `overlap`
- 保证切片规则稳定

这不是最智能的切法，但非常适合作为训练营第一阶段，因为它能先把学员的注意力集中在“为什么切”和“怎么稳定切”上，而不是过早陷入复杂切片算法。

## 为什么 overlap 不是可有可无

很多初学者会问，为什么片段之间还要重叠？  
因为语义信息经常跨越边界。如果你完全无重叠切分，很容易把一个完整语义切成两半，导致：

- 单片段信息不完整
- 检索结果断裂
- 回答上下文缺少关键前后文

所以 overlap 的意义，不是“让片段更多”，而是“降低语义断裂风险”。

## 为什么每个片段都要有元信息

当前 demo 的 `DocumentChunk` 至少保留了：

- `documentId`
- `chunkId`
- `sourceName`
- `sequence`
- `content`

这几个字段看起来普通，但它们是后面很多能力的基础：

- RAG 引用时要知道来源
- 检索时要知道片段身份
- 调试时要能回溯文档来源
- 向量化时要能做稳定 upsert

如果前面这一步偷懒，后面越往后做，返工就越大。

## 当前 demo 为什么先用内存入库

这里很值得在课堂上专门讲一下。  
当前 `DocumentIngestService` 用 `ConcurrentHashMap` 暂存片段，不是因为生产上应该这么做，而是因为教学上要先固定主链路。

如果这一课一上来就把 Elasticsearch、向量数据库、对象存储全部接进来，学员会更容易把注意力放到“中间件搭建”而不是“知识链路理解”上。

所以训练营当前阶段的正确顺序是：

1. 先把上传、切片、存储主链路跑通
2. 再把底层存储逐步替换成真实检索底座

## 建议课堂怎么讲 demo

### 第一步：先讲接口

从 `DocumentController` 入手，告诉学员系统先支持 `txt` / `md` 文件，这样输入面足够简单。

### 第二步：再讲切片

从 `TextChunkerTest` 反推设计意图，让学员理解“稳定规则”和“重叠”不是实现细节，而是知识质量问题。

### 第三步：最后讲入库服务

让学员看到 `DocumentIngestService` 并不是单纯保存文件，而是在构造“后续 RAG 能消费的片段集合”。

## 学员最容易踩的坑

- 误区一：文件上传成功就等于知识已经可用
- 误区二：切片大小随手拍脑袋，不考虑 overlap
- 误区三：切片后不保留来源和序号
- 误区四：还没跑通链路就急着上复杂基础设施

## 本课小结

这一课完成后，系统第一次真正拥有了“外部知识进入系统”的入口。  
下一课开始，我们会让这些知识片段进入回答链路，做成带引用、可降级、可追溯的 RAG 能力。
