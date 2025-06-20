import React from "react";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = {
      name: formData.get("name"),
      price: formData.get("price"),
      image: formData.get("image"),
    };
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      navigate("/");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md mt-10 text-black">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            step="any"
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            required
            className="w-full border rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
