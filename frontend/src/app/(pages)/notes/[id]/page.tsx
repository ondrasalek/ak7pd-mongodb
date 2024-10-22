'use client';
import { NoteInterface } from '@/lib/interfaces/NoteInterface';
import NoteCard from '@/components/note/Card';
import { useNote } from '@/lib/fetchData';
import { useParams } from 'next/navigation'; // New approach if required

export default function NoteDetailsPage() {
    const params = useParams(); // Using useParams to get params
    const { id } = params as { id: string }; // Type assertion
    const { note, isLoading, isError } = useNote(id) as {
        note: NoteInterface | undefined;
        isLoading: boolean;
        isError: boolean;
    };

    // Loading state
    if (isLoading) {
        return <p>Loading note details...</p>;
    }

    // Error state
    if (isError || !note) {
        return (
            <p>Note not found or there was an error fetching the details.</p>
        );
    }

    return <NoteCard data={note} />;
}
