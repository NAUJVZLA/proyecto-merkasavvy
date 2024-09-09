"use client";
import React, { useState } from "react";
import Product from "@/app/interface/table-products";

// Esto es un componente llamado ProductTable que crea una tabla de productos
const ProductTable: React.FC = () => {
  // Aquí tenemos una lista de productos que empieza con un producto (Producto J)
  const [products, setProducts] = useState<Product[]>([
    {
      id: "10",
      name: "Producto J",
      price: 11.25,
      measure: "kg",
      quantity: 70,
      provider: "Proveedor J",
    },
  ]);

  // Esta función cambia un producto en la lista cuando lo editamos
  const handleProductUpdate = (index: number, updatedProduct: Product) => {
    const updatedProducts = [...products]; // Creamos una copia de los productos
    updatedProducts[index] = updatedProduct; // Actualizamos el producto en la posición que indicamos
    setProducts(updatedProducts); // Guardamos la nueva lista de productos
  };

  // Aquí mostramos la tabla de productos
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Unidad de Medida</th> <th>Cantidad</th>
          <th>Proveedor</th>
          <th>Acciones</th>{" "}
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={product.id}>
            {" "}
            {/* Por cada producto en la lista, se crea una fila */}
            <td>{product.id}</td> {/* Mostramos el ID */}
            <td>
              <input
                className="input"
                type="text"
                value={product.name}
                onChange={(e) =>
                  handleProductUpdate(index, {
                    ...product, // Copiamos los valores del producto
                    name: e.target.value, // Cambiamos solo el nombre
                  })
                }
              />
            </td>
            <td>
              <input
                className="input"
                type="number"
                value={product.price}
                onChange={(e) =>
                  handleProductUpdate(index, {
                    ...product, // Copiamos los valores del producto
                    price: parseFloat(e.target.value), // Cambiamos solo el precio
                  })
                }
              />
            </td>
            <td>
              <input
                className="input"
                type="text"
                value={product.measure}
                onChange={(e) =>
                  handleProductUpdate(index, {
                    ...product, // Copiamos los valores del producto
                    measure: e.target.value, // Cambiamos solo la medida
                  })
                }
              />
            </td>
            <td>
              {/* Un campo para escribir la cantidad del producto */}
              <input
                className="input"
                type="number"
                value={product.quantity}
                onChange={(e) =>
                  handleProductUpdate(index, {
                    ...product,
                    quantity: parseInt(e.target.value), // Cambiamos solo la cantidad
                  })
                }
              />
            </td>
            <td>
              <input
                className="input"
                type="text"
                value={product.provider}
                onChange={(e) =>
                  handleProductUpdate(index, {
                    ...product, // Copiamos los valores del producto
                    provider: e.target.value, // Cambiamos solo el proveedor
                  })
                }
              />
            </td>
            <td>
              <button className="button">Editar</button>
              <button className="button">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
