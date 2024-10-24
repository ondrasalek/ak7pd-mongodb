'use client';

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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';

type SortOrder = 'asc' | 'desc';

const EmployeeSearch = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
    const { employees, isLoading } = useEmployees();

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

    const filteredAndSortedEmployees = employees
        ?.filter((employee) => {
            const nameMatch = employee.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const dateMatch = dateFilter
                ? new Date(employee.createdAt).toISOString().split('T')[0] ===
                  dateFilter
                : true;
            return nameMatch && dateMatch;
        })
        .sort((a, b) => {
            const dateA = new Date(a['createdAt']).getTime();
            const dateB = new Date(b['createdAt']).getTime();
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

    const handleSelectItem = (id: string) => {
        router.push(`/employees/${id}`);
    };

    if (isLoading) {
        return <div className='text-center py-4'>Loading employees...</div>;
    }

    if (!employees || employees.length === 0 || employees === undefined) {
        return (
            <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>No employees found</AlertTitle>
                <AlertDescription>
                    There are no employees to display at this time.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className='space-y-4'>
            <div className='flex flex-col sm:flex-row gap-4 justify-between'>
                <Input
                    type='text'
                    placeholder='Search employees...'
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

            <div className='rounded-md border'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-[300px]'>Name</TableHead>
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
                            <TableHead className='text-right'>
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAndSortedEmployees?.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell className='font-medium'>
                                    {employee.name}
                                </TableCell>
                                <TableCell>
                                    {formatDateTime(employee.createdAt)}
                                </TableCell>
                                <TableCell className='text-right'>
                                    <Button
                                        variant='outline'
                                        size='sm'
                                        onClick={() =>
                                            handleSelectItem(employee.id)
                                        }
                                    >
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default EmployeeSearch;
