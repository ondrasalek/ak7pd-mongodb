'use client';
import { useState, useEffect } from 'react';
import { NoteInterface } from '@/lib/interfaces/NoteInterface';

export default function NotesPage() {
    const [notes, setNotes] = useState<NoteInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch(
                    `${process.env.DATABASE_URL}/notes`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch notes');
                }

                const data: NoteInterface[] = await response.json();
                setNotes(data);
                setLoading(false);
            } catch (err) {
                setError((err as Error).message);
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map((note: NoteInterface) => (
                    <li key={note.id}>{note.title}</li>
                ))}
            </ul>
        </div>
    );
}
