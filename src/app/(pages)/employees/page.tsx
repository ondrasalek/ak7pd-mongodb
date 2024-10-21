import { EmployeeInterface } from '@/lib/interfaces/EmployeeInterface';
export default async function EmployeesPage() {
    const res = await fetch(`${process.env.DATABASE_URL}/employees`, {
        cache: 'force-cache', // Default caching behavior
    });

    const employees = await res.json();

    return (
        <div>
            <h1>Employees</h1>
            <ul>
                {employees.map((employee: EmployeeInterface) => (
                    <li key={employee.id}>{employee.name}</li>
                ))}
            </ul>
        </div>
    );
}
