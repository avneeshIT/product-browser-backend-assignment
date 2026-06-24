import { useState } from "react";
import API from "../api";
function ProductForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/products", {
        name,
        category,
        price
      });

      alert("Product Added");

      setName("");
      setCategory("");
      setPrice("");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="electronics">electronics</option>
          <option value="fashion">fashion</option>
          <option value="sports">sports</option>
          <option value="books">books</option>
        </select>

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button>Add Product</button>
      </form>
    </div>
  );
}

export default ProductForm;