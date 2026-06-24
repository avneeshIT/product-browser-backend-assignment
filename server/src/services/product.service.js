const Product = require("../models/product.model");

const createProductService = async (productData) => {
  const product = await Product.create(productData);

  return product;
};


const getProductService = async (
  category,
  cursor,
  limit
) => {
  
  let query = {};

  if (category) {
    query.category = category;
  }

  if (cursor) {
    query._id = { $lt: cursor };
  }

  const products = await Product.find(query)
    .sort({ _id: -1 })
    .limit(Number(limit));

  return products;
};

module.exports = { createProductService,getProductService };