# Python FastAPI Chat Stream Example

这是和 Java 主项目对照的最小 FastAPI 样例，只保留两个接口：

- `POST /api/chat`
- `POST /api/chat/stream`

## 运行方式

```bash
pip install fastapi uvicorn
uvicorn main:app --reload
```

## 对照重点

- FastAPI 用 `StreamingResponse` 直接返回 SSE 文本流
- 适合快速验证 AI 接口原型
- 但默认不会像 Java 主项目那样天然把配置绑定、分层治理和课程骨架一起组织起来
