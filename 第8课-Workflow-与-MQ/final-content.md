# 第8课 Workflow 与 MQ

## 本课目标

- 理解 Workflow 与 Agent 的边界差异
- 把“上传 -> 解析 -> 切片 -> 入库 -> 通知”做成固定流程
- 让失败路径变成可观察状态，而不是静默丢失

## 本课对应 demo 代码

- 工作流服务：[KnowledgeWorkflowService.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/workflow/KnowledgeWorkflowService.java)
- 任务发布：[KnowledgeIngestTaskPublisher.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/task/KnowledgeIngestTaskPublisher.java)
- 任务消费：[KnowledgeIngestTaskConsumer.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/task/KnowledgeIngestTaskConsumer.java)

## Agent 和 Workflow 到底有什么不同

这是很多学员最容易混淆的一节课。

### Agent 适合做“开放式决策”

比如根据上下文决定调用哪个工具、决定是否先检索再回答。

### Workflow 适合做“固定流程编排”

比如知识入库这条链路，步骤相对确定：

- 上传
- 解析
- 切片
- 入库
- 通知

这类流程不需要模型每一步都参与判断，更需要的是稳定、可回放、可监控。

## 为什么知识入库天然适合异步

文档上传、解析和入库通常比聊天接口更耗时，也更容易受基础设施波动影响。  
如果全部放进同步请求里，会遇到：

- 超时
- 重试困难
- 用户体验差
- 错误定位难

所以当前 demo 先做最小发布/消费骨架，让学员看到 MQ 思维方式，而不是只会在 Controller 里同步串调用。

## 这一课要反复强调的工程点

- 失败步骤要显式记录在结果里
- 通知步骤不能吞掉前面的上下文
- Workflow 结果要能被测试验证，而不只是“看日志猜”

## 常见误区

- 误区一：把 Workflow 写成一大坨 if/else
- 误区二：把所有长任务都塞进 Agent
- 误区三：流程失败后没有明确状态可读

## 本课小结

到这里，系统已经不仅能回答问题，还能承载长链路任务。下一课开始，我们要从“能力能跑”进入“能力可治理”。
