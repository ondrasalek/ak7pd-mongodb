export interface NoteInterface {
    id: string; // MongoDB ObjectId will be a string in the frontend
    title: string;
    content: string;
    userId: string; // MongoDB ObjectId of the user
    createdAt: string; // Date in string format (ISO 8601)

    [key: string]: string | undefined; // This allows indexing with any string key, where the value is a string or undefined
}
