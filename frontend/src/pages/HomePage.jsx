import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import EditModal from "../components/EditModal";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (_id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${_id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.success) {
        setProducts(products.filter((product) => product._id !== _id));
      } else {
        console.error("Failed to delete product:", data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleSave = async (_id, updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) throw new Error("Failed to update product");

      const updatedProduct = await response.json();
      setProducts((prev) =>
        prev.map((p) => (p._id === _id ? updatedProduct.data : p))
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-10 mt-10">
        {products.length === 0 ? (
          <li>No products available</li>
        ) : (
          products.map((product) => (
            <li
              className="flex flex-col items-center bg-emerald-900 rounded-2xl lg:mx-10"
              key={product._id}
            >
              <h2 className="font-bold text-2xl">{product.name}</h2>
              <p className="font-semibold text-xl">Price: ${product.price}</p>
              {product.image && (
                <img
                  className="w-[200px] h-[200px]"
                  src={product.image}
                  alt={product.name + " image"}
                />
              )}
              <div className="flex gap-2 mt-2 text-5xl">
                <button
                  className="hover:text-blue-500"
                  onClick={() => handleEditClick(product)}
                >
                  <BiEdit />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="hover:text-red-500"
                >
                  <MdDelete />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
      {showModal && (
        <EditModal
          product={selectedProduct}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default HomePage;
