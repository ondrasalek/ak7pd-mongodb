package main

import (
	"log"
	"net/http"

	"ak7pd/controllers"
	"ak7pd/database"
	"ak7pd/routes"
	"os"

	"github.com/joho/godotenv"
)

func main() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    // Get the MongoDB URI from the environment variables
    mongoURI := os.Getenv("MONGODB_URI")
    if mongoURI == "" {
        log.Fatal("MONGODB_URI not set in .env")
    }

    // Connect to MongoDB
    client := database.ConnectDB(mongoURI)

    // Initialize collections
    controllers.NotesCollection = database.GetCollection(client, "test", "notes")
    controllers.UsersCollection = database.GetCollection(client, "test", "users")

    // Register routes
    router := routes.RegisterRoutes()

    // Start the server
    log.Fatal(http.ListenAndServe(":8000", router))
}
