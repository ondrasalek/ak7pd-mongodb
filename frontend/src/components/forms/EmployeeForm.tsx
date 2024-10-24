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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';
import {
    EmployeeInterface,
    EmployeeInput,
} from '@/lib/interfaces/EmployeeInterface';
import { BusinessPositionType } from '@/lib/types/BusinessPositionType';

const employeeSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    position: z.string().min(1, 'Position is required'),
    department: z.nativeEnum(BusinessPositionType),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

interface EmployeeFormProps {
    initialData?: EmployeeInterface;
    onSubmit: (data: EmployeeInput) => void;
    isLoading?: boolean;
}

export function EmployeeForm({
    initialData,
    onSubmit,
    isLoading = false,
}: EmployeeFormProps) {
    const form = useForm<EmployeeFormData>({
        resolver: zodResolver(employeeSchema),
        defaultValues: initialData || {
            name: '',
            position: '',
            department: BusinessPositionType.Other,
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Enter full name'
                                    {...field}
                                    disabled={isLoading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='position'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Position</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Enter position'
                                    {...field}
                                    disabled={isLoading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='department'
                    render={({ field }) => (
                        <FormItem className='space-y-3'>
                            <FormLabel>Department</FormLabel>
                            <FormControl>
                                <ToggleGroup
                                    type='single'
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className='flex flex-wrap gap-2'
                                    disabled={isLoading}
                                >
                                    {Object.values(BusinessPositionType).map(
                                        (dept) => (
                                            <ToggleGroupItem
                                                key={dept}
                                                value={dept}
                                                asChild
                                            >
                                                <Badge
                                                    variant={
                                                        field.value === dept
                                                            ? 'default'
                                                            : 'outline'
                                                    }
                                                >
                                                    {dept}
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
                        ? 'Creating...'
                        : initialData
                        ? 'Update'
                        : 'Create'}
                </Button>
            </form>
        </Form>
    );
}
