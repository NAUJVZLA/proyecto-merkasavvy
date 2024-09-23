"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Product } from "../app/interface/createList-Produts";
import { useState } from "react";

interface ProductFormProps {
    currentListId: number | null;
    onAddProduct: (product: Product) => void;
    onClose: () => void;
}

export default function ProductForm({ currentListId, onAddProduct, onClose }: ProductFormProps) {
    const [newProduct, setNewProduct] = useState<Product>({
        id: '',
        listId: currentListId,
        name: '',
        price: 0,
        quantity: 1,
        measure: '',
        provider: ''
    });

    const handleAddProduct = () => {
        if (newProduct.name && newProduct.price > 0 && newProduct.measure && newProduct.provider) {
            onAddProduct(newProduct);
        }
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <h3>Agregar Producto</h3>
            <Input placeholder="Nombre del producto" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
            <Input type="number" placeholder="Precio" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })} />
            <Input type="number" placeholder="Cantidad" value={newProduct.quantity} onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })} />
            <Input placeholder="Medida" value={newProduct.measure} onChange={(e) => setNewProduct({ ...newProduct, measure: e.target.value })} />
            <Input placeholder="Proveedor" value={newProduct.provider} onChange={(e) => setNewProduct({ ...newProduct, provider: e.target.value })} />
            <Button onClick={handleAddProduct} className="bg-green-500 hover:bg-green-600">Agregar Producto</Button>
        </Dialog>
    );
}
