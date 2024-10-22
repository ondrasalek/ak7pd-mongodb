// src/components/search/EmployeeSearch.tsx

import { useEmployees } from '@/lib/fetchData';
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

const EmployeeSearch = () => {
    const router = useRouter();
    const { employees, isLoading } = useEmployees();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredEmployees = employees?.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Loading state
    if (isLoading) {
        return <div>Loading employees...</div>;
    }
    const handleSelectItem = (id: string) => {
        router.push(`/employees/${id}`);
    };

    return (
        <div>
            <Input
                type='text'
                placeholder='Search employees...'
                value={searchTerm}
                onChange={handleSearch}
                className='mb-4'
            />

            <Table className='w-full'>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredEmployees.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.name}</TableCell>
                            <TableCell>
                                <Button
                                    variant='outline'
                                    onClick={() =>
                                        handleSelectItem(employee.id)
                                    }
                                >
                                    Select
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default EmployeeSearch;
