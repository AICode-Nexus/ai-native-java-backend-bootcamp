# 第1课 Spring Boot 接入模型

## 本课目标

- 用 Spring Boot 把“模型调用”包进稳定后端结构
- 理解直接 HTTP、SDK 调用、统一网关三种接法的取舍
- 为后续 Chat、RAG、Agent 保留统一模型入口

## 本课对应 demo 代码

- 模型边界：[ChatModelGateway.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/ai/model/ChatModelGateway.java)
- 应用入口：[AiNativeBackendApplication.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/AiNativeBackendApplication.java)
- 配置绑定：[InfraProperties.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/bootstrap/config/InfraProperties.java)
- 统一响应：[ApiResponse.java](/Users/admin/Desktop/iflytek/培训/2026/ai-native-java-backend-bootcamp/demo/src/main/java/com/example/ainative/common/api/ApiResponse.java)

## 讲法重点

### 1. 为什么一定要有模型网关

如果 Controller 直接去调 OpenAI 或其他厂商 SDK，后面一旦要切模型、做降级、记录日志、加安全策略，就会把业务层和供应商细节缠在一起。  
所以本课程先抽出 `ChatModelGateway`，哪怕一开始只是 stub，也要把“业务调用模型”和“模型供应商实现”分开。

### 2. Spring Boot 在这里真正提供的价值

Spring Boot 不是只用来“暴露接口”。在 AI 场景里，它最重要的三个作用是：

- 配置绑定：把 `app.ai`、`app.mysql`、`app.redis` 等配置收口到一个可管理模型里
- 依赖注入：让模型网关、检索器、工具注册表和安全策略各自成为独立组件
- 工程统一：测试、配置、日志、过滤器和 CI 都能沿用成熟 Java 工程方式

### 3. 如何从 stub 演进到真实模型

当前 `ChatModelGateway` 里的 `StubChatModelGateway` 是为课程第一阶段服务的。真正接入真实模型时，建议保留同样的接口，只替换实现：

- 先做单一厂商实现
- 再做 provider 配置切换
- 最后再引入多模型路由或成本治理

## 课堂建议

- 用一张时序图解释“Controller -> Service -> Gateway -> Provider”
- 给学员看 `application.yml` 里的 `app.ai.*`
- 强调现在先不追求“接很多模型”，而是先把接入边界站稳

## 常见误区

- 误区一：直接把模型调用写进 Controller
- 误区二：把供应商响应格式一路透传到前端
- 误区三：只顾着调通，不做统一配置模型

## 本课小结

这一课建立的是 AI Service 层的第一块地基。只要模型接入边界清楚，后面不论接 Spring AI、LangChain4j，还是自定义 HTTP 封装，都不会推翻整体结构。下一课我们会把这个边界往上抬，做成真正可用的聊天接口。
