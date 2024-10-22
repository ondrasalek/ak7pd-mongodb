// app/components/Header.tsx
import Link from 'next/link';

const Header = () => {
    return (
        <header className='flex flex-row align-middle items-center h-16 w-full border-b'>
            <h1 className='text-xl'>
                <Link href='/'>AK7PD Employee Management</Link>
            </h1>
        </header>
    );
};

export default Header;
