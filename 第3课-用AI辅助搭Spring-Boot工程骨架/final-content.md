# 第3课 用 AI 辅助搭 Spring Boot 工程骨架

## 真实研发场景

你准备开一个新的后端服务，最容易陷入两种极端：要么先手搓所有骨架，要么让 AI 一口气生成一堆目录和类，最后没人能维护。

## 传统做法的痛点

- 模块边界靠感觉定
- 工程骨架与实际业务不贴合
- 新项目容易复制旧包袱
- 一开始就把复杂基础设施和模板全接进来

## AI 能提效到哪一步

AI 适合在骨架阶段帮助你：

- 列模块职责
- 草拟包结构
- 生成最小配置
- 输出目录与类职责说明

## 推荐工作流

1. 先定义服务边界和第一版用例
2. 让 AI 输出 2 到 3 套模块切分方案
3. 选择最小可维护结构，而不是最大最全结构
4. 再让 AI 生成骨架代码和说明
5. 立刻补一个最小测试或健康检查验证骨架可用

## 与仓库代码和模板的映射

- Spring Boot 入口：[`../demo/src/main/java/com/example/ainative/AiNativeBackendApplication.java`](../demo/src/main/java/com/example/ainative/AiNativeBackendApplication.java)
- 配置绑定：[`../demo/src/main/java/com/example/ainative/bootstrap/config`](../demo/src/main/java/com/example/ainative/bootstrap/config)
- 应用配置：[`../demo/src/main/resources/application.yml`](../demo/src/main/resources/application.yml)

## 常见误用与风险

- 让 AI 直接造“大而全模板工程”
- 目录多但职责不清
- 还没想好边界就先生成十几个模块
- 生成后不做编译和测试验证

## 课后练习

- 为一个新服务列出最小模块边界
- 用 AI 生成一版骨架，再删到只剩必要目录
- 补一个健康检查或最小接口测试
