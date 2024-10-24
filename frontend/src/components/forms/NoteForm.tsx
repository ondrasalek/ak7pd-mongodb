'use client';

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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';
import { NoteInterface, NoteInput } from '@/lib/interfaces/NoteInterface';
import { BusinessPositionType } from '@/lib/types/BusinessPositionType';
import { VisibilityType } from '@/lib/types/VisibilityType';

const noteSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    businessPosition: z.nativeEnum(BusinessPositionType),
    visibility: z.nativeEnum(VisibilityType),
});

type NoteFormData = z.infer<typeof noteSchema>;

interface NoteFormProps {
    initialData?: NoteInterface;
    onSubmit: (data: NoteInput) => void;
    isLoading?: boolean;
    userId: string;
}

export function NoteForm({
    initialData,
    onSubmit,
    isLoading = false,
    userId,
}: NoteFormProps) {
    const form = useForm<NoteFormData>({
        resolver: zodResolver(noteSchema),
        defaultValues: initialData || {
            title: '',
            content: '',
            businessPosition: BusinessPositionType.Other,
            visibility: VisibilityType.Public,
        },
    });

    const handleSubmit = (data: NoteFormData) => {
        const submitData: NoteInput = {
            ...data,
            userId,
        };
        onSubmit(submitData);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='space-y-8'
            >
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
                                    {Object.values(BusinessPositionType).map(
                                        (position) => (
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
                                        )
                                    )}
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
                        <FormItem className='space-y-3'>
                            <FormLabel>Visibility</FormLabel>
                            <FormControl>
                                <ToggleGroup
                                    type='single'
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className='flex flex-wrap gap-2'
                                >
                                    {Object.values(VisibilityType).map(
                                        (option) => (
                                            <ToggleGroupItem
                                                key={option}
                                                value={option}
                                                asChild
                                            >
                                                <Badge
                                                    variant={
                                                        field.value === option
                                                            ? 'default'
                                                            : 'outline'
                                                    }
                                                >
                                                    {option}
                                                </Badge>
                                            </ToggleGroupItem>
                                        )
                                    )}
                                </ToggleGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit' disabled={isLoading}>
                    {isLoading
                        ? 'Submitting...'
                        : initialData
                        ? 'Update Note'
                        : 'Create Note'}
                </Button>
            </form>
        </Form>
    );
}
