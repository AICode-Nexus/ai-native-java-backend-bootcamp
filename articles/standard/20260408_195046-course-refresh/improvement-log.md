# 主线课程增厚迭代记录

## 背景

第 1 轮已经完成 12 节主线课 `final-content.md` 的整体扩写，并通过了站点构建与抽查验证。继续迭代时发现，正文已经具备可读性，但 `课后练习/第0课` 到 `课后练习/第11课` 仍然偏提纲式，和正文的密度、可执行性不匹配。

## Iteration 1

- Target: 解决练习文件过薄、只能当提示词而不能直接布置的问题
- Change: 为 12 节练习统一引入 `练习定位 / 准备材料 / 基础题 / 进阶题 / 挑战题 / 建议交付物 / 验收要点` 结构
- Metrics:
  - Actionability: 3/5 -> 5/5
  - Richness and Coverage: 2/5 -> 4/5
  - Information Density: 2/5 -> 4/5
- Decision: keep

## Iteration 2

- Target: 让练习和仓库真实材料建立更强映射，减少“泛泛练习”
- Change: 为每一课补充真实文件、目录、测试、eval 或 CI 工作流链接，优先引用 `demo/`、顶层文档和 `.github/workflows/`
- Metrics:
  - Evidence and Examples: 3/5 -> 5/5
  - Technical Depth: 3/5 -> 4/5
  - Actionability: 5/5 -> 5/5
- Decision: keep

## Iteration 3

- Target: 提升练习的复用性和验收清晰度，避免只加字数
- Change: 为大多数练习补充可复用输入模板、边界提醒、最低完成标准和验收点
- Metrics:
  - Clarity: 4/5 -> 5/5
  - Actionability: 5/5 -> 5/5
  - Repetition Control: 4/5 -> 4/5
- Decision: keep

## Iteration 4

- Target: 补齐练习体系的统一入口与共享提交方法，减少“单课写厚了，但整体使用方式仍然模糊”的问题
- Change: 升级 `课后练习/README.md`，新增 `课后练习/通用提交模板.md`，并补充第 0 课正文到本课练习的直接入口
- Metrics:
  - Clarity: 5/5 -> 5/5
  - Actionability: 5/5 -> 5/5
  - Richness and Coverage: 4/5 -> 5/5
- Decision: keep

## Iteration 5

- Target: 让正文里的 `课后练习` 段与扩写后的练习体系真正连通，避免用户读完正文后仍要自己找入口和交付方式
- Change: 为 12 节主线课的 `## 课后练习` 统一补充单课练习入口、通用提交模板入口和最小交付提示
- Metrics:
  - Actionability: 5/5 -> 5/5
  - Clarity: 5/5 -> 5/5
  - Evidence and Examples: 5/5 -> 5/5
- Decision: keep

## Iteration 6

- Target: 让仓库入口文档和课程设计文档与新的练习体系保持一致，避免读者在顶层文档里看到旧口径
- Change: 更新 `README.md` 和 `课程设计文档.md` 中关于练习入口、统一结构、最小交付和通用模板的说明
- Metrics:
  - Clarity: 5/5 -> 5/5
  - Richness and Coverage: 5/5 -> 5/5
  - Actionability: 5/5 -> 5/5
- Decision: keep

## Iteration 7

- Target: 让网站入口页和授课大纲也接入新的练习体系，避免线上学习入口与线下讲法继续脱节
- Change: 更新 `website/src/app/page.tsx`、`website/src/app/learn/page.tsx`、`website/src/lib/site-content.ts` 和 `演讲大纲.md`，补充练习总览、通用提交模板和最小交付提示
- Metrics:
  - Clarity: 5/5 -> 5/5
  - Actionability: 5/5 -> 5/5
  - Evidence and Examples: 5/5 -> 5/5
- Decision: keep

## 本次迭代影响范围

- `课后练习/第0课/练习.md`
- `课后练习/第1课/练习.md`
- `课后练习/第2课/练习.md`
- `课后练习/第3课/练习.md`
- `课后练习/第4课/练习.md`
- `课后练习/第5课/练习.md`
- `课后练习/第6课/练习.md`
- `课后练习/第7课/练习.md`
- `课后练习/第8课/练习.md`
- `课后练习/第9课/练习.md`
- `课后练习/第10课/练习.md`
- `课后练习/第11课/练习.md`
- `课后练习/README.md`
- `课后练习/通用提交模板.md`
- `第0课-AI时代后端工程师的工作流重构/final-content.md`
- `第1课-用AI做需求理解与任务拆解/final-content.md`
- `第2课-用AI做接口设计与数据建模/final-content.md`
- `第3课-用AI辅助搭Spring-Boot工程骨架/final-content.md`
- `第4课-用AI写业务代码但守住边界/final-content.md`
- `第5课-用AI补测试造样例做回归/final-content.md`
- `第6课-用AI联调接口与排查问题/final-content.md`
- `第7课-用AI辅助SQL缓存与性能分析/final-content.md`
- `第8课-用AI做重构代码审查与风险发现/final-content.md`
- `第9课-用AI写文档设计说明与交接材料/final-content.md`
- `第10课-用AI参与发布检查监控分析与故障复盘/final-content.md`
- `第11课-团队级AI开发规范与落地路线/final-content.md`
- `README.md`
- `课程设计文档.md`
- `演讲大纲.md`
- `website/src/app/page.tsx`
- `website/src/app/learn/page.tsx`
- `website/src/lib/site-content.ts`

## 继续观察点

- 如果后续发现某一课练习和正文更新再次脱节，优先在练习里补“验证动作”和“交付物”，而不是继续堆背景说明。
- 如果课程站未来要展示练习入口，可以考虑为练习补统一导航，但这不属于本轮正文增厚范围。
