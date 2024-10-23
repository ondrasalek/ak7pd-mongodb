import {
    EmployeeInterface,
    CreateEmployeeInput,
} from './interfaces/EmployeeInterface';
import { NoteInterface, CreateNoteInput } from './interfaces/NoteInterface';
import useSWR from 'swr';

const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        // If the response is not ok, attempt to read the error message
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred');
    }
    const data = await response.json();
    return data;
};

// Employee
export function useEmployees() {
    const { data, error, isLoading } = useSWR(
        `${process.env.DATABASE_URL}/employees`, // Fix typo here
        fetcher
    );

    if (error) {
        console.error(error);
    }

    return {
        employees: data as EmployeeInterface[],
        isLoading,
        isError: error,
    };
}

export function useEmployee(id: string) {
    const { data, error, isLoading } = useSWR(
        `${process.env.DATABASE_URL}/employees/${id}`, // Fix typo here
        fetcher
    );

    if (error) {
        console.error(error);
    }

    return {
        employee: data as EmployeeInterface,
        isLoading,
        isError: error,
    };
}

export async function createEmployee(employeeData: CreateEmployeeInput) {
    const response = await fetch(`${process.env.DATABASE_URL}/employees/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: employeeData.name,
            position: employeeData.position,
            department: employeeData.department,
        }),
    });
    if (!response.ok) {
        throw new Error('Failed to create employee');
    }
    return response.json();
}

export function deleteEmployee(id: string) {
    return fetch(`${process.env.DATABASE_URL}/employees/${id}`, {
        method: 'DELETE',
    });
}
// Notes
export function useNotes(userId: string | undefined) {
    const { data, error, isLoading } = useSWR(
        `${process.env.DATABASE_URL}/notes${userId ? `/user/${userId}` : ''}`,
        fetcher
    );
    if (error && data === undefined) {
        return {
            notes: undefined,
            isLoading,
            isError: error,
        };
    } else if (error) {
        console.error(error);
    }
    return {
        notes: data as NoteInterface[],
        isLoading,
        isError: error,
    };
}

export function useNote(id: string) {
    const { data, error, isLoading } = useSWR(
        `${process.env.DATABASE_URL}/notes/${id}`, // Fix typo here
        fetcher
    );

    if (error) {
        console.error(error);
    }

    return {
        note: data as NoteInterface,
        isLoading,
        isError: error,
    };
}

export async function createNote(noteData: CreateNoteInput) {
    const response = await fetch(`${process.env.DATABASE_URL}/notes/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
    });
    if (!response.ok) {
        throw new Error('Failed to create note');
    }
    return response.json();
}
// Function to update an existing note
export async function updateNote(
    id: string,
    updatedNote: Partial<NoteInterface>
): Promise<NoteInterface> {
    const response = await fetch(`${process.env.DATABASE_URL}/notes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
    });

    if (!response.ok) {
        throw new Error('Error updating note');
    }

    return response.json();
}
// Function to delete a note
export function deleteNote(id: string) {
    fetch(`${process.env.DATABASE_URL}/notes/${id}`, {
        method: 'DELETE',
    });
}
