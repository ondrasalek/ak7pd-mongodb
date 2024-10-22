// models/note.go
package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Note represents a note in the database
type Note struct {
	ID           primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Title        string             `bson:"title" json:"title"`
	Content      string             `bson:"content" json:"content"`
	CreatedAt    time.Time          `bson:"createdAt" json:"createdAt"`
	UserId          primitive.ObjectID  `bson:"userId" json:"userId"`
	BusinessPosition string        `bson:"businessPosition" json:"businessPosition"`
	Visibility   string             `bson:"visibility" json:"visibility"`
}
