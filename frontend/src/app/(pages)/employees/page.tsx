'use client';
import { useEffect, useState } from 'react';
import { EmployeeInterface } from '@/lib/interfaces/EmployeeInterface';

export default function EmployeesPage() {
    const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch employees data from the backend
    useEffect(() => {
        async function fetchEmployees() {
            try {
                const response = await fetch(
                    `${process.env.DATABASE_URL}/employees`
                );
                const data = await response.json();
                setEmployees(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching employees:', error);
                setLoading(false);
            }
        }

        fetchEmployees();
    }, []);

    if (loading) {
        return <p>Loading employees...</p>;
    }

    return (
        <div>
            <h1>Employees</h1>
            <ul>
                {employees.map((employee: EmployeeInterface) => (
                    <li key={employee.id}>
                        {employee.name} - {employee.position} (
                        {employee.department})
                    </li>
                ))}
            </ul>
        </div>
    );
}
