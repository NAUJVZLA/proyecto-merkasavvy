"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface Product {
    id: string;
    listId: number | null;
    name: string;
    price: number;
    quantity: number;
    measure: string;
    provider: string;
}

interface List {
    id: number;
    name: string;
    totalAmount: number;
    items: Product[];
}

export default function CreateAndViewLists() {
    const [listName, setListName] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [lists, setLists] = useState<List[]>([]);
    const [showLists, setShowLists] = useState(false);
    const [editingListId, setEditingListId] = useState<number | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
    const [showProductDialog, setShowProductDialog] = useState(false);
    const [currentListId, setCurrentListId] = useState<number | null>(null);
    const [newProduct, setNewProduct] = useState<Product>({
        id: '',
        listId: null,
        name: '',
        price: 0,
        quantity: 1,
        measure: '',
        provider: ''
    });
    const [editingListName, setEditingListName] = useState('');

    const createList = async () => {
        if (!listName || totalAmount <= 0) {
            toast.error('Por favor, complete todos los campos.');
            return;
        }

        const newList = {
            name: listName,
            totalAmount: totalAmount,
            items: []
        };

        const response = await fetch('http://localhost:5000/lists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newList),
        });

        if (response.ok) {
            const createdList = await response.json();
            setLists([...lists, createdList]);
            toast.success('Lista creada con éxito!');
            resetForm();
        } else {
            toast.error('Error al crear la lista.');
        }
    };

    const fetchLists = async () => {
        const response = await fetch('http://localhost:5000/lists?_embed=products');
        if (response.ok) {
            const data = await response.json();
            setLists(data);
        } else {
            toast.error('Error al cargar listas.');
        }
    };

    const toggleShowLists = () => {
        if (!showLists) {
            fetchLists();
        }
        setShowLists(!showLists);
    };

    const resetForm = () => {
        setListName('');
        setTotalAmount(0);
        setEditingListId(null);
    };

    const deleteList = async (id: number) => {
        const response = await fetch(`http://localhost:5000/lists/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setLists(lists.filter((list) => list.id !== id));
            toast.success('Lista borrada con éxito!');
            setConfirmDelete(null);
        } else {
            toast.error('Error al borrar la lista.');
        }
    };

    const handleAddProduct = () => {
        setShowProductDialog(true);
    };

    const addProductToList = async () => {
        if (!newProduct.name || newProduct.price <= 0 || newProduct.measure === '' || newProduct.provider === '') {
            toast.error('Por favor, complete todos los campos del producto.');
            return;
        }

        const productToAdd = {
            ...newProduct,
            listId: currentListId,
            id: new Date().toISOString() // Generar un ID único
        };

        const response = await fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productToAdd),
        });

        if (response.ok) {
            const addedProduct = await response.json();
            setLists(lists.map(list => {
                if (list.id === currentListId) {
                    return { ...list, items: [...list.items, addedProduct] };
                }
                return list;
            }));
            toast.success('Producto agregado con éxito!');
            setNewProduct({ id: '', listId: null, name: '', price: 0, quantity: 1, measure: '', provider: '' });
            setShowProductDialog(false);
        } else {
            toast.error('Error al agregar el producto.');
        }
    };

    const getTotalForList = (items: Product[]) => {
        return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const handleEditList = (listId: number, currentName: string) => {
        setEditingListId(listId);
        setEditingListName(currentName);
    };

    const updateList = async () => {
        const response = await fetch(`http://localhost:5000/lists/${editingListId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: editingListName })
        });

        if (response.ok) {
            setLists(lists.map(list => list.id === editingListId ? { ...list, name: editingListName } : list));
            toast.success('Lista actualizada con éxito!');
            setEditingListId(null);
        } else {
            toast.error('Error al actualizar la lista.');
        }
    };

    return (
        <div className="p-4">
            <ToastContainer />
            <h2 className="text-lg font-bold">Crear Nueva Lista</h2>
            <div className="grid gap-4 mb-4">
                <Input
                    placeholder="Nombre de la lista"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                />
                <Input
                    type="number"
                    placeholder="Total estimado"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                />
                <Button onClick={createList} className="bg-green-500 hover:bg-green-600">
                    Crear Lista
                </Button>
            </div>
            <Button onClick={toggleShowLists} className="bg-blue-500 hover:bg-blue-600">
                {showLists ? 'Ocultar Listas' : 'Ver Listas'}
            </Button>

            {showLists && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold">Listas Creadas</h3>
                    <ul className="list-disc pl-5">
                        {lists.map((list) => (
                            <li key={list.id} className="flex justify-between items-center">
                                {editingListId === list.id ? (
                                    <div>
                                        <Input
                                            value={editingListName}
                                            onChange={(e) => setEditingListName(e.target.value)}
                                        />
                                        <Button onClick={updateList} className="bg-green-500 hover:bg-green-600">
                                            Actualizar Lista
                                        </Button>
                                    </div>
                                ) : (
                                    <span>{list.name} - Total: ${getTotalForList(list.items)}</span>
                                )}
                                <div>
                                    <Button onClick={() => { setCurrentListId(list.id); handleAddProduct(); }} className="bg-yellow-400 hover:bg-yellow-500 mr-2">
                                        Agregar Producto
                                    </Button>
                                    <Button onClick={() => handleEditList(list.id, list.name)} className="bg-blue-400 hover:bg-blue-500 mr-2">
                                        Editar
                                    </Button>
                                    <Button onClick={() => deleteList(list.id)} variant="destructive">
                                        Borrar
                                    </Button>
                                </div>
                                <Accordion>
                                    <AccordionItem>
                                        <AccordionTrigger>Ver Productos</AccordionTrigger>
                                        <AccordionContent>
                                            <ul>
                                                {list.items.map(product => (
                                                    <li key={product.id}>
                                                        {product.name} - Precio: ${product.price} - Cantidad: {product.quantity} - Medida: {product.measure} - Proveedor: {product.provider}
                                                    </li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Diálogo para agregar producto */}
            {showProductDialog && (
                <Dialog open={true} onOpenChange={() => setShowProductDialog(false)}>
                    <h3>Agregar Producto a la Lista</h3>
                    <Input placeholder="Nombre del producto" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                    <Input type="number" placeholder="Precio" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })} />
                    <Input type="number" placeholder="Cantidad" value={newProduct.quantity} onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })} />
                    <Input placeholder="Medida" value={newProduct.measure} onChange={(e) => setNewProduct({ ...newProduct, measure: e.target.value })} />
                    <Input placeholder="Proveedor" value={newProduct.provider} onChange={(e) => setNewProduct({ ...newProduct, provider: e.target.value })} />
                    <Button onClick={addProductToList} className="bg-green-500 hover:bg-green-600">Agregar Producto</Button>
                </Dialog>
            )}
        </div>
    );
}
