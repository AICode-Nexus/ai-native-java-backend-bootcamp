# AI-Native Java 项目配置模板

## 这份模板是干什么用的

这份文档不是简单罗列一组环境变量，而是给你一套新建 AI-Native Java 后端项目时可直接复用的配置约定。

目标是解决三个问题：

1. 新项目一开始就把配置边界收清楚
2. AI、检索、工具、工作流、治理相关配置有统一命名
3. 从本地开发到后续生产演进，都有一条清晰路径

如果你准备基于 Spring Boot 新建一个 AI 后端项目，这份模板可以作为起步骨架。

## 一、推荐项目结构

建议至少按下面的思路组织项目：

```text
.
├── README.md
├── AGENTS.md
├── .cursorrules
├── docs/
│   ├── prompts/
│   ├── skills/
│   ├── rules/
│   └── evals/
├── src/main/java/com/example/yourapp/
│   ├── ai/
│   ├── chat/
│   ├── knowledge/
│   ├── agent/
│   ├── workflow/
│   ├── dataassistant/
│   ├── ops/
│   ├── common/
│   └── bootstrap/
├── src/main/resources/
│   ├── application.yml
│   ├── application-local.yml
│   ├── application-dev.yml
│   └── application-prod.yml
├── src/test/java/
├── .env.example
├── docker-compose.yml
└── scripts/
```

这个结构的核心不是“目录多”，而是让下面几类能力从第一天开始就有位置：

- AI 能力
- 业务接口
- 检索与知识
- 工具与工作流
- 工程治理
- AI 协作资产

## 二、推荐配置分层

建议把配置分成三层理解：

### 1. 代码内统一绑定层

用一个统一前缀，例如：

- `app.ai`
- `app.mysql`
- `app.redis`
- `app.elasticsearch`
- `app.rabbitmq`
- `app.retrieval`
- `app.session`
- `app.tools`
- `app.workflow`

这样做的好处是：

- 所有业务配置都挂在统一命名空间下
- 代码内更容易集中绑定和校验
- 后续替换底层实现时不必重做命名体系

### 2. 环境变量注入层

把真正随环境变化的值交给环境变量，例如：

- `AI_PROVIDER`
- `AI_API_KEY`
- `MYSQL_HOST`
- `REDIS_HOST`
- `ES_HOST`

代码层只关心统一前缀，环境层只负责注入实际值。

### 3. 环境文件覆盖层

建议至少区分：

- `application.yml`
- `application-local.yml`
- `application-dev.yml`
- `application-prod.yml`

不要把所有环境差异都写在一个超长 `application.yml` 里。

## 三、推荐的 `application.yml` 模板

下面这份模板和当前训练营 `demo/` 的命名方式保持一致，可以直接作为起点调整：

```yaml
spring:
  application:
    name: your-ai-backend

server:
  port: 8080

app:
  ai:
    provider: ${AI_PROVIDER:openai}
    api-key: ${AI_API_KEY:}
    base-url: ${AI_BASE_URL:}
    model: ${AI_MODEL:gpt-4.1-mini}
  mysql:
    host: ${MYSQL_HOST:localhost}
    port: ${MYSQL_PORT:3306}
    database: ${MYSQL_DATABASE:ainative}
    username: ${MYSQL_USERNAME:ainative}
    password: ${MYSQL_PASSWORD:ainative}
  redis:
    host: ${REDIS_HOST:localhost}
    port: ${REDIS_PORT:6379}
  elasticsearch:
    host: ${ES_HOST:localhost}
    port: ${ES_PORT:9200}
  rabbitmq:
    host: ${RABBITMQ_HOST:localhost}
    port: ${RABBITMQ_PORT:5672}
  retrieval:
    top-k: ${RETRIEVAL_TOP_K:3}
  session:
    memory-provider: ${SESSION_MEMORY_PROVIDER:redis}
  tools:
    allowlist:
      - lookup
      - sql-preview
  workflow:
    retry-enabled: ${WORKFLOW_RETRY_ENABLED:false}
    max-retries: ${WORKFLOW_MAX_RETRIES:2}
```

## 四、推荐的 `.env.example` 模板

```env
APP_ENV=local

AI_PROVIDER=openai
AI_API_KEY=replace-me
AI_BASE_URL=
AI_MODEL=gpt-4.1-mini

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=ainative
MYSQL_USERNAME=ainative
MYSQL_PASSWORD=ainative
MYSQL_ROOT_PASSWORD=root

REDIS_HOST=localhost
REDIS_PORT=6379

ES_HOST=localhost
ES_PORT=9200
ES_JAVA_OPTS=-Xms512m -Xmx512m

RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
RABBITMQ_MANAGEMENT_PORT=15672

RETRIEVAL_TOP_K=3
SESSION_MEMORY_PROVIDER=redis
WORKFLOW_RETRY_ENABLED=false
WORKFLOW_MAX_RETRIES=2
```

建议把 `.env.example` 提交到仓库，把 `.env` 加入忽略。

## 五、AI 协作文件建议

如果你的项目会长期和 AI 编码工具协作，建议从一开始补齐这些文件：

- `AGENTS.md`
  说明仓库目标、模块边界、协作方式
- `.cursorrules`
  约束编码风格和执行习惯
- `docs/prompts/`
  放业务 Prompt 模板
- `docs/skills/`
  放团队复用的 AI Skill 说明
- `docs/rules/`
  放治理规则、风格要求、安全边界
- `docs/evals/`
  放关键回归样例

### 推荐原则

- Prompt 不要散落在业务代码里
- 规则不要只存在口头约定中
- Skill 要面向复用，不要写成个人临时笔记
- Evals 要覆盖核心链路，而不是只覆盖 happy path

## 六、推荐的模块边界

建议至少拆出下面这些能力区：

### `ai/`

- 模型网关
- Prompt 组装
- 输出解析
- 安全策略

### `chat/`

- 对话接口
- 流式接口
- 聊天服务

### `knowledge/`

- 文件上传
- 文本切片
- 检索召回
- RAG 回答
- 引用结构

### `agent/`

- Tool 定义
- Tool 注册表
- 工具执行结果

### `workflow/`

- 固定流程编排
- 异步任务状态
- 重试与补偿策略

### `dataassistant/`

- 数据助手
- 报表问答
- 业务增强接口

### `ops/`

- 请求日志
- 指标采集
- 成本治理
- Evals 接入

## 七、推荐规则

### 代码规则

- 业务边界优先于技术边界
- 先写测试，再写实现
- Chat、RAG、Agent、Workflow 明确分层
- Tool 调用必须带安全约束
- 检索为空时要有显式降级
- 结构化结果优先于纯自然语言拼接

### 协作规则

- Prompt 模板集中管理
- Tool allowlist 显式配置
- 模型供应商通过配置切换
- 重要链路保留回归评测集
- 日志、指标、评测分别承担不同职责

## 八、本地开发建议

建议至少准备下面几类脚本：

- `scripts/start-infra.sh`
  启动本地依赖
- `scripts/stop-infra.sh`
  停止本地依赖
- `scripts/load-sample-data.sh`
  导入演示数据

同时建议保留：

- `docker-compose.yml`
- `.env.example`

这样新同学或新讲师进入项目时，能更快跑通基础环境。

## 九、环境隔离建议

### 本地环境

- 优先追求快速跑通
- 允许使用最小实现或内存实现
- 方便课堂演示和单机验证

### 开发环境

- 开始接真实中间件
- 开始验证配置装配
- 开始沉淀评测样例和日志口径

### 生产环境

- 机密通过安全配置中心管理
- 模型、缓存、检索、消息队列分开治理
- 关键链路必须有监控、评测和回滚预案

## 十、最小治理清单

一个 AI-Native Java 项目在准备上线前，建议至少具备下面这些配置与治理能力：

- AI provider、model、base URL 可配置
- Tool allowlist 可配置
- 检索参数可配置
- 会话记忆策略可配置
- 安全策略存在后端落地实现
- 请求日志可查看
- 最小指标可采集
- 至少一组 evals 样例可持续回归

## 十一、Git 与交付建议

推荐使用 Conventional Commits：

- `feat`
- `fix`
- `docs`
- `refactor`
- `test`
- `chore`

同时建议至少有两条基础自动化：

1. 代码测试
2. 文档或配置结构检查

## 十二、这份模板最适合怎么用

推荐用法不是“一次性全部复制”，而是：

1. 先复制命名规范和目录思路
2. 再复制 `application.yml` 与 `.env.example` 模板
3. 再根据你当前项目是否已经有 Redis、ES、MQ 来删减
4. 最后补齐 AI 协作文件与最小治理清单

这样用，这份模板才会真正成为“AI-Native Java 项目起步模板”，而不是一份看完就放着的说明文档。
