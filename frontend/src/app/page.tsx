// app/page.tsx
'use client';

import Search from '@/components/search/Search';

export default function Home() {
    const fetchUrl = `${process.env.DATABASE_URL}/employees`;

    return (
        <div>
            <h1>Welcome to the Employee Management App</h1>
            <p>Select an employee to proceed.</p>
            <Search type='employees' fetchUrl={fetchUrl} itemNameKey='name' />
            <button onClick={() => (window.location.href = '/employee/new')}>
                New
            </button>
        </div>
    );
}
