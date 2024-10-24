'use client';

import { useRouter, useParams } from 'next/navigation';
import { NoteForm } from '@/components/forms/NoteForm';
import { useNote, updateNote } from '@/lib/fetchData';
import { NoteInput } from '@/lib/interfaces/NoteInterface';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function EditNotePage() {
    const router = useRouter();
    const { toast } = useToast();
    const params = useParams(); // Using useParams to get params
    const { id } = params as { id: string }; // Type assertion
    const { note, isLoading: fetchingIsLoading, isError } = useNote(id);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: NoteInput) => {
        setIsLoading(true);

        try {
            await updateNote(id, data);
            toast({
                title: 'Success',
                description: 'Note updated successfully',
            });
            router.push('/');
        } catch (error) {
            console.error('Failed to update note:', error);
            toast({
                title: 'Error',
                description: 'Failed to update note. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (fetchingIsLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading note</div>;

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>Edit Note</h1>
            <NoteForm
                initialData={note}
                onSubmit={handleSubmit}
                userId={note.userId}
                isLoading={isLoading}
            />
        </div>
    );
}
