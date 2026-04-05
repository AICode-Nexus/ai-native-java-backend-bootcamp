package main

import (
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ChatRequest struct {
	Message string `json:"message"`
}

func main() {
	router := gin.Default()

	router.POST("/api/chat", func(c *gin.Context) {
		var request ChatRequest
		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"success": false})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"success": true,
			"data": gin.H{
				"answer": "go-stub-answer: " + request.Message,
				"model":  "gin-demo",
			},
		})
	})

	router.POST("/api/chat/stream", func(c *gin.Context) {
		var request ChatRequest
		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"success": false})
			return
		}

		c.Stream(func(writer io.Writer) bool {
			for _, chunk := range []string{"go", "stream", request.Message} {
				c.SSEvent("message", chunk)
			}
			return false
		})
	})

	router.Run(":8081")
}
