package main

import (
	config "24thstreet-team-images-upload-server/configs/env"
	controller "24thstreet-team-images-upload-server/controllers"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/helmet/v2"
)

func main() {
	app := fiber.New(fiber.Config{
		ReduceMemoryUsage:         true,
		Prefork:                   true,
		BodyLimit:                 4 * 1024 * 1024,
		ReadTimeout:               10 * time.Second,
		WriteTimeout:              10 * time.Second,
		IdleTimeout:               10 * time.Second,
		DisableDefaultContentType: true,
		DisableDefaultDate:        true,
	})

	app.Use(helmet.New())

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowMethods:     "POST, DELETE, GET",
		AllowCredentials: false,
		MaxAge:           2592000,
	}))

	app.Post("/file", controller.FileUpload)

	app.Delete("/file", controller.DeleteFile)

	app.Get("/file", controller.GetFiles)

	var port string = config.EnvPort()
	app.Listen(port)

}
