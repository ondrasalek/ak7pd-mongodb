'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { NoteForm } from '@/components/forms/NoteForm';
import { createNote } from '@/lib/fetchData';
import { NoteInput } from '@/lib/interfaces/NoteInterface';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
export default function NewNotePage() {
    const { toast } = useToast();

    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');
    const [isLoading, setIsLoading] = useState(false);

    if (!userId) {
        return <div>Error: User ID is required</div>;
    }

    const handleSubmit = async (data: NoteInput) => {
        setIsLoading(true);

        try {
            await createNote(data);
            toast({
                title: 'Success',
                description: 'Employee created successfully',
            });
            router.push('/');
        } catch (error) {
            console.error('Failed to create employee:', error);
            toast({
                title: 'Error',
                description: 'Failed to create employee. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>Create New Note</h1>
            <NoteForm
                onSubmit={handleSubmit}
                userId={userId}
                isLoading={isLoading}
            />
        </div>
    );
}
