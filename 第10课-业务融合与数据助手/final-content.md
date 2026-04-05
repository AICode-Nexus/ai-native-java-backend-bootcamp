# 第10课 业务融合与数据助手

## 本课目标

- 把通用 AI 能力落到具体业务接口
- 用一个只读 SQL 助手讲清 Text-to-SQL 的安全边界
- 让学员理解“AI 能做什么”与“AI 该做到哪一步”不是同一个问题

## 本课对应 demo 代码

- 业务扩展示例：[SqlAssistantController.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/dataassistant/controller/SqlAssistantController.java)
- 安全策略：[SafetyPolicy.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/ai/safety/SafetyPolicy.java)

## 为什么选 SQL 助手做业务融合案例

因为它很典型，也很危险。  
典型在于它体现了 AI 和业务系统的结合方式：自然语言问题 -> 受控推理 -> 结构化结果。  
危险在于一旦边界没画清楚，就会从“查数据助手”滑向“可写数据库代理”。

所以本课只做三件事：

1. 接收业务问题
2. 返回只读 SQL 预览
3. 明确标记 `safe` 和审核前置语义

## 这一课最重要的教学点

### 1. 业务融合不等于把 AI 直接塞进业务核心路径

正确姿势通常是先做增强层：

- 增强查询入口
- 增强文档理解
- 增强操作建议

而不是一上来就让模型直接写表、改状态、发通知。

### 2. “只返回预览”是非常强的工程设计

当前 `SqlAssistantController` 不执行 SQL，只返回预览和安全标记。这能让学员明白：

- 大模型可以参与推理
- 但执行权仍然掌握在业务系统或人工审核手里

### 3. 结构化返回比“看起来能生成 SQL”更重要

一个真正可落地的数据助手，至少要显式返回：

- `sqlPreview`
- `safe`
- `summary`

这些字段决定了接口能不能挂进真实业务流程。

## 横向对比建议

- 纯知识库助手更偏内容理解
- 数据助手更偏规则和安全边界
- 二者可以共享模型、检索、日志、治理能力，但业务接口设计不能混用

## 本课小结

这一课告诉学员，AI 后端真正有价值的地方是“进入业务”，但进入业务的前提永远是边界清楚。下一课我们会把整套能力收束成一份可迁移到生产的蓝图。
