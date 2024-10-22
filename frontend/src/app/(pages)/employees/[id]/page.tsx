'use client';
import { EmployeeInterface } from '@/lib/interfaces/EmployeeInterface';
import NotesSearch from '@/components/search/NotesSearch';
import EmployeeCard from '@/components/employee/Card';
import { useEmployee } from '@/lib/fetchData';
import { Card, CardTitle } from '@/components/ui/card';
import { useParams } from 'next/navigation'; // New approach if required

export default function EmployeeDetailsPage() {
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

    return (
        <div className='flex-col space-y-5'>
            <EmployeeCard data={employee} />
            <Card>
                <CardTitle className='p-4'>Notes</CardTitle>
                <NotesSearch userId={employee.id} />
            </Card>
        </div>
    );
}
