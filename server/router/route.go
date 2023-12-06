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
	v1.Patch("/:id/:state", handler.MarkTodoAsState)
	v1.Delete("/:id", handler.DeleteTodo)
	v1.Delete("/", handler.DeleteAllTodos)
}
