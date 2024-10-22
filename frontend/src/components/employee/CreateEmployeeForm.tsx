'use client';

import { useRouter } from 'next/navigation';
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
import { createEmployee } from '@/lib/fetchData';
import { CreateEmployeeInput } from '@/lib/interfaces/EmployeeInterface';
const departments = [
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

const employeeSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    position: z.string().min(1, 'Position is required'),
    department: z.enum(departments),
});

type EmployeeFormInputs = z.infer<typeof employeeSchema>;

export default function CreateEmployeeForm() {
    const router = useRouter();

    const form = useForm<EmployeeFormInputs>({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            name: '',
            position: '',
            department: 'Other',
        },
    });
    const onSubmit = (data: EmployeeFormInputs) => {
        try {
            const employeeData: CreateEmployeeInput = {
                ...data,
            };
            const newEmployee = createEmployee(employeeData);
            console.log('Employee created:', newEmployee);
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
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Enter full name'
                                    {...field}
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
                                >
                                    {departments.map((dept) => (
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
                                    ))}
                                </ToggleGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Create Employee</Button>
            </form>
        </Form>
    );
}
