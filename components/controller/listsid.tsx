// pages/lists/[id].tsx

import React from 'react';
import { useRouter } from 'next/router';
import ShoppingList from './modal-budge';


const ShoppingListPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    if (!id) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>Lista de Compras</h1>
            <ShoppingList listId={Number(id)} />
        </div>
    );
};

export default ShoppingListPage;
