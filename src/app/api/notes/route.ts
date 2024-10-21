// src/app/api/notes/route.ts

import { NextResponse } from 'next/server';

const API_URL = process.env.DATABASE_URL; // Use DATABASE_URL

export async function GET() {
    const response = await fetch(`${API_URL}/notes`); // Get all notes
    console.log('API_URL:', API_URL);

    const notes = await response.json();
    return NextResponse.json(notes);
}

export async function POST(req: Request) {
    const noteData = await req.json(); // Get note data from the request body

    const response = await fetch(`${API_URL}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
    });

    const newNote = await response.json();
    return NextResponse.json(newNote, { status: response.status });
}
