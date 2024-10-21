package routes

import (
	"ak7pd/handlers"

	"github.com/gorilla/mux"
)

func SetupRoutes(router *mux.Router) {
    // Notes Routes
    notesGroup := router.PathPrefix("/api/notes").Subrouter()
    {
        notesGroup.HandleFunc("/", handlers.GetNotes).Methods("GET")
        notesGroup.HandleFunc("/{id}", handlers.GetNoteByID).Methods("GET")
        notesGroup.HandleFunc("/", handlers.CreateNote).Methods("POST")
        notesGroup.HandleFunc("/{id}", handlers.UpdateNote).Methods("PUT")
        notesGroup.HandleFunc("/{id}", handlers.DeleteNote).Methods("DELETE")
    }

    // Users Routes
    usersGroup := router.PathPrefix("/api/users").Subrouter()
    {
        usersGroup.HandleFunc("/", handlers.GetUsers).Methods("GET")
        usersGroup.HandleFunc("/{id}", handlers.GetUserByID).Methods("GET")
        usersGroup.HandleFunc("/", handlers.CreateUser).Methods("POST")
        usersGroup.HandleFunc("/{id}", handlers.UpdateUser).Methods("PUT")
        usersGroup.HandleFunc("/{id}", handlers.DeleteUser).Methods("DELETE")
    }
}
