# 第6课 话题分析

## 核心概念

联调和排障阶段最稀缺的不是“猜一个答案”，而是把零散证据组织成可验证的排查路径。AI 的价值在于整理事实、压缩假设空间和结构化复现步骤。

## 目标受众与深度

- 目标受众：经常处理接口联调、环境问题和日志排查的后端工程师
- 深度：中级偏实战
- 阅读目标：学会先给 AI 证据包，再让它做事实整理与排查优先级建议

## 深度杠杆

- 机制：为什么排障效率取决于证据组织，而不是经验喊话
- 失败模式：只贴报错文案、不区分事实与推测、跳过复现步骤
- 实施细节：如何收集请求、响应、日志、配置、代码片段
- 决策规则：AI 可以给假设排序，不能替你宣布根因成立

## 参考素材

- [RequestLogFilter.java](../../../../demo/src/main/java/com/example/ainative/ops/logging/RequestLogFilter.java)
- [HealthController.java](../../../../demo/src/main/java/com/example/ainative/common/health/HealthController.java)
- [ChatController.java](../../../../demo/src/main/java/com/example/ainative/chat/controller/ChatController.java)
- [application.yml](../../../../demo/src/main/resources/application.yml)
