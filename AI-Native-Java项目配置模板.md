# AI-Native Java 项目配置模板

## 1. AI 协作文件建议

建议在真实项目中补齐以下文件：

- `AGENTS.md`
- `.cursorrules`
- `docs/prompts/`
- `docs/skills/`

## 2. 推荐规则

### 代码规则

- 业务边界优先于技术边界
- 先写测试，再写实现
- Chat、RAG、Agent、Workflow 分层
- Tool 调用必须带安全约束

### 协作规则

- Prompt 模板集中管理
- Tool allowlist 显式配置
- 模型供应商通过配置切换
- 重要链路保留回归评测集

## 3. 环境变量建议

```env
APP_ENV=local
AI_PROVIDER=openai
AI_API_KEY=replace-me
MYSQL_HOST=localhost
MYSQL_PORT=3306
REDIS_HOST=localhost
REDIS_PORT=6379
ES_HOST=localhost
ES_PORT=9200
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
```

## 4. Git 提交建议

推荐使用 Conventional Commits：

- `feat`
- `fix`
- `docs`
- `refactor`
- `test`
- `chore`
