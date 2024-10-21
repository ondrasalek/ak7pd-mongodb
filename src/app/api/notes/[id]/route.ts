// src/app/api/notes/[id]/route.ts

import { NextResponse } from 'next/server';

const API_URL = process.env.DATABASE_URL;

// PUT (Update Note)
export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const noteData = await req.json(); // Get updated note data from the request body

    const response = await fetch(`${API_URL}/notes/${params.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
    });

    const updatedNote = await response.json();
    return NextResponse.json(updatedNote, { status: response.status });
}

// DELETE (Delete Note)
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const response = await fetch(`${API_URL}/notes/${params.id}`, {
        method: 'DELETE',
    });

    return NextResponse.json(
        { message: 'Note deleted' },
        { status: response.status }
    );
}
