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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { format } from 'date-fns';
import { AlertCircle, ArrowUpDown } from 'lucide-react';

type SortOrder = 'asc' | 'desc';

const NotesSearch = ({ userId = undefined }: { userId?: string }) => {
    const router = useRouter();
    const { notes, isLoading } = useNotes(userId);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
    const [dateFilter, setDateFilter] = useState('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    const handleDateFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateFilter(event.target.value);
    };
    // Sort order createdAt
    const handleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, 'dd. MM. yyyy - HH:mm:ss');
    };
    const filteredAndSortedNotes = notes
        ?.filter((note) => {
            const nameMatch = note.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const noteContentMatch = note.content
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const dateMatch = dateFilter
                ? new Date(note.createdAt).toISOString().split('T')[0] ===
                  dateFilter
                : true;
            return (nameMatch || noteContentMatch) && dateMatch;
        })
        .sort((a, b) => {
            const dateA = new Date(a['createdAt']).getTime();
            const dateB = new Date(b['createdAt']).getTime();
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

    const handleSelectItem = (id: string) => {
        router.push(`/notes/${id}`);
    };
    if (isLoading) {
        return <div className='text-center py-4'>Loading notes...</div>;
    }
    if (!notes || notes.length === 0 || notes === undefined) {
        return (
            <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>No notes found</AlertTitle>
                <AlertDescription>
                    There are no notes to display at this time.
                </AlertDescription>
            </Alert>
        );
    }
    return (
        <div className='space-y-4'>
            <div className='flex flex-col sm:flex-row gap-4 '>
                <Input
                    type='text'
                    placeholder='Search notes...'
                    value={searchTerm}
                    onChange={handleSearch}
                    className='w-full sm:w-auto w-min-fit'
                />
                <Input
                    type='date'
                    value={dateFilter}
                    onChange={handleDateFilter}
                    className='w-full sm:w-auto w-min-fit'
                />
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[300px]'>Title</TableHead>
                        <TableHead className='w-fit'>Content</TableHead>
                        <TableHead>
                            <Button
                                variant='ghost'
                                onClick={handleSort}
                                className='hover:bg-transparent'
                            >
                                Created
                                <ArrowUpDown className='ml-2 h-4 w-4' />
                            </Button>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredAndSortedNotes?.map((note) => (
                        <TableRow
                            key={note.id}
                            className='cursor-pointer'
                            onClick={() => {
                                handleSelectItem(note.id);
                            }}
                        >
                            <TableCell className='font-medium'>
                                {note.title}
                            </TableCell>
                            <TableCell>{note.content}</TableCell>
                            <TableCell>
                                {formatDateTime(note.createdAt)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default NotesSearch;
