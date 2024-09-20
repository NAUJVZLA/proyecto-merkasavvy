"use client";
import React, { useState, useEffect } from "react";
import Product from "@/app/interface/table-products";
import { Trash2, Save, FilePen } from "lucide-react"; // Cambiar 'file-pen-line' a 'FilePen'
import NavigatorGeneral from "../navGeneral/page";
import { Inputs } from "@/components/style/Login-Register-Styles";
import { Button } from "@nextui-org/react";

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);

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



  const handleEditProduct = (product: Product) => {
    if (!product.name || !product.price || !product.measure || !product.quantity || !product.provider) {
      alert("Por favor, diligencie todos los datos del producto.");
      return;
    }
    setSavedProducts((prev) => [...prev, product]);
  };

  const handleDeleteProduct = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };



  return (
    <>
      <NavigatorGeneral />
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
                <Inputs
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
                <Inputs
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
                <select
                  className="input"
                  value={product.measure}
                  onChange={(e) =>
                    handleProductUpdate(index, {
                      ...product,
                      measure: e.target.value, // Actualiza el valor de measure
                    })
                  }
                >
                  <option value="kg">Kilogramos</option>
                  <option value="lb">Libra</option>
                  <option value="l">Litros</option>
                  <option value="ml">Mililitros</option>
                  <option value="unidad">Unidad</option>
                </select>
              </td>
              <td>
                <Inputs
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
                <Inputs
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
                <Button
                  className="button"
                >
                  {" "}
                  <Save xlinkTitle="Guardar" />
                </Button>
                <Button
                  className='button'
                  onClick={() => handleEditProduct(products[index])}>
                  {" "}
                  <FilePen xlinkTitle="Editar" />
                </Button>
                <Button className="button"
                  onClick={() => handleDeleteProduct(index)}>
                  {" "}
                  <Trash2 xlinkTitle="Borrar" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductTable;
