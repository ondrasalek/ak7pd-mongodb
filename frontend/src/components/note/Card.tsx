'use client';
import {
    Card,
    CardHeader,
    CardFooter,
    CardDescription,
    CardTitle,
    CardContent,
} from '@/components/ui/card'; // Replace '@/components/card' with the correct relative path to the 'card' module.
import { useEmployee } from '@/lib/fetchData';
import { Badge } from '@/components/ui/badge';
import { EmployeeInterface } from '@/lib/interfaces/EmployeeInterface';

import { NoteInterface } from '@/lib/interfaces/NoteInterface';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const EmployeeCard = ({ data }: { data: NoteInterface }) => {
    const { employee, isLoading } = useEmployee(data.userId) as {
        employee: EmployeeInterface;
        isLoading: boolean;
    };

    if (isLoading) {
        return <p>Loading employee details...</p>;
    }
    return (
        <Card>
            <CardHeader className='flex flex-row justify-between'>
                <CardTitle>{data.title}</CardTitle>
                <div className='flex flex-row justify-between space-x-5'>
                    <Badge>{data.businessPosition}</Badge>
                    <span>{data.visibility}</span>
                </div>
            </CardHeader>
            <CardContent>{data.content}</CardContent>
            <CardFooter className='flex flex-row justify-between'>
                <Button variant='outline'>
                    <Link href={`/employees/${data.userId}`}>
                        {employee.name}
                    </Link>
                </Button>
                <CardDescription>{data.createdAt}</CardDescription>
            </CardFooter>
        </Card>
    );
};

export default EmployeeCard;
