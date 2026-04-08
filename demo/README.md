# Java Backend 示例项目

这是训练营的教学示例项目，不再承担“课程最终要一步步搭出的 AI 产品”角色。

它现在的主要用途是：

- 给主线课程提供真实后端代码阅读素材
- 给需求拆解、接口设计、重构、测试补齐和排障练习提供对象
- 让学员在真实的 Java / Spring Boot 项目结构里练习如何与 AI 协作

## 这个示例项目当前是什么

当前 `demo/` 的定位是：

- 一个教学友好的 Spring Boot 示例工程
- 一组分层相对清晰的后端模块
- 一批适合被 AI 辅助阅读、改造、验证和文档化的代码样本

也就是说，它优先解决的是：

- 如何给 AI 足够上下文
- 如何让 AI 在真实代码里提建议
- 如何验证 AI 给出的改动、测试和排障结论

而不是要求你把它继续做成完整的生产 AI 系统。

## 为什么它仍然值得保留

虽然主线课程已经从“AI-Native 后端系统建设”切到“AI 辅助后端研发”，但这个示例项目仍然很有价值，因为它天然适合拿来做：

- 需求理解与任务拆解
- 接口契约阅读与补全
- DTO、服务边界和模块职责讨论
- 测试补齐与回归样例生成
- 日志分析、异常排查和文档交接

## 当前可重点阅读的目录

- `src/main/java/com/example/ainative/chat`
  适合做接口设计、控制器与服务边界分析
- `src/main/java/com/example/ainative/knowledge`
  适合做复杂流程阅读、测试补齐和风险识别
- `src/main/java/com/example/ainative/agent`
  适合做工具边界、权限风险和结构审查练习
- `src/main/java/com/example/ainative/workflow`
  适合做长链路流程理解和故障排查练习
- `src/main/java/com/example/ainative/dataassistant`
  适合做只读边界、接口约束和风险评审练习
- `src/test/java/com/example/ainative`
  适合做测试生成、回归补齐和行为验证练习

## 推荐的使用方式

### 1. 先跑测试，再阅读代码

```bash
./mvnw test
```

### 2. 用课程中的结构化问题阅读模块

例如：

- 这个接口真正的输入输出边界是什么
- 哪些逻辑不该写在 Controller
- 这一组测试还缺哪些边界样例
- 如果线上报错，第一轮日志排查该怎么收敛

### 3. 让 AI 参与，但不要跳过验证

推荐最少做下面几步：

1. 给 AI 明确上下文
2. 让 AI 产出结构化建议
3. 人工筛选方案
4. 用测试、构建或日志验证结果

## 快速开始

### 1. 运行测试

```bash
./mvnw test
```

### 2. 启动应用

```bash
./mvnw spring-boot:run
```

### 3. 验证健康检查

- `GET /api/health`

## 与进阶专题的关系

如果你想把这个示例项目继续朝 AI 产品和 AI 系统方向推进，可以配合阅读：

- `../进阶专题/专题1-模型接入与AI能力边界/final-content.md`
- `../进阶专题/专题2-RAG与企业知识系统/final-content.md`
- `../进阶专题/专题3-Tools-Workflow-与-Agent-边界/final-content.md`
- `../进阶专题/专题4-AI系统治理与生产化/final-content.md`

这样就能把“AI 辅助研发”与“AI 系统建设”两条能力线分开理解。
