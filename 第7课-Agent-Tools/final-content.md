# 第7课 Agent 与 Tools

## 先看一个真实问题

系统做到知识问答之后，业务方通常很快就会提出新的期待：

- 能不能直接帮我查数据库
- 能不能根据问题自动调用内部搜索
- 能不能把结果进一步加工成可执行动作

这时系统就从“只回答”进入“可能执行动作”的阶段了。  
一旦跨过这个点，风险也会同步升级。AI 系统出错，不再只是“说错了”，还可能变成“做错了”。

所以这节课讲的不是“怎么让模型更聪明地调用工具”，而是“怎么把工具调用变成受控的工程能力”。

## 本课你要拿走什么

- 理解 Tool 和 Agent 不是一回事
- 掌握工具注册、执行结果和 allowlist 的最小设计
- 明白为什么 Tool Calling 的核心不是功能多，而是边界清楚

## 本课对应 demo 代码

- 工具定义：[`../demo/src/main/java/com/example/ainative/agent/tool/ToolDefinition.java`](../demo/src/main/java/com/example/ainative/agent/tool/ToolDefinition.java)
- 工具注册表：[`../demo/src/main/java/com/example/ainative/agent/tool/ToolRegistry.java`](../demo/src/main/java/com/example/ainative/agent/tool/ToolRegistry.java)
- 执行结果：[`../demo/src/main/java/com/example/ainative/agent/executor/ToolExecutionResult.java`](../demo/src/main/java/com/example/ainative/agent/executor/ToolExecutionResult.java)
- 测试：[`../demo/src/test/java/com/example/ainative/agent/tool/ToolRegistryTest.java`](../demo/src/test/java/com/example/ainative/agent/tool/ToolRegistryTest.java)

## Tool 和 Agent 到底怎么区分

这是这一课最需要讲清楚的概念。

### Tool 是什么

Tool 是一个受控能力单元，它至少要满足：

- 有唯一名称
- 输入输出边界明确
- 可注册、可限制、可审计

Tool 更像“系统能力接口”。

### Agent 是什么

Agent 则更像“策略和决策层”。  
它会决定：

- 要不要调用工具
- 调哪个工具
- 调用结果如何继续进入下一步

所以 Tool 是资源能力，Agent 是调度逻辑。  
如果把两者糊在一个类里，系统很快就会失控。

## 为什么 Tool Registry 必须成为独立组件

当前 demo 的 `ToolRegistry` 做的事情看起来不复杂，但每一条都很关键：

1. 工具必须先注册
2. 名称不能重复
3. 未注册工具要返回显式错误
4. 不在 allowlist 里的工具禁止执行

这四件事本质上是在把“模型想调用工具”这件事，从一种不稳定冲动，变成可治理的后端能力。

## 为什么 allowlist 是 Tool Calling 的底线

如果没有 allowlist，Tool Calling 在企业系统里几乎不可能放心上线。  
因为模型一旦能够随意枚举和尝试工具，后果会非常危险：

- 越权访问
- 调用错误工具
- 执行风险放大
- 审计边界模糊

所以这节课一定要让学员建立一个非常明确的认知：

“工具默认不是开放的，而是默认关闭、按白名单开启。”

## 当前 demo 的教学价值在哪

当前仓库还没有做真正的模型驱动 Tool Calling，但已经把最核心的工程骨架立起来了：

- Tool 的定义形式
- Registry 的注册和查找规则
- 执行结果的结构化表达

这使得后续无论接：

- LangChain4j Tools
- Spring AI Tool Calling
- 自定义 Agent 编排

都不会推翻当前设计。

## 课堂建议怎么讲

### 第一步：先讲风险升级

先让学员明确，系统从“回答”升级到“调用工具”之后，风险等级已经变了。

### 第二步：再讲注册表

把 `ToolRegistryTest` 当成课堂主材料来讲最合适。  
因为它直接暴露了设计意图：

- 为什么不允许重复注册
- 为什么未注册必须显式报错
- 为什么 allowlist 是底线

### 第三步：最后讲 Agent 的位置

告诉学员，当前我们是在先搭好“工具系统”，而不是急着上“万能 Agent”。  
这是非常重要的教学顺序。

## 学员最容易踩的坑

- 误区一：把 Tool 写成直接暴露底层数据库或系统权限
- 误区二：所有工具默认都开放
- 误区三：出错时只返回“失败”，不暴露明确错误语义
- 误区四：把 Tool 和 Agent 混成一个万能服务

## 本课小结

这一课建立的是 Tool Calling 的工程底座，而不是花哨的智能代理。  
当工具系统边界先站稳后，下一课我们才有资格去讨论另一件事：长链路任务应该如何进入固定工作流和异步任务系统。
