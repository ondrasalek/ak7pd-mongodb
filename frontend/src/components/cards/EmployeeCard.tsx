import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EmployeeInterface } from '@/lib/interfaces/EmployeeInterface';
import { CalendarDays, Clock, Briefcase, Users } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

const EmployeeCard = ({ data }: { data: EmployeeInterface }) => {
    return (
        <Card>
            <CardHeader className='pb-2'>
                <div className='flex justify-between items-start'>
                    <div>
                        <CardTitle className='text-2xl font-bold'>
                            {data.name}
                        </CardTitle>
                    </div>
                </div>
            </CardHeader>
            <CardContent className='p-2 flex flex-row '>
                <Badge className='flex items-center space-x-2 text-sm w-fit'>
                    <Briefcase className='h-4 w-4' />
                    <span>{data.position}</span>
                </Badge>
                <Badge
                    className='flex items-center space-x-2 text-sm w-fit'
                    variant='secondary'
                >
                    <Users className='h-4 w-4' />
                    <span>{data.department}</span>
                </Badge>
            </CardContent>
            <CardFooter className='flex flex-row justify-between align-middle items-center border-t p-4'>
                <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
                    <CalendarDays className='h-4 w-4' />
                    <span>
                        Joined{' '}
                        {format(new Date(data.createdAt), 'MMMM d, yyyy')}
                    </span>
                </div>
                <div className='flex items-center space-x-2 text-sm text-muted-foreground mt-1'>
                    <Clock className='h-4 w-4' />
                    <span>
                        Last updated{' '}
                        {formatDistanceToNow(new Date(data.updatedAt), {
                            addSuffix: true,
                        })}
                    </span>
                </div>
            </CardFooter>
        </Card>
    );
};

export default EmployeeCard;
