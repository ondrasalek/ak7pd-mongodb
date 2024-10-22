export interface NoteInterface {
    id: string; // MongoDB ObjectId as string
    title: string;
    content: string;
    createdAt: string; // ISO 8601 string format for dates
    userId: string; // MongoDB ObjectId as string
    businessPosition: string;
    visibility: string;

    [key: string]: string | undefined; // To allow dynamic key access, values as string or undefined
}
