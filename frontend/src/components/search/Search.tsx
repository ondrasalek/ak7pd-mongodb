import { EmployeeInterface } from '@/lib/interfaces/EmployeeInterface';
import { NoteInterface } from '@/lib/interfaces/NoteInterface';
import { useRouter } from 'next/navigation';
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
import { useEmployees, useNotes } from '@/lib/fetchData';
import { useState, useEffect } from 'react';

const Search = ({ type }: { type: 'employees' | 'notes' }) => {
    const router = useRouter();
    const [items, setItems] = useState<EmployeeInterface[] | NoteInterface[]>(
        []
    );
    const [searchTerm, setSearchTerm] = useState('');
    const { employees, isLoading: employeesLoading } = useEmployees();
    const { notes, isLoading: notesLoading } = useNotes();

    useEffect(() => {
        if (type === 'employees' && employees) {
            setItems(employees);
        } else if (type === 'notes' && notes) {
            setItems(notes);
        }
    }, [type, employees, notes]);

    // Handle search input change
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Filter items based on search term
    const filteredItems = items.filter((item) => {
        if (type === 'employees') {
            return (item as EmployeeInterface).name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        } else {
            const note = item as NoteInterface;
            return (
                note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.content.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    });

    // Handle item selection and navigation
    const handleSelectItem = (id: string) => {
        router.push(`/${type}/${id}`);
    };

    // Add a loading state while data is being fetched
    if (
        (type === 'employees' && employeesLoading) ||
        (type === 'notes' && notesLoading)
    ) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Input
                type='text'
                placeholder={`Search ${type}...`}
                value={searchTerm}
                onChange={handleSearch}
                className='mb-4'
            />

            <Table className='w-full'>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {type === 'employees' ? 'Name' : 'Title'}
                        </TableHead>
                        {type === 'notes' && <TableHead>Content</TableHead>}
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredItems.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                {type === 'employees'
                                    ? (item as EmployeeInterface).name
                                    : (item as NoteInterface).title}
                            </TableCell>
                            {type === 'notes' && (
                                <TableCell>
                                    {(item as NoteInterface).content}
                                </TableCell>
                            )}
                            <TableCell>
                                <Button
                                    variant='outline'
                                    onClick={() => handleSelectItem(item.id)}
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

export default Search;
