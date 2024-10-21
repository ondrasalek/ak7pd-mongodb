package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID                primitive.ObjectID   `json:"id,omitempty" bson:"_id,omitempty"`
	Name              string               `json:"name,omitempty" bson:"name,omitempty"`
	BusinessPosition   string              `json:"businessPosition,omitempty" bson:"businessPosition,omitempty"`
	LastAccess        time.Time            `json:"lastAccess,omitempty" bson:"lastAccess,omitempty"`
	Language          string               `json:"language,omitempty" bson:"language,omitempty"`
	Email             string               `json:"email,omitempty" bson:"email,omitempty" validate:"required,email"`
	PasswordHash      string               `json:"passwordHash,omitempty" bson:"passwordHash,omitempty" validate:"required"`
	CreatedAt         time.Time            `json:"createdAt,omitempty" bson:"createdAt,omitempty"`
	Roles             []string             `json:"roles,omitempty" bson:"roles,omitempty"`
	AccountStatus     string               `json:"accountStatus,omitempty" bson:"accountStatus,omitempty"` // e.g., "active", "suspended", "deleted"
	PasswordLastChanged time.Time           `json:"passwordLastChanged,omitempty" bson:"passwordLastChanged,omitempty"`
	TwoFactorEnabled  bool                 `json:"twoFactorEnabled,omitempty" bson:"twoFactorEnabled,omitempty"`
	TwoFactorSecret   string               `json:"twoFactorSecret,omitempty" bson:"twoFactorSecret,omitempty"`
}
