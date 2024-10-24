// app/components/Header.tsx
'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Undo2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
const Header = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleBackButton = () => {
        router.back();
    };
    return (
        <header className='flex flex-row align-middle items-center justify-between h-16 w-full border-b'>
            <h1 className='text-xl'>
                <Link href='/'>AK7PD Employee Management</Link>
            </h1>
            {pathname !== '/' && (
                <Button
                    onClick={handleBackButton}
                    variant='outline'
                    size='icon'
                >
                    <Undo2 />
                </Button>
            )}
        </header>
    );
};

export default Header;
