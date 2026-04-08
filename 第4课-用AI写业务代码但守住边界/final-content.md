# 第4课 用 AI 写业务代码，但守住边界

## 真实研发场景

真正进入编码阶段后，AI 很容易表现得“很勤快”：它能一次写出控制器、服务、DTO、异常处理，甚至连 SQL 都顺手补上。但这些代码常常把边界全写乱。

## 传统做法的痛点

- 业务实现重复、机械、耗时
- 分层规则容易在赶工时被打破
- 新人不容易快速补齐项目风格
- 代码评审成本高

## AI 能提效到哪一步

AI 最适合承担：

- 样板代码生成
- 条件分支补齐
- 参数校验草稿
- 重复逻辑抽取建议

但前提是你要先讲清职责边界。

## 推荐工作流

1. 先写清方法输入、输出和不该做什么
2. 让 AI 只生成单一职责代码块
3. 逐层审查 Controller、Service、Repository 是否串味
4. 运行测试或最小用例验证行为
5. 再做命名和结构收敛

## 与仓库代码和模板的映射

- 聊天控制器：[`../demo/src/main/java/com/example/ainative/chat/controller/ChatController.java`](../demo/src/main/java/com/example/ainative/chat/controller/ChatController.java)
- 聊天服务：[`../demo/src/main/java/com/example/ainative/chat/service/ChatService.java`](../demo/src/main/java/com/example/ainative/chat/service/ChatService.java)
- 数据助手控制器：[`../demo/src/main/java/com/example/ainative/dataassistant/controller/SqlAssistantController.java`](../demo/src/main/java/com/example/ainative/dataassistant/controller/SqlAssistantController.java)

## 常见误用与风险

- 直接让 AI “补全整个功能”
- 不给分层规则，导致控制器变胖
- 只看运行结果，不看代码可维护性
- 把 AI 生成的命名和异常处理原样收下

## 课后练习

- 选一个 `demo/` Service 方法重写职责说明
- 用 AI 生成一版实现，再人工做边界审查
- 补一条覆盖主分支行为的测试
