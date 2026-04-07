# 第6课 Redis、ES、向量检索协同

## 先看一个真实问题

很多团队第一次做 RAG，就会问一个非常直接的问题：  
“我们到底该选 Elasticsearch，还是选向量数据库？”

这个问题本身并不完全错，但它隐含了一个危险前提：仿佛系统里只能有一个检索底座。  
真实业务里通常不是这样。知识助手往往同时需要：

- 会话记忆和热点缓存
- 关键词精确检索
- 语义相似召回

所以这节课不只是讲几个中间件，而是讲“检索协同边界”。

## 本课你要拿走什么

- 分清 Redis、关键词检索、向量召回各自负责什么
- 知道为什么混合检索层必须独立出来
- 理解降级逻辑为什么应该属于组合层，而不是散落在业务层

## 本课对应 demo 代码

- 会话记忆边界：[`../demo/src/main/java/com/example/ainative/cache/SessionMemoryStore.java`](../demo/src/main/java/com/example/ainative/cache/SessionMemoryStore.java)
- 关键词检索边界：[`../demo/src/main/java/com/example/ainative/search/KeywordSearchService.java`](../demo/src/main/java/com/example/ainative/search/KeywordSearchService.java)
- 向量检索边界：[`../demo/src/main/java/com/example/ainative/vector/VectorStoreGateway.java`](../demo/src/main/java/com/example/ainative/vector/VectorStoreGateway.java)
- 混合检索：[`../demo/src/main/java/com/example/ainative/knowledge/retrieve/HybridRetriever.java`](../demo/src/main/java/com/example/ainative/knowledge/retrieve/HybridRetriever.java)
- 测试：[`../demo/src/test/java/com/example/ainative/knowledge/retrieve/HybridRetrieverTest.java`](../demo/src/test/java/com/example/ainative/knowledge/retrieve/HybridRetrieverTest.java)

## 为什么一定要拆成三类能力

### Redis 解决的是状态和热点

Redis 最适合做的事情包括：

- 会话记忆
- 高频问答缓存
- Prompt 模板缓存

它的价值在于快、轻、适合状态和热点，但它不应该天然承担知识召回主引擎的职责。

### Elasticsearch 解决的是关键词可解释性

关键词检索最大的优势，是命中规则相对直观，尤其适合：

- 标题命中
- 术语命中
- 精确关键字过滤
- 可解释的搜索逻辑

它的问题是，当用户问法和文档表述差异较大时，纯关键词方案会明显掉召回。

### 向量检索解决的是语义相似

向量召回擅长处理：

- 问法不同但意思接近
- 同义表达
- 描述型问题

但它也有天然代价：

- 结果解释难
- 调参难
- 对明确关键字问题不一定占优

所以真正合理的架构，不是“谁替代谁”，而是“谁负责哪类问题”。

## 为什么要单独做 HybridRetriever

这是这一课最关键的工程设计点。  
如果把降级和组合逻辑写进 `RagService`，业务层很快会背上太多和检索底座相关的细节。更好的做法是：

- 关键词检索负责自己的结果
- 向量召回负责自己的结果
- 混合检索层负责：
  - 合并
  - 去重
  - 降级
  - 排序优先级

这也是当前 demo 里 `HybridRetriever` 的定位。

## 当前 demo 为什么先用内存实现

当前训练营阶段并没有直接接真实 Redis、ES 和向量库，而是先提供最小边界与内存实现。  
这样做的教学价值非常高，因为学员能先看清系统组织关系：

- 记忆是独立层
- 搜索是独立层
- 向量召回是独立层
- 聚合逻辑也是独立层

等这层认知建立后，再把边界替换成真实基础设施，大家理解起来会轻松很多。

## 课堂建议怎么讲

### 第一步：先打破“二选一”思维

告诉学员别急着讨论“到底上 ES 还是向量库”，先问业务场景里有哪些不同类型的问题。

### 第二步：再讲组合层

重点让学员看到 `HybridRetrieverTest` 为什么要测：

- 结果合并
- 去重
- 关键词失败时降级到向量
- 向量失败时降级到关键词

### 第三步：最后落回主链路

说明 `RagService` 之所以能保持干净，是因为检索复杂性已经被收口到了 `Retriever` 这一层。

## 学员最容易踩的坑

- 误区一：把 Redis 当成“万能 AI 存储”
- 误区二：认为上了向量库就不需要关键词检索
- 误区三：把所有降级逻辑写在业务层
- 误区四：一上来就接真实基础设施，反而看不清边界

## 本课小结

这节课真正建立的是检索协同思维。  
从这里开始，系统已经不只是“会回答”，而是开始有了比较成熟的数据底座组织方式。下一课我们会进一步把系统能力扩展到受控工具调用，也就是 Agent 与 Tool 的边界设计。
