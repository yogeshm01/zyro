const productService = require("../services/product.service");

// -------------- Get all products --------------
const getProducts = async (req, res) => {
  try {
    const products = await productService.fetchAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

module.exports = {
  getProducts,
};


// -------------- Get product by ID --------------
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await productService.fetchProductById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

module.exports = {
  getProducts,
  getProductById,
};
