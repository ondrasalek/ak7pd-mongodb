package main

import (
	"log"
	"net/http"

	"ak7pd/database"
	"ak7pd/handlers"
	"ak7pd/routes"
	"os"

	"github.com/gorilla/mux"
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
    handlers.NotesCollection = database.GetCollection(client, "test", "notes")
    handlers.UsersCollection = database.GetCollection(client, "test", "users")

    // Register routes
    router := mux.NewRouter()
    routes.SetupRoutes(router)
    // Start the server
    log.Fatal(http.ListenAndServe(":8081", router))
}
