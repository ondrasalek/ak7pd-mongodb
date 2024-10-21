package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Employee represents the employee model
type Employee struct {
	ID           primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name         string             `bson:"name" json:"name"`
	Position     string             `bson:"position" json:"position"`
	Department   string             `bson:"department" json:"department"`
	CreatedAt    time.Time          `bson:"created_at" json:"created_at"`
}
