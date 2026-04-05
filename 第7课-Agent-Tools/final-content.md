# 第7课 Agent 与 Tools

## 本课目标

- 把模型调用工具这件事变成受控的工程能力
- 建立工具注册、执行结果和 allowlist 约束
- 明确 Tool 不等于直接访问数据库或系统命令

## 本课对应 demo 代码

- 工具定义：[ToolDefinition.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/agent/tool/ToolDefinition.java)
- 工具注册表：[ToolRegistry.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/agent/tool/ToolRegistry.java)
- 执行结果：[ToolExecutionResult.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/agent/executor/ToolExecutionResult.java)

## 为什么 Tool Calling 在企业场景里这么敏感

知识助手只“回答问题”时，风险主要是幻觉；一旦开始“调用工具”，风险马上升级成执行风险。  
比如：

- 查数据库
- 调用内部搜索
- 触发工作流
- 改写业务状态

所以这一课的核心不是让模型“尽可能聪明”，而是让工具系统“足够受控”。

## 注册表为什么一定要有 allowlist

当前 demo 的 `ToolRegistry` 做了三件很关键的事：

1. 工具必须先注册
2. 名称不能重复
3. 只有 allowlist 内工具才能执行

这三点听起来简单，但它们决定了系统后续能不能扩到生产环境。没有 allowlist 的 Tool Calling，本质上是在给模型开后门。

## 这一课要重点区分的两个概念

### Tool

Tool 是一个边界清晰、输入输出明确、受控可审计的能力单元。

### Agent

Agent 是一个会决定“什么时候用哪个 Tool”的策略层。  
也就是说，Tool 是资源接口，Agent 是调度策略，不要把两者糊成一个万能 Service。

## 课堂建议

- 先展示一个非法工具调用为什么要被拒绝
- 再展示同名工具重复注册为什么是工程风险
- 最后让学员理解：工具越强，注册表和安全策略越重要

## 常见误区

- 误区一：把 Tool 写成直接暴露底层数据库连接
- 误区二：所有工具都默认开放
- 误区三：把错误吞掉，只返回“执行失败”

## 本课小结

这一课建立的是“模型可以调用能力，但不能乱调用能力”的基础。下一课会把工具调用放入固定工作流和异步任务，让长链路任务真正可观察。
