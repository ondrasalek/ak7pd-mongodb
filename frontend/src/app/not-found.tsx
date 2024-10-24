import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='flex-1 w-full h-full flex flex-col items-center align-middle '>
            <h2 className='text-4xl'>404 - Not found</h2>
            <Button variant='link'>
                <Link href='/'>Return Home</Link>
            </Button>
        </div>
    );
}
