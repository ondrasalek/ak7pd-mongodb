// src/components/search/NotesSearch.tsx

import { useNotes } from '@/lib/fetchData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const NotesSearch = ({ userId = undefined }: { userId?: string }) => {
    const router = useRouter();
    const { notes, isLoading } = useNotes(userId);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredNotes = notes?.filter(
        (note) =>
            note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Loading state
    if (isLoading) {
        return <div>Loading notes...</div>;
    }
    const handleSelectItem = (id: string) => {
        router.push(`/notes/${id}`);
    };
    return (
        <div>
            <Input
                type='text'
                placeholder='Search notes...'
                value={searchTerm}
                onChange={handleSearch}
                className='mb-4'
            />

            <Table className='w-full'>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Content</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredNotes.map((note) => (
                        <TableRow key={note.id}>
                            <TableCell>{note.title}</TableCell>
                            <TableCell>{note.content}</TableCell>
                            <TableCell>
                                <Button
                                    variant='outline'
                                    onClick={() => {
                                        handleSelectItem(note.id);
                                    }}
                                >
                                    View Details
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default NotesSearch;
