package handlers

import (
	"ak7pd/database"
	"ak7pd/models"
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// GetEmployees retrieves all employees
func GetEmployees(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var employees []models.Employee

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := database.EmployeesCollection().Find(ctx, bson.M{})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var employee models.Employee
		cursor.Decode(&employee)
		employees = append(employees, employee)
	}

	json.NewEncoder(w).Encode(employees)
}

// GetEmployeeById retrieves employees by their id
func GetEmployeeByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	var employee models.Employee
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err := database.EmployeesCollection().FindOne(ctx, bson.M{"_id": id}).Decode(&employee)
	if err != nil {
		http.Error(w, "Employee not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(employee)
}


func CreateEmployee(w http.ResponseWriter, r *http.Request) {
	var employee models.Employee
	err := json.NewDecoder(r.Body).Decode(&employee)
    if err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
        return
    }
    // Insert the employee into the database
	employee.CreatedAt = time.Now()
	employee.UpdatedAt = employee.CreatedAt
    _, err = database.EmployeesCollection().InsertOne(context.Background(), employee)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(employee)
}

// UpdateEmployee updates an existing employee
func UpdateEmployee(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, err := primitive.ObjectIDFromHex(params["id"])
	if err != nil {
		http.Error(w, "Invalid employee ID", http.StatusBadRequest)
		return
	}

	var updatedEmployee models.Employee
	err = json.NewDecoder(r.Body).Decode(&updatedEmployee)
	if err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	// Set the updatedAt field to the current time
	updatedEmployee.UpdatedAt = time.Now()

	// Only update specific fields
	update := bson.M{
		"name":      updatedEmployee.Name,
		"position":  updatedEmployee.Position,
		"department": updatedEmployee.Department,
		"updatedAt": updatedEmployee.UpdatedAt,
	}

	_, err = database.EmployeesCollection().UpdateOne(
		context.Background(),
		bson.M{"_id": id},
		bson.M{"$set": update},  // Only updating specific fields
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(updatedEmployee)
}

// DeleteEmployee deletes an employee by ID
func DeleteEmployee(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	id, _ := primitive.ObjectIDFromHex(params["id"])

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	result, err := database.EmployeesCollection().DeleteOne(ctx, bson.M{"_id": id})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// delete all notes associated with the employee
	_, err = database.NotesCollection().DeleteMany(ctx, bson.M{"userId": id})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	
	json.NewEncoder(w).Encode(result)
}
