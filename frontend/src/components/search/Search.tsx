import { useEffect, useState } from 'react';
import { useCookies } from 'next-client-cookies';
import { EmployeeInterface } from '@/lib/interfaces/EmployeeInterface';
import { NoteInterface } from '@/lib/interfaces/NoteInterface';
import { useRouter } from 'next/navigation';

interface SearchProps {
    type: 'employees' | 'notes';
    fetchUrl: string;
    itemNameKey: string; // The key to display item name (for example, "name" for employees and "title" for notes)
}

const Search = ({ type, fetchUrl, itemNameKey }: SearchProps) => {
    const router = useRouter();
    const [items, setItems] = useState<EmployeeInterface[] | NoteInterface[]>(
        []
    );
    const [searchTerm, setSearchTerm] = useState('');
    const cookies = useCookies();
    const selectedItem = cookies.get('selectedItem');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(fetchUrl);
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [fetchUrl, cookies, itemNameKey]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSelectItem = (item: EmployeeInterface | NoteInterface) => {
        if (type === 'employees') {
            cookies.set('selectedItem', item.id, { path: '/' });
        }
        router.push(`/${type}/${item.id}`);
    };

    const filteredItems = items.filter((item) =>
        item[itemNameKey]?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type='text'
                placeholder={`Search ${type}...`}
                value={searchTerm}
                onChange={handleSearch}
                className='border p-2 mb-2'
            />
            <ul>
                {filteredItems.map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => handleSelectItem(item)}
                            className={
                                'p-2 border block w-full text-left ' +
                                (item.id === selectedItem ? 'bg-gray-200' : '')
                            }
                        >
                            {item[itemNameKey]}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
