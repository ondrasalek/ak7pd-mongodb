package database

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var MongoClient *mongo.Client

// ConnectDB initializes a MongoDB client and connects to the database
func ConnectDB(uri string) *mongo.Client {
    clientOptions := options.Client().ApplyURI(uri)

    // Create a new MongoDB client
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    client, err := mongo.Connect(ctx, clientOptions)
    if err != nil {
        log.Fatal(err)
    }

    // Ping the MongoDB server to ensure the connection is established
    if err := client.Ping(ctx, nil); err != nil {
        log.Fatal(err)
    }

    log.Println("Connected to MongoDB successfully!")
    MongoClient = client
    return client
}

// GetCollection is a helper to return a MongoDB collection from a specific database
func GetCollection(client *mongo.Client, dbName string, collectionName string) *mongo.Collection {
    return client.Database(dbName).Collection(collectionName)
}
