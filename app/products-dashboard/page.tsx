"use client";
import React, { useState, useEffect } from "react";
import Product from "@/app/interface/table-products";
import { Trash2, Save } from "lucide-react";
import Nav from "../navGeneral/page"


const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Función para obtener los productos desde db.json
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/productos");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Cargar los productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Función para actualizar un producto
  const handleProductUpdate = async (
    index: number,
    updatedProduct: Product
  ) => {
    const updatedProducts = [...products];
    updatedProducts[index] = updatedProduct;

    setProducts(updatedProducts);

    // Actualizar el producto en la base de datos
    try {
      await fetch(`http://localhost:5000/productos/${updatedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
    <Nav/>
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Unidad de Medida</th>
          <th>Cantidad</th>
          <th>Proveedor</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>
              <input
                className="input"
                type="text"
                value={product.name}
                onChange={(e) =>
                  handleProductUpdate(index, {
                    ...product,
                    name: e.target.value,
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
                    ...product,
                    price: parseFloat(e.target.value),
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
                    ...product,
                    measure: e.target.value,
                  })
                }
              />
            </td>
            <td>
              <input
                className="input"
                type="number"
                value={product.quantity}
                onChange={(e) =>
                  handleProductUpdate(index, {
                    ...product,
                    quantity: parseInt(e.target.value),
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
                    ...product,
                    provider: e.target.value,
                  })
                }
              />
            </td>
            <td>
              <button className="button">
                {" "}
                <Save xlinkTitle="Guardar" />
              </button>
              <button className="button">
                {" "}
                <Trash2 />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
    
  );
};

export default ProductTable;
