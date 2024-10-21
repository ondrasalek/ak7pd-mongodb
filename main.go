package main

import (
	"ak7pd/database"
	"ak7pd/handlers"
	"ak7pd/routes"
	"log"
	"net/http"

	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Get MongoDB URI from environment variable
	MONGODB_URI := os.Getenv("MONGODB_URI")
	if MONGODB_URI == "" {
		log.Fatal("MONGODB_URI environment variable not set")
	}

	client := database.ConnectDB(MONGODB_URI)
	notesCollection := database.GetCollection(client, "ak7pd", "notes")
	employeesCollection := database.GetCollection(client, "ak7pd", "employees")

	handlers.NotesCollection = notesCollection
	handlers.EmployeesCollection = employeesCollection

	router := mux.NewRouter()
	routes.SetupRoutes(router)

	log.Fatal(http.ListenAndServe(":8082", router))
}
