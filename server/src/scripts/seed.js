require("dotenv").config();

const connectDB = require("../config/db");
const Product = require("../models/product.model");

const seedProducts = async () => {
  try {
    // connect to database
    await connectDB();

    console.log("Database connected...");

    const categories = [
      "electronics",
      "fashion",
      "sports",
      "books"
    ];

    // generate 200000 products efficiently
    const products = Array.from(
      { length: 200000 },
      (_, i) => ({
        name: `Product ${i + 1}`,

        category: categories[i % categories.length],

        price: Math.floor(Math.random() * 5000) + 100
      })
    );

    console.log("Generating products...");

    // bulk insert
    await Product.insertMany(products);

    console.log("200000 Products inserted successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedProducts();