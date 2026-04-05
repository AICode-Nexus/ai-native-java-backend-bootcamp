# 第9课 AI 工程化治理

## 本课目标

- 把 AI 后端从“可运行 demo”推进到“可治理系统”
- 建立安全策略、请求日志、指标门面和最小 evals
- 让学员形成“没有治理就不算落地”的工程意识

## 本课对应 demo 代码

- 安全策略：[SafetyPolicy.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/ai/safety/SafetyPolicy.java)
- 请求日志：[RequestLogFilter.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/ops/logging/RequestLogFilter.java)
- 指标门面：[AiMetricsFacade.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/ops/metrics/AiMetricsFacade.java)
- 回归评测：[demo/evals/](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/evals)
- CI 工作流：[demo-ci.yml](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/.github/workflows/demo-ci.yml)、[docs-check.yml](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/.github/workflows/docs-check.yml)

## 为什么治理在 AI 场景里不是锦上添花

传统系统中，没有指标和日志会让排障变慢；AI 系统中，没有治理会让你根本不知道系统是否可信。  
比如：

- SQL 助手有没有生成高风险语句
- Tool 调用有没有越权
- RAG 回答是否真正 grounded
- 哪些请求缓存命中，哪些请求耗 token

这类问题如果没有治理层，很快就会让 Demo 无法继续演进。

## 这一课要让学员建立的最小闭环

### 安全

`SafetyPolicy` 至少要能判断：

- SQL 是否只读
- 工具是否在白名单中

### 可观测

`RequestLogFilter` 和 `AiMetricsFacade` 先不追求全量指标，而是先把请求链路、模型调用、缓存命中这些关键入口预留出来。

### 评测

`demo/evals/` 不是为了凑目录，而是为了提醒学员：AI 能力需要回归样例，不是人手点几下就算验收。

### 自动化

CI 的意义不是形式化，而是让仓库在文档和代码两个面向都能自动做最小检查。

## 常见误区

- 误区一：治理等功能做完再补
- 误区二：把安全策略写成前端提示语
- 误区三：把评测理解成“人工感受还不错”

## 本课小结

治理层一旦补上，主项目就开始有了“训练营之外也能继续演进”的资格。下一课我们会把这些通用能力放进一个更贴近业务的场景里。
