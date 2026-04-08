# 专题2 RAG 与企业知识系统

## 这个专题解决什么问题

当系统开始依赖企业文档、知识片段和引用链路时，后端要处理的就不再只是普通接口，而是知识进入、召回、组织和回答依据。

## 与主线课程如何衔接

主线课程中你会学到如何用 AI 帮你读代码、补测试和做分析。  
这个专题则回答：如果 AI 本身要消费企业知识，后端系统该怎样建。

## 当前仓库可重点阅读的位置

- [`../../demo/src/main/java/com/example/ainative/knowledge/document`](../../demo/src/main/java/com/example/ainative/knowledge/document)
- [`../../demo/src/main/java/com/example/ainative/knowledge/rag`](../../demo/src/main/java/com/example/ainative/knowledge/rag)
- [`../../demo/src/main/java/com/example/ainative/knowledge/retrieve`](../../demo/src/main/java/com/example/ainative/knowledge/retrieve)

## 重点问题

- 文件如何进入系统
- 片段、元数据和引用怎样组织
- 检索为空时系统如何降级

## 推荐阅读顺序

1. 先看上传与切片
2. 再看检索与回答
3. 最后看引用和混合召回边界
