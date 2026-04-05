# 第4课 文件解析与知识入库

## 本课目标

- 让系统接受 `txt` / `md` 文档上传
- 完成文本切片与内存入库
- 为后续 RAG 检索准备可引用的知识片段

## 本课对应 demo 代码

- 上传入口：[DocumentController.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/knowledge/document/controller/DocumentController.java)
- 入库服务：[DocumentIngestService.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/knowledge/document/service/DocumentIngestService.java)
- 切片器：[TextChunker.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/knowledge/document/service/TextChunker.java)
- 片段模型：[DocumentChunk.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/knowledge/document/model/DocumentChunk.java)

## 这一课真正要讲的不是“上传文件”

上传只是入口，真正关键的是把文档从“文件”变成“可检索知识”。  
这个转换至少包含三步：

1. 读取内容
2. 按稳定规则切片
3. 给每个片段生成可追踪身份

如果这三步没做清楚，后面的引用、检索、向量入库和评测都会变得混乱。

## 为什么切片规则要稳定

当前 `TextChunker` 使用固定 `chunkSize + overlap`。这不是最智能的切法，但它有一个很重要的优点：稳定。  
对训练营教学来说，稳定比复杂更重要，因为学员需要先建立以下认知：

- 为什么不能整篇文档直接送给模型
- 为什么片段之间要保留重叠
- 为什么每个 chunk 需要 `chunkId`

等这些认知建立后，再引入语义切片、段落边界感知、标题增强等进阶策略才有意义。

## 入库为什么先放内存

这门课当前阶段把入库存进 `ConcurrentHashMap`，不是因为生产上应该这么做，而是为了让教学先聚焦“链路完整性”。  
一旦上传、切片、存储和获取都能稳定跑通，后续替换成 ES、向量库、对象存储时，大家看到的是“底座替换”，而不是“主链路重写”。

## 课堂建议

- 现场上传一份 markdown 文档
- 打印切片前后长度对比
- 让学员观察 `documentId`、`chunkId`、`sequence` 这些字段为什么必要

## 常见误区

- 误区一：文件上传成功就等于知识入库完成
- 误区二：切片大小随手拍脑袋，不做重叠
- 误区三：切完之后不保留来源信息

## 本课小结

这一课把“文档”转成了“知识片段”。下一课开始，这些片段会真正进入回答链路，变成带引用的 RAG 能力。
