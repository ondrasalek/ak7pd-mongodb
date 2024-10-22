'use client';
import { useEffect, useState } from 'react';
import { NoteInterface } from '@/lib/interfaces/NoteInterface';

export default function NoteDetailsPage({
    params,
}: {
    params: { id: string }; // Change to id
}) {
    const id = params.id;
    const [note, setNote] = useState<NoteInterface | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.DATABASE_URL}/notes/${id}`, // Fetch note by ID or title (if applicable)
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Note not found');
                }

                const data = await response.json();
                setNote(data);
            } catch (error) {
                console.error('Error fetching note:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <p>Loading note details...</p>;
    }

    if (!note) {
        return <p>Note not found</p>;
    }

    return (
        <div>
            <h1>{note.title}</h1>
            <p>{note.content}</p>
            <p>
                <strong>Created At:</strong>{' '}
                {new Date(note.createdAt).toLocaleString()}
            </p>
            <p>
                User ID: <strong>{note.userId}</strong>
            </p>
        </div>
    );
}
