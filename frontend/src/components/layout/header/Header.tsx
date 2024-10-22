// app/components/Header.tsx
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCookies } from 'next-client-cookies';
import { EmployeeInterface } from '@/lib/interfaces/EmployeeInterface';

const Header = () => {
    const cookies = useCookies();
    const selectedEmployeeId = cookies.get('selectedItem') || null;
    const [selectedEmployeeName, setSelectedEmployeeName] = useState<
        string | null
    >(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            if (selectedEmployeeId) {
                try {
                    const response = await fetch(
                        `${process.env.DATABASE_URL}/employees/${selectedEmployeeId}`
                    );
                    if (response.ok) {
                        const employee: EmployeeInterface =
                            await response.json();
                        setSelectedEmployeeName(employee.name);
                    } else {
                        setSelectedEmployeeName('Employee not found');
                    }
                } catch (error) {
                    console.error('Error fetching employee:', error);
                    setSelectedEmployeeName('Error fetching employee');
                }
            } else {
                setSelectedEmployeeName(null);
            }
        };

        fetchEmployee();
    }, [selectedEmployeeId]);

    return (
        <header className='p-4 bg-gray-800 text-white'>
            <h1 className='text-xl'>AK7PD Employee Management</h1>
            <nav>
                <Link href='/' className='text-white'>
                    Home
                </Link>
            </nav>
            <h2 className='text-lg'>
                <Link href={`/employees/${selectedEmployeeId}`}>
                    {selectedEmployeeName}
                </Link>
            </h2>
        </header>
    );
};

export default Header;
