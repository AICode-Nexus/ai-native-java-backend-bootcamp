# AI 辅助后端研发 Bootcamp 网站改轨实施记录

## 目标

将原本围绕 AI-Native Java Backend 课程主线构建的网站，改为服务新的双区课程结构：

- `/learn`：12 节主线课程
- `/advanced`：4 个进阶专题

并确保仓库文档、课程目录、网站导航与搜索结果保持一致。

## 已实施内容

### 1. 课程内容与目录改轨

- 顶层 `README.md` 改为“AI 辅助后端研发”定位
- `课程设计文档.md` 和 `演讲大纲.md` 改为新的课程叙事
- 12 个主线课程目录重命名，并重写 `final-content.md`
- 新增 `进阶专题/` 目录，承载原 AI-Native 主题内容
- `课后练习/README.md` 与 12 份练习文档统一对齐新主线
- `demo/README.md` 改为“教学示例项目”定位

### 2. 网站数据模型改造

- `website/src/lib/lessons.ts` 从单一 `lessons` 扩展为：
  - `mainCourses`
  - `advancedTopics`
  - `learningEntries`
- 每个条目新增：
  - `section`
  - `sectionLabel`
  - `href`

### 3. 文件读取与搜索改造

- `website/src/lib/lesson-files.ts` 拆分为主线课程与进阶专题两套读取接口
- `website/src/lib/lesson-search.server.ts` 改为统一收录主线课程与进阶专题
- `website/src/lib/lesson-search.ts` 改为统一搜索 `SearchEntry`
- 搜索结果支持显示 `sectionLabel`

### 4. 路由与页面改造

新增或改造以下路由：

- `/`
- `/learn`
- `/learn/[lessonId]`
- `/advanced`
- `/advanced/[topicId]`

其中：

- 首页默认讲“传统后端研发如何使用 AI 提效”
- `/learn` 只展示主线课程
- `/advanced` 只展示进阶专题

### 5. 导航与搜索交互改造

- Header 新增“进阶专题”导航入口
- Sidebar 分为“主线课程”和“进阶专题”两组
- 搜索框提示和结果 UI 改为同时支持主线课程与进阶专题

## 验证结果

在改造完成后已执行以下验证：

### 网站验证

- `pnpm lint`
  通过
- `pnpm test`
  通过，12/12 测试通过
- `pnpm build`
  通过，成功生成：
  - `/`
  - `/learn`
  - `/advanced`
  - 12 个主线课程页面
  - 4 个进阶专题页面

### 文档与链接验证

- 对 33 个 Markdown 文件执行相对链接检查
- 结果为 0 个失效相对链接

### 后端示例项目验证

- 尝试运行 `demo/./mvnw test`
- 当前环境缺少 Java Runtime，无法完成该项验证

## 收尾结果

- 改轨工作已合并到 `main`
- 改轨提交已推送到远端 `origin/main`
- 后续若要继续收口，建议补一轮具备 Java 运行时环境的 `demo` 测试
