'use client';
import { EmployeeInterface } from '@/lib/interfaces/EmployeeInterface';
import NotesSearch from '@/components/search/NotesSearch';
import EmployeeCard from '@/components/employee/Card';
import { useEmployee, deleteEmployee } from '@/lib/fetchData';
import { Card, CardTitle } from '@/components/ui/card';
import { useParams } from 'next/navigation'; // New approach if required
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Edit, Trash2, Plus } from 'lucide-react';

export default function EmployeeDetailsPage() {
    const router = useRouter();
    const params = useParams(); // Using useParams to get params
    const { id } = params as { id: string }; // Type assertion
    const { employee, isLoading, isError } = useEmployee(id) as {
        employee: EmployeeInterface | undefined;
        isLoading: boolean;
        isError: boolean;
    };

    // Loading state
    if (isLoading) {
        return <p>Loading employee details...</p>;
    }

    // Error state
    if (isError || !employee) {
        return (
            <p>
                Employee not found or there was an error fetching the details.
            </p>
        );
    }
    const handleEdit = () => {
        router.push(`/employees/edit/${employee.id}`);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                deleteEmployee(employee.id);
                router.push('/');
            } catch (error) {
                console.error('Failed to delete employee:', error);
            }
        }
    };
    const handleNewNote = () => {
        router.push(`/notes/new?userId=${employee.id}`);
    };
    return (
        <div className='flex-col space-y-5 w-full'>
            <div className='space-x-2 float-right'>
                <Button variant='outline' onClick={handleEdit}>
                    <Edit className='mr-2 h-4 w-4' /> Edit
                </Button>
                <Button variant='destructive' onClick={handleDelete}>
                    <Trash2 className='mr-2 h-4 w-4' /> Delete
                </Button>
            </div>
            <EmployeeCard data={employee} />

            <Button
                variant='default'
                onClick={handleNewNote}
                className='float-right'
            >
                <Plus className='mr-2 h-4 w-4' /> New Note
            </Button>
            <Card>
                <CardTitle className='p-4'>Notes</CardTitle>
                <NotesSearch userId={employee.id} />
            </Card>
        </div>
    );
}
