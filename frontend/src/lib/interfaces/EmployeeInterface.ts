import { BusinessPositionType } from '@/lib/types/BusinessPositionType';

export interface EmployeeInterface {
    id: string; // MongoDB ObjectId as string
    name: string;
    position: string;
    department: BusinessPositionType;
    createdAt: string; // ISO 8601 string format
    updatedAt: string; // ISO 8601 string format

    [key: string]: string | BusinessPositionType | undefined; // Allow dynamic access with keys
}

// For creating a new employee
export interface EmployeeInput {
    name: string;
    position: string;
    department: BusinessPositionType;
}
