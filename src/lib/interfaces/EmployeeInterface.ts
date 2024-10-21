export interface EmployeeInterface {
    id: string; // MongoDB ObjectId will be a string in the frontend
    name: string;
    position: string;
    department: string;
    createdAt: string; // Date in string format (ISO 8601)
}
