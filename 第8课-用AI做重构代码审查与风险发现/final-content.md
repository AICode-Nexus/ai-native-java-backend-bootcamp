# 第8课 用 AI 做重构、代码审查与风险发现

## 真实研发场景

业务已经能跑，但代码越积越厚。你知道该重构，也知道要做审查，却总是卡在“改动太大怕出事”“审查太花时间”之间。

## 传统做法的痛点

- 重构入口不好找
- 代码审查容易只看风格，不看风险
- 风险点和行为变化难以提前识别
- 审查结论缺少结构化记录

## AI 能提效到哪一步

AI 适合帮你：

- 标出长方法、重复逻辑和职责漂移
- 生成重构方案候选
- 从 diff 中筛查潜在风险
- 整理审查意见草稿

## 推荐工作流

1. 先锁定现有行为和关键测试
2. 让 AI 输出重构候选点和风险清单
3. 人工选择最小安全改动
4. 修改后重新跑测试或关键验收
5. 把审查结论写成结构化备注

## 与仓库代码和模板的映射

- Tool 与执行结果：[`../demo/src/main/java/com/example/ainative/agent`](../demo/src/main/java/com/example/ainative/agent)
- Workflow 与任务：[`../demo/src/main/java/com/example/ainative/workflow`](../demo/src/main/java/com/example/ainative/workflow)、[`../demo/src/main/java/com/example/ainative/task`](../demo/src/main/java/com/example/ainative/task)
- 测试目录：[`../demo/src/test/java/com/example/ainative`](../demo/src/test/java/com/example/ainative)

## 常见误用与风险

- 没有测试就让 AI 给大规模重构方案
- 只看“更优雅”，不看行为变化
- 把 AI 审查意见原样贴进代码评审
- 修完不补说明，团队无法复用经验

## 课后练习

- 选一个长方法或职责混杂类做重构提案
- 让 AI 给出审查意见，再人工筛选成 3 条高价值结论
- 用测试或 diff 说明为什么这次改动是安全的
