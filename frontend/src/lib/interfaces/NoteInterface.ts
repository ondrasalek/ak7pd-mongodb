export interface NoteInterface {
    id: string; // MongoDB ObjectId as string
    title: string;
    content: string;
    createdAt: string; // ISO 8601 string format for dates
    userId: string; // MongoDB ObjectId as string
    businessPosition: BusinessPosition;
    visibility: Visibility;

    [key: string]: string | undefined; // To allow dynamic key access, values as string or undefined
}

// New interface for creating a note
export interface CreateNoteInput {
    title: string;
    content: string;
    userId: string;
    businessPosition: BusinessPosition;
    visibility: Visibility;
}

// Type for business positions
export type BusinessPosition =
    | 'Developer'
    | 'Manager'
    | 'Designer'
    | 'QA'
    | 'DevOps'
    | 'Other';

// Type for visibility options
export type Visibility = 'Public' | 'Private';
