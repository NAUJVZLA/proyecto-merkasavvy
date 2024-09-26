'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const CreateShoppingList: React.FC = () => {
    const [listName, setListName] = useState<string>('');
    const [budget, setBudget] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (listName && budget) {
            const newList = {
                name: listName,
                budget: parseFloat(budget)
            };

            try {
                const response = await fetch('http://localhost:5000/lists', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newList),
                });
                if (response.ok) {
                    console.log('Lista de compras creada');
                    setListName('');
                    setBudget('');
                } else {
                    console.error('Error al crear la lista');
                }
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold">Crear Lista de Compras</h2>
            <div>
                <label htmlForm="listName">Nombre de la Lista:</label>
                <Input
                    id="listName"
                    type="text"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlForm="budget">Presupuesto Máximo:</label>
                <Input
                    id="budget"
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                />
            </div>
            <Button type="submit">Crear Lista</Button>
        </form>
    );
};

export default CreateShoppingList;