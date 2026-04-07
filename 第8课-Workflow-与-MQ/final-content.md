# 第8课 Workflow 与 MQ

## 先看一个真实问题

前面几课我们已经把知识上传、切片、检索、问答这些能力逐步搭起来了。  
但只要系统开始接真实文档，很快就会遇到一个新问题：

- 文档解析很慢
- 某一步偶尔失败
- 用户请求不可能一直同步等着
- 运维同学想知道到底卡在了哪一步

这时系统面对的就不再是“回答质量”问题，而是“长链路任务如何稳定执行”问题。

例如一条知识入库链路，通常至少包含：

1. 接收上传
2. 发布任务
3. 解析文档
4. 文本切片
5. 存储片段
6. 发送通知

这类链路如果继续塞在一个同步接口里，短期看起来简单，长期一定会出问题。  
所以这一课要做的，就是把“知识处理链”从普通接口调用，升级成可编排、可失败、可观察的工作流。

## 本课你要拿走什么

- 理解 Agent、Workflow、MQ 分别负责什么
- 掌握固定流程在 AI 后端中的最小设计方式
- 明白为什么“失败步骤可见”比“流程看起来跑完了”更重要

## 本课对应 demo 代码

- 工作流主服务：[`../demo/src/main/java/com/example/ainative/workflow/KnowledgeWorkflowService.java`](../demo/src/main/java/com/example/ainative/workflow/KnowledgeWorkflowService.java)
- 任务发布：[`../demo/src/main/java/com/example/ainative/task/KnowledgeIngestTaskPublisher.java`](../demo/src/main/java/com/example/ainative/task/KnowledgeIngestTaskPublisher.java)
- 任务消费：[`../demo/src/main/java/com/example/ainative/task/KnowledgeIngestTaskConsumer.java`](../demo/src/main/java/com/example/ainative/task/KnowledgeIngestTaskConsumer.java)
- 测试：[`../demo/src/test/java/com/example/ainative/workflow/KnowledgeWorkflowServiceTest.java`](../demo/src/test/java/com/example/ainative/workflow/KnowledgeWorkflowServiceTest.java)

## 为什么这件事不能继续交给 Agent

这一课最容易讲乱的地方，就是 Agent 和 Workflow 的边界。

### Agent 更适合开放式决策

比如：

- 先检索再回答，还是直接回答
- 调哪个工具更合适
- 一轮工具调用后是否继续推理

这类问题有不确定性，适合让模型参与决策。

### Workflow 更适合固定流程编排

知识入库链路其实是高度确定的：

- 上传之后一定要发布任务
- 发布之后一定要进入解析
- 解析成功后才能切片
- 切片成功后才能存储
- 存储结束后才能通知

这条链路的关键不在“模型如何自由思考”，而在“系统如何稳定执行既定步骤”。

所以这一课要让学员形成一个非常稳的认知：

“Agent 解决开放式决策，Workflow 解决固定式执行。不要把一切长链路都包装成 Agent。”

## Workflow 和 MQ 到底分别解决什么问题

很多人会把这两个词一起说，但它们并不是一回事。

### Workflow 解决的是步骤编排

Workflow 要回答的是：

- 这条链路一共有几步
- 步骤顺序是什么
- 哪一步失败了
- 最终状态是什么

在当前 demo 里，`KnowledgeWorkflowService` 就承担了这个角色。  
它把整条知识入库链路显式表达成：

- `upload`
- `parse`
- `chunk`
- `store`
- `notify`

而且每一步都会生成 `WorkflowStepResult`。

### MQ 解决的是异步解耦

MQ 要回答的是：

- 任务如何从当前请求线程里脱离
- 生产者和消费者如何解耦
- 高峰流量怎么削峰
- 某些任务失败后如何重试

当前 demo 里的 `KnowledgeIngestTaskPublisher` 和 `KnowledgeIngestTaskConsumer` 还是最小骨架，但已经把思路立起来了：

- Publisher 只负责发布任务
- Consumer 只负责执行任务步骤
- Workflow Service 负责组织流程状态

这三层一旦拆开，后面无论换成 Kafka、RabbitMQ，还是接真正的工作流引擎，结构都不会推翻重来。

## 当前 demo 的最小工作流链路长什么样

这一段非常适合带着学员对着代码走一遍。

`KnowledgeWorkflowService#run` 做了四件核心事情：

1. 创建一个带 `taskId` 的入库任务
2. 调用 `publisher.publish(task)`，把“上传完成”转换成任务发布
3. 顺序执行 `parse -> chunk -> store -> notify`
4. 把每一步执行结果收集成 `WorkflowRunResult`

这段代码的教学价值很高，因为它把“长链路任务”从口头描述变成了真正可测试的数据结构：

- 有总状态：`COMPLETED` / `FAILED`
- 有步骤列表：`steps`
- 有失败位置：哪一步出错一眼可见
- 有失败信息：`message`

这比“控制台里打一堆日志”强得多。

## 为什么显式暴露失败步骤特别重要

这是这一课最值得反复强调的工程点。

AI 后端里最怕的不是失败，而是失败不可见。  
如果知识入库失败后你只得到一句“处理失败”，会立刻出现几个问题：

- 前端无法告诉用户当前任务卡在哪里
- 运维无法判断是解析失败还是存储失败
- 开发无法做针对性重试
- 后续工作流平台也无法承接状态迁移

当前测试 `KnowledgeWorkflowServiceTest` 很适合拿来讲这件事：

- 一条用例验证全链路正常完成
- 一条用例故意让 `store` 步骤失败
- 断言最终结果必须显式停在失败步骤

这说明课程不是在讲“流程看起来能跑”，而是在讲“流程是否真正可观测、可验证”。

## 为什么当前 demo 先用同步骨架而不直接上真正 MQ

这节课很容易被学员带偏到中间件安装和运维细节。  
但训练营当前阶段真正要教的，不是某个 MQ 产品，而是异步任务的思维模型。

所以当前 demo 有意选择：

- 用内存列表保存已发布任务
- 用一个最小 Consumer 执行步骤
- 用 Service 层显式组织状态

这套做法的好处是：

- 先讲清流程边界
- 先讲清状态表达
- 先讲清失败位置
- 再在后续演进里替换底层基础设施

教学顺序如果反过来，学员很容易只记住 Kafka topic 和消息格式，却没真正理解为什么这条链路需要异步。

## 课堂建议怎么讲

### 第一步：先把它和前几课串起来

告诉学员，我们前面解决的是：

- 文件如何进入系统
- 文档如何切片
- 片段如何参与 RAG

而这一课解决的是：  
“这些前置能力如何在长链路里稳定跑起来。”

### 第二步：直接读测试，不急着读实现

`KnowledgeWorkflowServiceTest` 是最好的课堂入口。  
因为测试直接暴露了设计意图：

- 为什么步骤顺序是固定的
- 为什么失败时要提前终止
- 为什么结果里必须包含步骤明细

### 第三步：最后再讲演进路径

可以明确告诉学员，当前 demo 只是第一层：

- 现在是内存 Publisher / Consumer
- 下一步可以接消息队列
- 再下一步可以接工作流引擎

但无论底层怎么升级，流程编排思想不变。

## 学员最容易踩的坑

- 误区一：把所有长链路任务都塞回同步接口
- 误区二：把固定流程误写成“万能 Agent”
- 误区三：失败后只有日志，没有结构化状态
- 误区四：一上来就钻进 MQ 选型，却没先讲清流程边界

## 本课小结

这一课建立的是 AI 后端里的异步工作流意识。  
当系统开始承载上传、入库、通知、批处理这类任务时，真正重要的不是“有没有 MQ”，而是“流程是否清晰、状态是否可见、失败是否可控”。

下一课我们会把系统再往前推进一步：当能力越来越多之后，为什么“能跑”还远远不够，AI 系统必须进入工程化治理阶段。
