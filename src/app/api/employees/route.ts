// src/app/api/employees/route.ts

import { NextResponse } from 'next/server';

const API_URL = process.env.DATABASE_URL; // Use DATABASE_URL

export async function GET() {
    console.log('API_URL:', API_URL);

    const response = await fetch(`${API_URL}/employees`); // Get all employees
    const employees = await response.json();
    return NextResponse.json(employees);
}

export async function POST(req: Request) {
    const employeeData = await req.json(); // Get employee data from the request body

    const response = await fetch(`${API_URL}/employees`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
    });

    const newEmployee = await response.json();
    return NextResponse.json(newEmployee, { status: response.status });
}
