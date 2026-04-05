# 第6课 Redis、ES、向量检索协同

## 本课目标

- 讲清 Redis、关键词检索、向量召回各自的职责
- 建立可降级的混合检索边界
- 避免把所有“检索问题”都粗暴扔给一个底座

## 本课对应 demo 代码

- 会话记忆边界：[SessionMemoryStore.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/cache/SessionMemoryStore.java)
- 关键词检索边界：[KeywordSearchService.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/search/KeywordSearchService.java)
- 向量检索边界：[VectorStoreGateway.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/vector/VectorStoreGateway.java)
- 混合检索聚合：[HybridRetriever.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/knowledge/retrieve/HybridRetriever.java)

## 为什么一定要拆成三层

### Redis 解决的是“状态”和“热点”

Redis 更适合做：

- 会话记忆
- 高频问题缓存
- prompt 模板缓存

它不是拿来直接做知识召回主引擎的。

### Elasticsearch 解决的是“关键词可解释性”

ES 的优势在于：

- 命中规则直观
- 对精确字段、标题、关键词短语更友好
- 便于做搜索结果解释

但它对语义相近、表达差异大的问题支持有限。

### 向量库解决的是“语义相似”

向量召回擅长处理“问法不一样但意思接近”的场景，但也容易出现：

- 召回结果不好解释
- 相似度阈值难调
- 精确关键字不如关键词检索稳定

所以这门课强调的不是“选一个赢家”，而是先把边界拆清，再通过 `HybridRetriever` 做组合与降级。

## 当前 demo 的教学重点

当前 demo 并没有接真实 ES/向量数据库，而是先做边界层和最小内存实现。这样学员能先理解：

- 为什么 `Retriever` 不应该直接绑定某一种检索底座
- 为什么降级逻辑应该放在组合层
- 为什么“检索失败”要被当成正常工程分支处理

## 课堂建议

- 用一组问题分别演示关键词命中和语义命中
- 说明混合检索的合并去重逻辑
- 让学员从 `HybridRetrieverTest` 反推设计意图

## 常见误区

- 误区一：把 Redis 当成“万能 AI 存储”
- 误区二：认为上了向量库就不需要关键词检索
- 误区三：把降级逻辑写进 RAG Service，而不是独立检索层

## 本课小结

这一课的本质，是建立 AI 检索底座的工程边界。下一课开始，系统会从“能检索”进一步进化为“能受控调用工具”。
