'use client';

import { useRouter, useParams } from 'next/navigation';
import { EmployeeForm } from '@/components/forms/EmployeeForm';
import { useEmployee, updateEmployee } from '@/lib/fetchData';
import { EmployeeInput } from '@/lib/interfaces/EmployeeInterface';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function EditEmployeePage() {
    const { toast } = useToast();

    const router = useRouter();
    const params = useParams(); // Using useParams to get params
    const { id } = params as { id: string }; // Type assertion
    const { employee, isLoading: fetchingIsLoading, isError } = useEmployee(id);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: EmployeeInput) => {
        setIsLoading(true);

        try {
            await updateEmployee(id, data);
            toast({
                title: 'Success',
                description: 'Employee updated successfully',
            });
            router.push('/');
        } catch (error) {
            toast({
                title: 'Error',
                description: `Failed to update employee: ${error}`,
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (fetchingIsLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading employee</div>;

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>Edit Employee</h1>
            <EmployeeForm
                initialData={employee}
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </div>
    );
}
