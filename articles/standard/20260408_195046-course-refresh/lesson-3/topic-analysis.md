# 第3课 话题分析

## 核心概念

工程骨架阶段最常见的风险不是“少建了一个包”，而是 AI 帮你一次性搭出过大、过重、过度设计的脚手架，让后续每一课都背着无用结构前进。

## 目标受众与深度

- 目标受众：负责启动新服务、新模块或教学样例工程的后端工程师
- 深度：中级，偏工程化
- 阅读目标：学会用 AI 起草最小可维护骨架，而不是最大模板工程

## 深度杠杆

- 机制：骨架错误会在模块职责、依赖和配置层层放大
- 失败模式：先生成大量包结构、依赖和配置，后续只能被动维护
- 实施细节：如何从 MVP 范围倒推模块与依赖最小集合
- 决策规则：什么叫“暂时不建也没问题”

## 参考素材

- [pom.xml](../../../../demo/pom.xml)
- [AiNativeBackendApplication.java](../../../../demo/src/main/java/com/example/ainative/AiNativeBackendApplication.java)
- [InfraProperties.java](../../../../demo/src/main/java/com/example/ainative/bootstrap/config/InfraProperties.java)
- [application.yml](../../../../demo/src/main/resources/application.yml)
