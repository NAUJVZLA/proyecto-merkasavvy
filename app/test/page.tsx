'use client'

import React, { useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    measure: string;
    quantity: number;
    provider: string;
}

const CreateShoppingList: React.FC = () => {
    const [listName, setListName] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState<Product>({
        id: Date.now(),
        name: '',
        price: 0,
        measure: '',
        quantity: 1,
        provider: ''
    });

    const handleAddProduct = () => {
        if (newProduct.name && newProduct.price > 0) {
            setProducts([...products, newProduct]);
            setNewProduct({ id: Date.now(), name: '', price: 0, measure: '', quantity: 1, provider: '' });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (listName && products.length > 0) {
            // Aquí puedes hacer una llamada a tu API para guardar la lista
            const response = await fetch('http://localhost:5000/lists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: listName, products }),
            });
            if (response.ok) {
                // Maneja la respuesta (por ejemplo, redirigir o mostrar un mensaje de éxito)
                console.log('Lista de compras creada');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Crear Lista de Compras</h2>
            <div>
                <label>Nombre de la Lista:</label>
                <input
                    type="text"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    required
                />
            </div>

            <h3>Agregar Productos</h3>
            <div>
                <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    required
                />
                <input
                    type="text"
                    placeholder="Medida"
                    value={newProduct.measure}
                    onChange={(e) => setNewProduct({ ...newProduct, measure: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Cantidad"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
                    min="1"
                    required
                />
                <input
                    type="text"
                    placeholder="Proveedor"
                    value={newProduct.provider}
                    onChange={(e) => setNewProduct({ ...newProduct, provider: e.target.value })}
                    required
                />
                <button type="button" onClick={handleAddProduct}>Agregar Producto</button>
            </div>

            <h4>Productos Agregados:</h4>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.quantity} {product.measure} a ${product.price} (Proveedor: {product.provider})
                    </li>
                ))}
            </ul>

            <button type="submit">Crear Lista</button>
        </form>
    );
};

export default CreateShoppingList;
