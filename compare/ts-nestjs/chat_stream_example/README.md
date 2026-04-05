# TypeScript NestJS Chat Stream Example

这是和 Java 主项目对照的最小 NestJS 样例，只保留：

- `POST /api/chat`
- `POST /api/chat/stream`

## 运行方式

```bash
npm install @nestjs/common @nestjs/core reflect-metadata rxjs
npx ts-node src/main.ts
```

## 对照重点

- NestJS 在分层和装饰器体验上更接近 Spring Boot
- SSE 可以通过 `@Sse()` 和 `Observable` 暴露
- 适合作为前端工程师迁移到后端框架时的桥梁样例
