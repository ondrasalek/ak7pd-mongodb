package main

import (
	"ak7pd/database"
	"ak7pd/handlers"
	"ak7pd/routes"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	client := database.ConnectDB("your_mongodb_uri") // Ensure to replace with your actual URI
	notesCollection := database.GetCollection(client, "your_db_name", "notes")
	employeesCollection := database.GetCollection(client, "your_db_name", "employees")

	handlers.NotesCollection = notesCollection
	handlers.EmployeesCollection = employeesCollection

	router := mux.NewRouter()
	routes.SetupRoutes(router)

	log.Fatal(http.ListenAndServe(":8000", router))
}
