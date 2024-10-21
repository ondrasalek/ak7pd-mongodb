package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
    ID              primitive.ObjectID   `json:"id,omitempty" bson:"_id,omitempty"`
    Name            string               `json:"name,omitempty" bson:"name,omitempty"`
    BusinessPosition string              `json:"businessPosition,omitempty" bson:"businessPosition,omitempty"`
    LastAccess      time.Time            `json:"lastAccess,omitempty" bson:"lastAccess,omitempty"`
    Language        string               `json:"language,omitempty" bson:"language,omitempty"`
    Email           string               `json:"email,omitempty" bson:"email,omitempty"`
    PasswordHash    string               `json:"passwordHash,omitempty" bson:"passwordHash,omitempty"`
    CreatedAt       time.Time            `json:"createdAt,omitempty" bson:"createdAt,omitempty"`
    Roles           []string             `json:"roles,omitempty" bson:"roles,omitempty"`
}
