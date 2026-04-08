# 第5课 话题分析

## 核心概念

测试与回归不是 AI 的附属用途，而是后端研发里最容易形成稳定收益的协作场景之一。关键不在于让 AI 多写几个测试名，而在于让它帮助工程师枚举行为、补齐样例和组织回归集合。

## 目标受众与深度

- 目标受众：需要维护接口测试、服务测试和最小回归集合的后端工程师
- 深度：中级
- 阅读目标：学会先锁行为，再让 AI 参与场景枚举、样例生成和回归整理

## 深度杠杆

- 机制：为什么没有验证资产时，AI 生成实现的收益会被返工吞掉
- 失败模式：只补 happy path、断言脆弱、样例不贴业务、回归清单没人维护
- 实施细节：如何从行为矩阵出发生成测试与 evals
- 决策规则：哪些用例值得写成自动化，哪些适合放回归清单

## 参考素材

- [ChatControllerTest.java](../../../../demo/src/test/java/com/example/ainative/chat/controller/ChatControllerTest.java)
- [ChatServiceTest.java](../../../../demo/src/test/java/com/example/ainative/chat/service/ChatServiceTest.java)
- [RagServiceTest.java](../../../../demo/src/test/java/com/example/ainative/knowledge/rag/RagServiceTest.java)
- [demo/evals](../../../../demo/evals)
