'use client';
import { useEffect, useState } from 'react';
import { EmployeeInterface } from '@/lib/interfaces/EmployeeInterface';
import { NoteInterface } from '@/lib/interfaces/NoteInterface';
import Link from 'next/link';

export default function EmployeeDetailsPage({
    params,
}: {
    params: { id: string }; // Change to id
}) {
    const id = params.id;
    const [employee, setEmployee] = useState<EmployeeInterface | null>(null);
    const [notes, setNotes] = useState<NoteInterface[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check if id is a valid ObjectId or name
                const employeeResponse = await fetch(
                    `${process.env.DATABASE_URL}/employees/${id}`, // Endpoint for either ID or name
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!employeeResponse.ok) {
                    throw new Error('Employee not found');
                }

                const employeeData = await employeeResponse.json();
                setEmployee(employeeData);

                // Fetch notes associated with the employee
                const notesResponse = await fetch(
                    `${process.env.DATABASE_URL}/notes?userId=${employeeData._id}`, // Adjust if necessary
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const notesData = await notesResponse.json();
                setNotes(notesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <p>Loading employee details...</p>;
    }

    if (!employee) {
        return <p>Employee not found</p>;
    }

    return (
        <div>
            <h1>{employee.name}</h1>
            <p>
                <strong>Position:</strong> {employee.position}
            </p>
            <p>
                <strong>Department:</strong> {employee.department}
            </p>

            <h2>Notes for {employee.name}</h2>
            {notes.length > 0 ? (
                <ul>
                    {notes.map((note: NoteInterface) => (
                        <Link key={note.id} href={`/notes/${note.id}`}>
                            <li>{note.title}</li>
                        </Link>
                    ))}
                </ul>
            ) : (
                <p>No notes found for this employee.</p>
            )}
        </div>
    );
}
