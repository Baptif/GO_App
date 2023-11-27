package router

import (
	"github.com/baptif/go-react-todo/handler"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	// grouping
	api := app.Group("/api")
	v1 := api.Group("/todos")
	// routes
	v1.Get("/", handler.GetAllTodos)
	v1.Get("/:id", handler.GetOneTodo)
	v1.Post("/", handler.CreateTodo)
	v1.Patch("/:id/done", handler.MarkTodoAsDone)
	v1.Patch("/:id/undone", handler.MarkTodoAsUndone)
}