# Go Gin Chat Stream Example

这是和 Java 主项目对照的最小 Gin 样例，只聚焦：

- `POST /api/chat`
- `POST /api/chat/stream`

## 运行方式

```bash
go mod init chat-stream-example
go get github.com/gin-gonic/gin
go run main.go
```

## 对照重点

- Gin 可以快速写出轻量 API 和 SSE
- 流式输出依赖 `SSEvent` 与 `Flush`
- 与 Java 主项目相比，更偏“快速服务”而不是“课程化工程骨架”
