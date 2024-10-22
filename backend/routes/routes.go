package routes

import (
	"ak7pd/handlers"

	"github.com/gorilla/mux"
)

func SetupRoutes(router *mux.Router) {
	// Notes Routes
	notesGroup := router.PathPrefix("/api/notes").Subrouter()
	{
		notesGroup.HandleFunc("", handlers.GetNotes).Methods("GET")
		notesGroup.HandleFunc("/", handlers.GetNotes).Methods("GET")
		notesGroup.HandleFunc("/{id}", handlers.GetNoteByID).Methods("GET")
		notesGroup.HandleFunc("/user/{userId}", handlers.GetNotesByUserID).Methods("GET")
		notesGroup.HandleFunc("/new", handlers.CreateNote).Methods("POST")
		notesGroup.HandleFunc("/{id}", handlers.UpdateNote).Methods("PUT")
		notesGroup.HandleFunc("/{id}", handlers.DeleteNote).Methods("DELETE")
	}

	// Employees Routes
	employeesGroup := router.PathPrefix("/api/employees").Subrouter()
	{
		employeesGroup.HandleFunc("", handlers.GetEmployees).Methods("GET")
		employeesGroup.HandleFunc("/", handlers.GetEmployees).Methods("GET")
		employeesGroup.HandleFunc("/{id}", handlers.GetEmployeeByID).Methods("GET")
		employeesGroup.HandleFunc("/new", handlers.CreateEmployee).Methods("POST")
		employeesGroup.HandleFunc("/{id}", handlers.UpdateEmployee).Methods("PUT")
		employeesGroup.HandleFunc("/{id}", handlers.DeleteEmployee).Methods("DELETE")
	}
}
