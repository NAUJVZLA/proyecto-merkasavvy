// components/ShoppingLists.tsx (Ejemplo)

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface ShoppingList {
    id: number;
    name: string;
}

const ShoppingLists: React.FC = () => {
    const [lists, setLists] = useState<ShoppingList[]>([]);

    useEffect(() => {
        const fetchLists = async () => {
            const response = await fetch('http://localhost:5000/lists');
            const data = await response.json();
            setLists(data);
        };

        fetchLists();
    }, []);

    return (
        <div>
            <h2>Listas de Compras</h2>
            <ul>
                {lists.map((list) => (
                    <li key={list.id}>
                        <Link href={`/lists/${list.id}`}>{list.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShoppingLists;
