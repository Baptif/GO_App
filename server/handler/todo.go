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

	return c.JSON(todo)
}

func GetAllTodos(c *fiber.Ctx) error {
	todos := []model.Todo{}

	database.Database.Db.Find(&todos)

	return c.JSON(todos)
}

// func MarkTodoAsState(c *fiber.Ctx) error {
// 	id, errID := c.ParamsInt("id")
// 	stateParam := c.Params("state")

// 	var state bool

// 	if errID != nil {
// 		return c.Status(401).SendString("Invalid ID")
// 	}
// 	if stateParam == "done" {
// 		state = true
// 	} else if stateParam == "undone" {
// 		state = false
// 	} else {
// 		return c.Status(401).SendString("Invalid state")
// 	}

// 	for i, t := range database.Todos {
// 		if t.ID == id {
// 			database.Todos[i].Done = state
// 			break
// 		}
// 	}

// 	return c.JSON(database.Todos)
// }

// func GetOneTodo(c *fiber.Ctx) error {
// 	id, err := c.ParamsInt("id")

// 	if err != nil {
// 		return c.Status(401).SendString("Invalid ID")
// 	}

// 	for i, t := range database.Todos {
// 		if t.ID == id {
// 			return c.JSON(database.Todos[i])
// 		}
// 	}

// 	return c.Status(404).SendString("Todo not found")
// }

// func DeleteTodo(c *fiber.Ctx) error {
// 	id, err := c.ParamsInt("id")

// 	var pos int

// 	if err != nil {
// 		return c.Status(401).SendString("Invalid ID")
// 	}

// 	for i, t := range database.Todos {
// 		if t.ID == id {
// 			pos = i
// 		}
// 	}

// 	database.Todos = append(database.Todos[:pos], database.Todos[pos+1:]...)

// 	return c.JSON(database.Todos)
// }
