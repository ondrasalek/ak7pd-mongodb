'use client';

import { useRouter } from 'next/navigation';
import { EmployeeForm } from '@/components/forms/EmployeeForm';
import { createEmployee } from '@/lib/fetchData';
import { EmployeeInput } from '@/lib/interfaces/EmployeeInterface';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function NewEmployeePage() {
    const { toast } = useToast();

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: EmployeeInput) => {
        setIsLoading(true);

        try {
            await createEmployee(data);
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
            <h1 className='text-2xl font-bold mb-4'>Create New Employee</h1>
            <EmployeeForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
    );
}
