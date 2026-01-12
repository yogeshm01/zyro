const productRepository = require("../repositories/product.repository");

// -------------- Get all products --------------
const fetchAllProducts = async () => {
  return await productRepository.getAllProducts();
};

module.exports = {
  fetchAllProducts,
};

// -------------- Get product by ID --------------
const fetchProductById = async (id) => {
  return await productRepository.getProductById(id);
};

module.exports = {
  fetchAllProducts,
  fetchProductById,
};
