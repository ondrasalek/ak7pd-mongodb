import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NoteInterface } from '@/lib/interfaces/NoteInterface';
import { formatDistanceToNow, format } from 'date-fns';
import { CalendarDays, Clock } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface NoteCardProps {
    data: NoteInterface;
}

export default function NoteCard({ data }: NoteCardProps) {
    return (
        <Card className='w-full'>
            <CardHeader className='space-y-1'>
                <CardTitle className='text-2xl font-bold'>
                    {data.title}
                </CardTitle>
                <CardDescription className='text-sm text-muted-foreground'>
                    <Label className='flex items-center space-x-2'>
                        <CalendarDays className='h-4 w-4' />
                        <span>
                            Created {format(new Date(data.createdAt), 'PPP')}
                        </span>
                    </Label>
                    {data.updatedAt !== data.createdAt && (
                        <Label className='flex items-center space-x-2 mt-1'>
                            <Clock className='h-4 w-4' />
                            <span>
                                Updated{' '}
                                {formatDistanceToNow(new Date(data.updatedAt), {
                                    addSuffix: true,
                                })}
                            </span>
                        </Label>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className='whitespace-pre-wrap text-gray-700 leading-relaxed'>
                    {data.content}
                </p>
            </CardContent>
            <CardFooter className='flex justify-between items-center pt-4 border-t'>
                <Badge variant='outline'>{data.businessPosition}</Badge>
                <span className='text-sm text-muted-foreground'>
                    ID: {data.id.slice(-6)}
                </span>
                <Badge variant='secondary' className='text-center'>
                    {data.visibility}
                </Badge>
            </CardFooter>
        </Card>
    );
}
