package handler

import (
	"github.com/baptif/go-react-todo/database"
	"github.com/baptif/go-react-todo/model"
	"github.com/gofiber/fiber/v2"
)

func CreateTodo(c *fiber.Ctx) error {
	todo := &model.Todo{}

	if err := c.BodyParser(todo); err != nil {
		return err
	}

	todo.ID = len(database.Todos) + 1

	database.Todos = append(database.Todos, *todo)

	return c.JSON(database.Todos)
}

func GetAllTodos(c *fiber.Ctx) error {
	return c.JSON(database.Todos)
}

func MarkTodoAsDone(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(401).SendString("Invalid ID")
	}

	for i, t := range database.Todos {
		if t.ID == id {
			database.Todos[i].Done = true
			break
		}
	}

	return c.JSON(database.Todos)
}

func MarkTodoAsUndone(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(401).SendString("Invalid ID")
	}

	for i, t := range database.Todos {
		if t.ID == id {
			database.Todos[i].Done = false
			break
		}
	}

	return c.JSON(database.Todos)
}

func GetOneTodo(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(401).SendString("Invalid ID")
	}

	for i, t := range database.Todos {
		if t.ID == id {
			return c.JSON(database.Todos[i])
		}
	}

	return c.Status(404).SendString("Todo not found")
}
