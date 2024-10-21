package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Note struct {
    ID              primitive.ObjectID   `json:"id,omitempty" bson:"_id,omitempty"`
    UserID          primitive.ObjectID   `json:"userId,omitempty" bson:"userId,omitempty"`
    Title           string               `json:"title,omitempty" bson:"title,omitempty"`
    Content         string               `json:"content,omitempty" bson:"content,omitempty"`
    CreatedAt       time.Time            `json:"createdAt,omitempty" bson:"createdAt,omitempty"`
    BusinessPosition string              `json:"businessPosition,omitempty" bson:"businessPosition,omitempty"`
    Visibility      []string             `json:"visibility,omitempty" bson:"visibility,omitempty"`
}
