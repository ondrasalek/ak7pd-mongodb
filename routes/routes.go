package routes

import (
	"ak7pd/controllers"

	"github.com/gorilla/mux"
)

// RegisterRoutes sets up the API routes for the application
func RegisterRoutes() *mux.Router {
    router := mux.NewRouter()

    // Notes Routes
    router.HandleFunc("/api/notes", controllers.GetNotes).Methods("GET")
    router.HandleFunc("/api/notes/{id}", controllers.GetNoteByID).Methods("GET")
    router.HandleFunc("/api/notes", controllers.CreateNote).Methods("POST")
    router.HandleFunc("/api/notes/{id}", controllers.UpdateNote).Methods("PUT")
    router.HandleFunc("/api/notes/{id}", controllers.DeleteNote).Methods("DELETE")

    // Users Routes
    router.HandleFunc("/api/users", controllers.GetUsers).Methods("GET")
    router.HandleFunc("/api/users/{id}", controllers.GetUserByID).Methods("GET")
    router.HandleFunc("/api/users", controllers.CreateUser).Methods("POST")
    router.HandleFunc("/api/users/{id}", controllers.UpdateUser).Methods("PUT")
    router.HandleFunc("/api/users/{id}", controllers.DeleteUser).Methods("DELETE")

    return router
}
