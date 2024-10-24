'use client';
import { NoteInterface } from '@/lib/interfaces/NoteInterface';
import NoteCard from '@/components/cards/NoteCard';
import { deleteNote, useNote } from '@/lib/fetchData';
import { useParams } from 'next/navigation'; // New approach if required
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NoteDetailsPage() {
    const router = useRouter();
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
    const handleEdit = () => {
        router.push(`/notes/edit/${note.id}`);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                deleteNote(note.id);
                router.back();
            } catch (error) {
                console.error('Failed to delete employee:', error);
            }
        }
    };
    return (
        <>
            <div className='space-x-2 float-end'>
                <Button variant='outline' onClick={handleEdit}>
                    <Edit className='mr-2 h-4 w-4' /> Edit
                </Button>
                <Button variant='destructive' onClick={handleDelete}>
                    <Trash2 className='mr-2 h-4 w-4' /> Delete
                </Button>
            </div>
            <NoteCard data={note} />
        </>
    );
}
