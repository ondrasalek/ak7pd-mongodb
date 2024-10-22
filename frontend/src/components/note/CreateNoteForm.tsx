'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { createNote } from '@/lib/fetchData';
import { CreateNoteInput } from '@/lib/interfaces/NoteInterface';

const businessPositions = [
    'Developer',
    'Manager',
    'Designer',
    'QA',
    'DevOps',
    'Engineering',
    'Marketing',
    'Sales',
    'HR',
    'Finance',
    'Other',
] as const;
const visibilityOptions = ['Public', 'Private'] as const;

const noteSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    businessPosition: z.enum(businessPositions),
    visibility: z.enum(visibilityOptions),
});

type NoteFormInputs = z.infer<typeof noteSchema>;

export default function CreateNoteForm() {
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');
    const router = useRouter();

    const form = useForm<NoteFormInputs>({
        resolver: zodResolver(noteSchema),
        defaultValues: {
            title: '',
            content: '',
            businessPosition: 'Other',
            visibility: 'Private',
        },
    });

    const onSubmit = (data: NoteFormInputs) => {
        if (!userId) {
            console.error('User ID is required');
            return;
        }

        try {
            const noteData: CreateNoteInput = {
                ...data,
                userId: userId,
            };
            const newNote = createNote(noteData);
            console.log('Note created:', newNote);
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Enter note title'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='content'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='Enter note content'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='businessPosition'
                    render={({ field }) => (
                        <FormItem className='space-y-3'>
                            <FormLabel>Business Position</FormLabel>
                            <FormControl>
                                <ToggleGroup
                                    type='single'
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className='flex flex-wrap gap-2'
                                >
                                    {businessPositions.map((position) => (
                                        <ToggleGroupItem
                                            key={position}
                                            value={position}
                                            asChild
                                        >
                                            <Badge
                                                variant={
                                                    field.value === position
                                                        ? 'default'
                                                        : 'outline'
                                                }
                                            >
                                                {position}
                                            </Badge>
                                        </ToggleGroupItem>
                                    ))}
                                </ToggleGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='visibility'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Visibility</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select visibility' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {visibilityOptions.map((option) => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit'>Create Note</Button>
            </form>
        </Form>
    );
}
