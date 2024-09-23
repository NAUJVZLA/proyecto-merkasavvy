

import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  measure: string;
  quantity: number;
  provider: string;
}

interface ShoppingList {
  id: number;
  name: string;
  products: Product[];
}

const ShoppingList: React.FC<{ listId: number }> = ({ listId }) => {
  const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null);
  const [newProduct, setNewProduct] = useState<Product>({
    id: Date.now(),
    name: '',
    price: 0,
    measure: '',
    quantity: 1,
    provider: ''
  });

  useEffect(() => {
    const fetchList = async () => {
      const response = await fetch(`http://localhost:5000/lists/${listId}`);
      const data = await response.json();
      setShoppingList(data);
    };

    fetchList();
  }, [listId]);

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.price > 0) {
      const updatedList = { ...shoppingList, products: [...shoppingList?.products, newProduct] };
      const response = await fetch(`http://localhost:5000/lists/${listId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedList),
      });
      if (response.ok) {
        setShoppingList(updatedList);
        setNewProduct({ id: Date.now(), name: '', price: 0, measure: '', quantity: 1, provider: '' });
      }
    }
  };

  const handleEditProduct = async (id: number, updatedProduct: Product) => {
    const updatedProducts = shoppingList?.products.map(product =>
      product.id === id ? updatedProduct : product
    ) || [];

    const updatedList = { ...shoppingList, products: updatedProducts };
    await fetch(`http://localhost:5000/lists/${listId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedList),
    });

    setShoppingList(updatedList);
  };

  return (
    <div>
      <h2>{shoppingList?.name}</h2>
      <h3>Productos:</h3>
      <ul>
        {shoppingList?.products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.quantity} {product.measure} a ${product.price} (Proveedor: {product.provider})
            <button onClick={() => handleEditProduct(product.id, { ...product, quantity: product.quantity + 1 })}>Agregar</button>
          </li>
        ))}
      </ul>

      <h4>Agregar Producto</h4>
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
    </div>
  );
};

export default ShoppingList;
