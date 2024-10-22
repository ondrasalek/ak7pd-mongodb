'use client';

import { EmployeeInterface } from './interfaces/EmployeeInterface';
import { NoteInterface } from './interfaces/NoteInterface';
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

export function useNotes(userId: string | undefined) {
    const { data, error, isLoading } = useSWR(
        `${process.env.DATABASE_URL}/notes${userId ? `/user/${userId}` : ''}`,
        fetcher
    );
    if (error) {
        console.error(error);
    }

    return {
        notes: data as NoteInterface[],
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
