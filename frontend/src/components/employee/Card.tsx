import {
    Card,
    CardHeader,
    CardFooter,
    CardDescription,
    CardTitle,
    CardContent,
} from '@/components/ui/card'; // Replace '@/components/card' with the correct relative path to the 'card' module.

import { EmployeeInterface } from '@/lib/interfaces/EmployeeInterface';

const EmployeeCard = ({ data }: { data: EmployeeInterface }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{data.name}</CardTitle>
                <CardDescription>{data.position}</CardDescription>
            </CardHeader>
            <CardContent>Department: {data.department}</CardContent>
            <CardFooter>
                <CardDescription>{data.createdAt}</CardDescription>
            </CardFooter>
        </Card>
    );
};

export default EmployeeCard;
