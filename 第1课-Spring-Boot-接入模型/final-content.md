# 第1课 Spring Boot 接入模型

## 先看一个真实问题

很多 Java 团队第一次接模型时，最常见的做法是：

1. 在 Controller 里收请求
2. 直接用 HTTP 或 SDK 调模型
3. 把供应商原始结果直接返回前端

这个做法的最大问题不是“不优雅”，而是后面几乎所有能力都会变难做：

- 切换模型难
- 统一日志难
- 做安全策略难
- 写测试难
- 做多模型路由更难

所以本课的真正目标，不是“把模型调通”，而是“把模型接入封装成后端系统的稳定边界”。

## 本课你要拿走什么

- 理解直接 HTTP、SDK 封装、统一模型网关三种接法
- 明确为什么 Spring Boot 适合承载 AI 服务边界
- 知道模型接入应该和业务接口分层，而不是混在 Controller 中

## 本课对应 demo 代码

- 模型网关边界：[`../demo/src/main/java/com/example/ainative/ai/model/ChatModelGateway.java`](../demo/src/main/java/com/example/ainative/ai/model/ChatModelGateway.java)
- Spring Boot 入口：[`../demo/src/main/java/com/example/ainative/AiNativeBackendApplication.java`](../demo/src/main/java/com/example/ainative/AiNativeBackendApplication.java)
- 配置绑定：[`../demo/src/main/java/com/example/ainative/bootstrap/config/InfraProperties.java`](../demo/src/main/java/com/example/ainative/bootstrap/config/InfraProperties.java)
- 应用配置：[`../demo/src/main/resources/application.yml`](../demo/src/main/resources/application.yml)
- 统一响应结构：[`../demo/src/main/java/com/example/ainative/common/api/ApiResponse.java`](../demo/src/main/java/com/example/ainative/common/api/ApiResponse.java)

## 三种模型接入方式，分别适合什么阶段

### 方式一：直接 HTTP 调用

优点：

- 最直接
- 依赖少
- 易于理解

缺点：

- 供应商细节暴露太多
- 业务代码容易和模型参数耦合
- 后续切换模型时改动范围大

这种方式适合学员理解“模型调用到底发生了什么”，但不适合作为课程主项目的长期结构。

### 方式二：直接使用供应商 SDK

优点：

- 调用效率高
- 一些参数和流式能力封装较完善
- 与供应商能力贴合更紧

缺点：

- 容易把 SDK API 直接渗透到业务层
- 迁移供应商时成本高
- 写统一测试桩不够自然

### 方式三：统一模型网关

这是本训练营推荐的方式。  
当前 demo 里的 `ChatModelGateway` 虽然还是 stub 实现，但接口边界已经明确：

- 上层业务只关心“我要一个回答”
- 下层供应商实现负责“怎么调用模型”

这意味着后续无论接：

- Spring AI
- LangChain4j
- 自定义 HTTP 封装

都不需要推翻业务层和接口层。

## 为什么 Spring Boot 在这里很合适

Spring Boot 在 AI 场景下，不只是“方便暴露 REST 接口”，更重要的是三件事：

### 1. 配置绑定

AI 后端会迅速出现一堆配置项：

- 模型 provider
- API key
- base URL
- 模型名称
- 检索参数
- 缓存参数

如果这些配置散落在代码里，后面会非常难管。  
当前 demo 用 `InfraProperties` 把 `app.ai`、`app.mysql`、`app.redis` 等收口，这就是工程化的第一步。

### 2. 依赖注入

一旦模型接入层被定义为独立组件，Spring Boot 的依赖注入优势就会很明显：

- 上层调用者不用知道具体实现
- 测试里容易替换 stub / mock
- 后续切换供应商不会影响 Controller

### 3. 测试与工程统一

Java 团队真正的优势，不是“语言更快”，而是工程边界更稳定。  
在当前仓库里，模型边界、配置绑定、测试入口和 CI 可以天然放在一套统一结构下，这正是 Spring Boot 的价值。

## 当前 demo 是怎么组织模型接入边界的

可以把当前设计理解成三步：

1. `ChatModelGateway` 定义统一模型调用协议
2. `StubChatModelGateway` 先提供一个教学阶段可用实现
3. 业务层只依赖网关接口，不依赖供应商 SDK

这个结构的意义在于：哪怕现在用的是 stub，实现仍然是工程上正确的。  
等后面接真实模型时，只需要把 stub 换成 provider 实现，而不是重写整条主链路。

## 这节课课堂上可以怎么讲

### 第一步：先展示一个“坏例子”

比如伪代码：

```java
@PostMapping("/chat")
public Object chat(@RequestBody Map<String, Object> body) {
    // 直接调第三方 SDK
}
```

让学员先看到这种写法为什么短期快、长期痛。

### 第二步：再展示当前仓库做法

从 `Controller -> Service -> ChatModelGateway` 这个调用方向讲。  
强调“现在虽然还是 stub，但边界已经对了”。

### 第三步：最后讲演进路径

推荐给学员一条很实用的演进顺序：

1. 先定义统一接口
2. 再用 stub 跑通主链路
3. 再替换真实模型 provider
4. 最后再做多模型路由和成本治理

## 学员最容易踩的坑

- 误区一：直接把供应商 SDK 写进 Controller
- 误区二：把模型响应结构直接原样暴露给前端
- 误区三：把配置项零散写进业务代码
- 误区四：一上来就追求多模型路由，反而没把第一层边界站稳

## 本课小结

这一课的产出不是“终于能请求模型了”，而是“终于有了一个正确的模型接入边界”。  
只要这层边界稳定，后面的聊天、RAG、工具调用和工作流都能在同一套后端结构上自然长出来。下一课，我们就把这个边界继续往上抬，做成真正可被业务使用的聊天接口。
