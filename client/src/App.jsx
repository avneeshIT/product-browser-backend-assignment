import { useState, useEffect } from "react";
import API from "./api";

function App() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [cursor, setCursor] = useState(null);

  // Add Product
  const addProduct = async (e) => {
    e.preventDefault();

    await API.post("/product", {
      name,
      category,
      price,
    });

    alert("Product Added");

    setName("");
    setCategory("");
    setPrice("");
  };

  // Fetch Products
  const fetchProducts = async (selectedCategory = "", currentCursor = null) => {
    let url = "/product?limit=5";

    if (selectedCategory) {
      url += `&category=${selectedCategory}`;
    }

    if (currentCursor) {
      url += `&cursor=${currentCursor}`;
    }

    const res = await API.get(url);

    if (currentCursor) {
      setProducts((prev) => [...prev, ...res.data.data]);
    } else {
      setProducts(res.data.data);
    }

    if (res.data.data.length > 0) {
      const last = res.data.data[res.data.data.length - 1];
      setCursor(last._id);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter
  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter(value);
    setCursor(null);
    fetchProducts(value, null);
  };

  // Load More
  const loadMore = () => {
    fetchProducts(filter, cursor);
  };

  return (
    <div>
      <h1>Product Browser</h1>

      <h2>Add Product</h2>

      <form onSubmit={addProduct}>
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
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button>Add Product</button>
      </form>

      <hr />

      <h2>Products</h2>

      <select value={filter} onChange={handleFilter}>
        <option value="">All</option>
        <option value="electronics">electronics</option>
        <option value="fashion">fashion</option>
        <option value="sports">sports</option>
        <option value="books">books</option>
      </select>

      <hr />

      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>{product.category}</p>
          <p>₹{product.price}</p>
          <hr />
        </div>
      ))}

      <button onClick={loadMore}>Load More</button>
    </div>
  );
}

export default App;