package handler

import (
	"github.com/baptif/go-react-todo/database"
	"github.com/baptif/go-react-todo/model"
	"github.com/gofiber/fiber/v2"
)

func CreateTodo(c *fiber.Ctx) error {
	todo := new(model.Todo)
	if err := c.BodyParser(todo); err != nil {
		return err
	}

	result := database.Database.Db.Create(&todo)
	if result.Error != nil {
		return result.Error
	}

	return GetAllTodos(c)
}

func GetAllTodos(c *fiber.Ctx) error {
	todos := []model.Todo{}

	database.Database.Db.Find(&todos)

	return c.JSON(todos)
}

func MarkTodoAsState(c *fiber.Ctx) error {
	id, errID := c.ParamsInt("id")
	stateParam := c.Params("state")

	var state bool

	if errID != nil {
		return c.Status(401).SendString("Invalid ID")
	}
	if stateParam == "done" {
		state = true
	} else if stateParam == "undone" {
		state = false
	} else {
		return c.Status(401).SendString("Invalid state")
	}

	var todo model.Todo
	if err := database.Database.Db.First(&todo, id).Error; err != nil {
		return c.Status(404).SendString("Todo not found")
	}

	todo.Done = state

	if err := database.Database.Db.Save(&todo).Error; err != nil {
		return c.Status(500).SendString("Failed to update todo")
	}

	return GetAllTodos(c)
}

func GetOneTodo(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(401).SendString("Invalid ID")
	}

	var todo model.Todo
	if err := database.Database.Db.First(&todo, id).Error; err != nil {
		return c.Status(404).SendString("Todo not found")
	}

	return c.JSON(todo)
}

func DeleteTodo(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(401).SendString("Invalid ID")
	}

	var todo model.Todo
	if err := database.Database.Db.First(&todo, id).Error; err != nil {
		return c.Status(404).SendString("Todo not found")
	}

	if err := database.Database.Db.Delete(&todo).Error; err != nil {
		return c.Status(500).SendString("Failed to delete todo")
	}

	return GetAllTodos(c)
}

func DeleteAllTodos(c *fiber.Ctx) error {
	todos := []model.Todo{}

	database.Database.Db.Find(&todos)

	if err := database.Database.Db.Delete(&todos).Error; err != nil {
		return c.Status(500).SendString("Failed to delete all todos")
	}

	return c.SendString("Todos all successfully deleted")
}
