import { NoteInterface } from '@/lib/interfaces/NoteInterface';
export default async function NotesPage() {
    const res = await fetch(`${process.env.DATABASE_URL}/notes`, {
        cache: 'no-store', // Avoid caching if you need fresh data on each request
    });

    const notes = await res.json();

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map((note: NoteInterface) => (
                    <li key={note.id}>{note.title}</li>
                ))}
            </ul>
        </div>
    );
}
