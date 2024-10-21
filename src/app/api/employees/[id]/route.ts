// src/app/api/employees/[id]/route.ts

import { NextResponse } from 'next/server';

const API_URL = process.env.DATABASE_URL;

// PUT (Update Employee)
export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const employeeData = await req.json(); // Get updated employee data from the request body

    const response = await fetch(`${API_URL}/employees/${params.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
    });

    const updatedEmployee = await response.json();
    return NextResponse.json(updatedEmployee, { status: response.status });
}

// DELETE (Delete Employee)
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const response = await fetch(`${API_URL}/employees/${params.id}`, {
        method: 'DELETE',
    });

    return NextResponse.json(
        { message: 'Employee deleted' },
        { status: response.status }
    );
}
