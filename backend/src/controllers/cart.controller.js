const cartService = require("../services/cart.service");

const addItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product and quantity required" });
    }

    const result = await cartService.addToCart(
      req.userId,
      productId,
      quantity
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const result = await cartService.getCart(req.userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

const checkout = async (req, res) => {
  try {
    const result = await cartService.checkout(req.userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {
  addItem,
  getCart,
  checkout,
};
