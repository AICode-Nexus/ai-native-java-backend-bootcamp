# 专题1 模型接入与 AI 能力边界

## 这个专题解决什么问题

当 AI 不只是辅助研发，而是真正进入业务系统时，第一层问题就是：模型能力应该如何接进后端系统，才能可替换、可测试、可治理。

## 与主线课程如何衔接

主线课程讲的是“如何用 AI 提效后端研发”。  
这个专题开始讲“如果我要做 AI 产品或 AI 系统，后端应该怎样接住模型能力”。

## 当前仓库可重点阅读的位置

- [`../../demo/src/main/java/com/example/ainative/ai/model`](../../demo/src/main/java/com/example/ainative/ai/model)
- [`../../demo/src/main/java/com/example/ainative/bootstrap/config`](../../demo/src/main/java/com/example/ainative/bootstrap/config)
- [`../../demo/src/main/resources/application.yml`](../../demo/src/main/resources/application.yml)

## 重点问题

- 模型供应商细节应该停留在哪一层
- 业务层如何避免直接依赖模型 SDK
- 配置、日志和测试桩该怎样组织

## 推荐阅读顺序

1. 先看模型网关接口
2. 再看配置绑定
3. 最后再看如何向上承接业务接口
