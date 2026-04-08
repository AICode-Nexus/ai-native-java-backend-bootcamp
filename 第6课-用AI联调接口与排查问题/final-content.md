# 第6课 用 AI 联调接口与排查问题

## 真实研发场景

接口一到联调阶段，最常见的不是“代码完全不跑”，而是返回值不对、日志看不懂、上下游互相怀疑，排查路径越走越散。

## 传统做法的痛点

- 日志多但没有整理
- 排查过程高度依赖个人经验
- 接口契约、错误码、环境配置经常割裂
- 问题复现步骤无法沉淀

## AI 能提效到哪一步

AI 适合帮助你：

- 总结日志重点
- 对照接口契约找异常点
- 压缩排查路径
- 整理复现步骤与修复候选

## 推荐工作流

1. 收集请求、响应、日志、异常栈和相关代码片段
2. 让 AI 先做事实整理，不先下结论
3. 再让 AI 给出可能原因和优先排查顺序
4. 人工逐项验证，不跳步
5. 最后把复现与修复路径沉淀为问题记录

## 与仓库代码和模板的映射

- 聊天控制器：[`../demo/src/main/java/com/example/ainative/chat/controller`](../demo/src/main/java/com/example/ainative/chat/controller)
- 请求日志：[`../demo/src/main/java/com/example/ainative/ops/logging`](../demo/src/main/java/com/example/ainative/ops/logging)
- 统一响应：[`../demo/src/main/java/com/example/ainative/common/api`](../demo/src/main/java/com/example/ainative/common/api)

## 常见误用与风险

- 只把报错文本丢给 AI，不给上下文
- 让 AI 直接判断“根因”，却不核对证据
- 把联调问题说成代码问题，其实是契约问题
- 修复了问题却没有沉淀排查记录

## 课后练习

- 选一个测试失败或接口异常场景，整理证据包
- 让 AI 帮你排序排查路径
- 输出一份复现步骤和最终结论
