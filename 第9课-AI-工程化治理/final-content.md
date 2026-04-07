# 第9课 AI 工程化治理

## 先看一个真实问题

很多 AI Demo 在演示阶段都很亮眼：

- 能聊天
- 能检索
- 能调用工具
- 还能做数据问答

但只要你准备把它放进真实业务环境，团队马上会追问几件事：

- 这次回答有没有越界
- 这条 SQL 到底安不安全
- 哪些请求最耗 token
- 工具调用有没有走白名单
- 模型回归质量有没有下降

如果这些问题回答不上来，系统就算“功能做出来了”，也还谈不上真正落地。  
所以这一课不再讨论单点能力，而是讨论另一件更关键的事：

“AI 后端如何从可运行 demo，进入可治理系统。”

## 本课你要拿走什么

- 理解 AI 治理为什么是主链路组成部分，而不是收尾补丁
- 掌握安全、日志、指标、评测、CI 的最小闭环
- 建立“没有治理就没有生产资格”的工程意识

## 本课对应 demo 代码

- 安全策略：[`../demo/src/main/java/com/example/ainative/ai/safety/SafetyPolicy.java`](../demo/src/main/java/com/example/ainative/ai/safety/SafetyPolicy.java)
- 安全测试：[`../demo/src/test/java/com/example/ainative/ai/safety/SafetyPolicyTest.java`](../demo/src/test/java/com/example/ainative/ai/safety/SafetyPolicyTest.java)
- 请求日志：[`../demo/src/main/java/com/example/ainative/ops/logging/RequestLogFilter.java`](../demo/src/main/java/com/example/ainative/ops/logging/RequestLogFilter.java)
- 指标门面：[`../demo/src/main/java/com/example/ainative/ops/metrics/AiMetricsFacade.java`](../demo/src/main/java/com/example/ainative/ops/metrics/AiMetricsFacade.java)
- 回归评测：[`../demo/evals/chat/basic.yaml`](../demo/evals/chat/basic.yaml)、[`../demo/evals/rag/grounded-answer.yaml`](../demo/evals/rag/grounded-answer.yaml)、[`../demo/evals/tools/sql-preview.yaml`](../demo/evals/tools/sql-preview.yaml)
- CI 工作流：[`../.github/workflows/demo-ci.yml`](../.github/workflows/demo-ci.yml)、[`../.github/workflows/docs-check.yml`](../.github/workflows/docs-check.yml)

## 为什么 AI 系统比普通后端更需要治理

普通后端如果少了指标和日志，通常是排障更慢；  
AI 后端如果少了治理，问题会更深一层，因为你甚至不知道系统输出是否可信。

例如下面这些问题，都是 AI 场景独有或被显著放大的：

- 模型是不是在“看起来合理地胡说”
- 检索结果为空时系统有没有错误降级
- SQL 助手有没有越过只读边界
- Tool Calling 有没有调用到未授权工具
- 同样问题今天和昨天的表现是否一致

所以在 AI 后端里，治理层不是一个“外围附属模块”，它和接口层、检索层、工具层一样，都是主链路的一部分。

## 这一课要建立的最小治理闭环是什么

可以把当前 demo 的治理思路拆成五件事。

### 1. 用策略守住底线

`SafetyPolicy` 的职责看起来简单，但非常关键。  
它至少在做两类判断：

- SQL 是否属于只读语句
- 工具名是否在允许列表里

这说明治理的第一层不是“提醒用户谨慎操作”，而是把边界落成后端可执行规则。  
只有规则是代码化的，边界才真正存在。

### 2. 用日志让请求可回放

`RequestLogFilter` 做的事情也很朴素：

- 记录请求方法
- 记录请求 URI
- 记录响应状态
- 记录耗时

这类信息在传统系统里已经很重要，在 AI 系统里更重要，因为模型调用往往跨越多个组件。  
如果入口请求都没有最小日志，你连“是接口超时，还是模型慢，还是检索慢”都很难判断。

### 3. 用指标把成本和性能拉到台面上

`AiMetricsFacade` 当前还不是完整监控系统，但它已经表达出几类关键指标：

- 总请求数
- 总 token 消耗
- 缓存命中
- 按模型或缓存维度记录延迟

这其实是在给学员建立一个非常重要的意识：  
AI 系统的“性能”不只是响应速度，还包括 token 成本、缓存收益和模型路由效果。

### 4. 用 evals 把质量变成回归对象

很多团队最容易忽略这一层。  
他们会手点几个接口，感觉“回答还不错”，就当成验收完成。

但 AI 能力是会漂移的：

- prompt 变了
- 模型变了
- 检索逻辑变了
- 工具输出结构变了

这些变化都可能让旧场景退化。  
所以 `demo/evals/` 的价值，不在文件数量，而在于它把几个关键场景变成了可持续回归的样例：

- 基础聊天
- grounded RAG 回答
- SQL 预览工具

### 5. 用 CI 让治理自动化

`.github/workflows/demo-ci.yml` 和 `docs-check.yml` 的意义也要讲清楚。  
CI 不是“为了仓库显得正规”，而是把最小质量门槛自动化：

- 代码至少要能跑测试
- 核心文档至少要满足基本结构
- 课程仓库不能靠人工记忆维持质量

训练营仓库一旦有了这层自动化，学员才会真正看到“工程化”不是一句口号。

## 为什么 SafetyPolicy 特别适合拿来讲“规则落地”

这一课里最适合做细讲的代码，其实就是 `SafetyPolicy`。  
因为它能把很抽象的“AI 风险控制”落回非常具体的后端表达。

例如：

- `drop`
- `delete`
- `truncate`
- `update`
- `insert`

这些高风险关键字在这里只是第一层防线，但它至少说明一件事：  
风险边界必须先有“机器可执行形式”，不能只停留在课件口头说明。

同样地，`isToolAllowed` 也是在强调：

- Tool 默认不开放
- 只有 allowlist 中的工具才允许执行

这和第 7 课的 Tool Registry 是一条线上的，只是这里把它进一步纳入治理视角。

## 为什么“可观测”不是多打几行日志

课堂上很容易有人说：“把日志打全一点不就行了？”  
但真正的可观测并不等于日志堆积。

AI 场景里的可观测，至少要满足三件事：

1. 你知道一次请求经过了哪些环节
2. 你知道每个环节大概花了多少代价
3. 你知道失败时应该先看哪里

所以课程里最好把三层信息分开讲：

- 日志负责还原请求经过
- 指标负责看整体趋势和成本
- 评测负责验证能力是否退化

三者互补，缺一不可。

## 课堂建议怎么讲

### 第一步：先打破“治理是收尾工作”的误解

可以先问学员一个问题：  
如果你的 SQL 助手今天突然开始生成高风险语句，你怎么知道？

只要这个问题学员答不上来，就能自然引出治理层的重要性。

### 第二步：再用最小代码建立闭环

按下面顺序讲会更顺：

1. `SafetyPolicy` 讲边界
2. `RequestLogFilter` 讲入口观察
3. `AiMetricsFacade` 讲成本和性能
4. `demo/evals/` 讲回归样例
5. CI 讲自动化守门

### 第三步：最后强调“治理不是为了完美，而是为了可持续演进”

训练营里不要求一步做成企业级平台，但要让学员知道最小治理闭环必须从第一版就开始存在。

## 学员最容易踩的坑

- 误区一：功能先做完，治理以后再补
- 误区二：把安全边界写成 prompt 提示，而不是后端规则
- 误区三：把日志、指标、评测混成一件事
- 误区四：评测只靠人工主观感受，不沉淀回归样例

## 本课小结

这一课把整个训练营的视角往前推了一大步。  
从现在开始，系统不再只是“模型接上了、接口能返回”，而是开始具备：

- 边界
- 记录
- 度量
- 回归

下一课我们会把这些能力放进更贴近业务的一类场景里，看看 AI 后端真正进入业务系统时，应该以什么方式融合，而不是冒进地接管业务执行权。
