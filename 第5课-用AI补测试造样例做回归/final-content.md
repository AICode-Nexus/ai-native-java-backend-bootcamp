# 第5课 用 AI 补测试、造样例、做回归

## 真实研发场景

很多团队让 AI 帮忙写功能，却没有把它用到测试和回归环节，最后交付速度看似变快，返工却越来越多。

## 传统做法的痛点

- 边界样例想不全
- 测试命名和断言质量参差不齐
- 回归清单经常靠经验和记忆
- 新需求上线前缺少稳定的验证集合

## AI 能提效到哪一步

AI 很适合：

- 枚举边界场景
- 生成测试数据
- 整理回归清单
- 补齐错误路径断言

## 推荐工作流

1. 先明确要验证的行为，而不是先问 AI 写什么测试
2. 让 AI 输出场景清单和断言候选
3. 人工筛选最关键的行为路径
4. 生成测试样例或回归表
5. 真实运行测试，别把“看起来合理”当成通过

## 与仓库代码和模板的映射

- 聊天控制器测试：[`../demo/src/test/java/com/example/ainative/chat/controller`](../demo/src/test/java/com/example/ainative/chat/controller)
- 切片器测试：[`../demo/src/test/java/com/example/ainative/knowledge/document/service`](../demo/src/test/java/com/example/ainative/knowledge/document/service)
- RAG、Tool、Workflow 测试：[`../demo/src/test/java/com/example/ainative`](../demo/src/test/java/com/example/ainative)

## 常见误用与风险

- 让 AI 一次生成大量脆弱测试
- 只补 happy path，不补异常和边界
- 测试断言与业务规则脱节
- 不实际运行测试就默认“应该没问题”

## 课后练习

- 选一个现有模块补 3 条边界测试
- 让 AI 生成一版回归清单，再人工删掉低价值项
- 至少运行一次测试并记录结果
