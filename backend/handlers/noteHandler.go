package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"ak7pd/database"
	"ak7pd/models"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)


func GetNotes(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    var notes []models.Note

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    cursor, err := database.NotesCollection().Find(ctx, bson.M{})
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer cursor.Close(ctx)

    for cursor.Next(ctx) {
        var note models.Note
        cursor.Decode(&note)
        notes = append(notes, note)
    }

    json.NewEncoder(w).Encode(notes)
}

func GetNoteByID(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)
    id, _ := primitive.ObjectIDFromHex(params["id"])

    var note models.Note
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    err := database.NotesCollection().FindOne(ctx, bson.M{"_id": id}).Decode(&note)
    if err != nil {
        http.Error(w, "Note not found", http.StatusNotFound)
        return
    }

    json.NewEncoder(w).Encode(note)
}

func GetNotesByUserID(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)

    userId, err := primitive.ObjectIDFromHex(params["userId"])
    if err != nil {
        w.WriteHeader(http.StatusBadRequest)
        json.NewEncoder(w).Encode(map[string]string{"error": "Invalid userId"})
        return
    }

    var notes []models.Note
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    cursor, err := database.NotesCollection().Find(ctx, bson.M{"userId": userId})
    if err != nil {
        w.WriteHeader(http.StatusInternalServerError)
        json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
        return
    }
    defer cursor.Close(ctx)

    for cursor.Next(ctx) {
        var note models.Note
        cursor.Decode(&note)
        notes = append(notes, note)
    }

    // Check if notes slice is empty and return an appropriate response
    if len(notes) == 0 {
        w.WriteHeader(http.StatusNotFound)
        json.NewEncoder(w).Encode(map[string]string{"error": "No notes found for the specified userId"})
        return
    }

    json.NewEncoder(w).Encode(notes)
}


func CreateNote(w http.ResponseWriter, r *http.Request) {
    var note models.Note
    err := json.NewDecoder(r.Body).Decode(&note)
    if err != nil {
        http.Error(w, "Invalid input", http.StatusBadRequest)
        return
    }

    // Validate userId
    if note.UserId.IsZero() {
        http.Error(w, "User ID is required", http.StatusBadRequest)
        return
    }

    // Insert the note into the database
    note.CreatedAt = time.Now()
    _, err = database.NotesCollection().InsertOne(context.Background(), note)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(note)
}


func UpdateNote(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id, _ := primitive.ObjectIDFromHex(params["id"])

    var updatedNote models.Note
    err := json.NewDecoder(r.Body).Decode(&updatedNote)
    if err != nil {
        http.Error(w, "Invalid input", http.StatusBadRequest)
        return
    }

    // Update the note in the database
    _, err = database.NotesCollection().UpdateOne(
        context.Background(),
        bson.M{"_id": id},
        bson.M{"$set": updatedNote},
    )
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(updatedNote)
}


func DeleteNote(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id, _ := primitive.ObjectIDFromHex(params["id"])

    // Delete the note from the database
    _, err := database.NotesCollection().DeleteOne(context.Background(), bson.M{"_id": id})
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusNoContent)
}
