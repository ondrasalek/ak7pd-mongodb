import { BusinessPositionType } from '@/lib/types/BusinessPositionType';
import { VisibilityType } from '@/lib/types/VisibilityType';

export interface NoteInterface {
    id: string; // MongoDB ObjectId as string
    title: string;
    content: string;
    createdAt: string; // ISO 8601 string format
    updatedAt: string; // ISO 8601 string format
    userId: string; // MongoDB ObjectId as string
    businessPosition: BusinessPositionType;
    visibility: VisibilityType;

    [key: string]: string | BusinessPositionType | VisibilityType | undefined; // Allow dynamic access
}

// For creating a new note
export interface NoteInput {
    title: string;
    content: string;
    userId: string;
    businessPosition: BusinessPositionType;
    visibility: VisibilityType;
}
