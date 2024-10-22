// app/page.tsx
'use client';

import Search from '@/components/search/Search';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-row justify-between w-full'>
                <h2 className='text-xl'>Employees</h2>
                <Button variant='default' type='button'>
                    <Link href='/employees/new'>New</Link>
                </Button>
            </div>
            <p>Select an employee to proceed.</p>
            <Search type='employees' />
        </div>
    );
}
