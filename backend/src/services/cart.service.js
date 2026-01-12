const cartRepo = require("../repositories/cart.repository");
const productRepo = require("../repositories/product.repository");

// ------------------ Add to Cart ----------------
const addToCart = async (userId, productId, quantity) => {
  let cart = await cartRepo.getActiveCart(userId);
  if (!cart) {
    cart = await cartRepo.createCart(userId);
  }
  const product = await productRepo.getProductById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  await cartRepo.addItemToCart(
    cart.id,
    productId,
    quantity,
    product.price
  );
  return { message: "Item added to cart" };
};

// ------------------ Get Cart ----------------
const getCart = async (userId) => {
  const cart = await cartRepo.getActiveCart(userId);
  if (!cart) {
    return { items: [] };
  }
  const items = await cartRepo.getCartItems(cart.id);
  return { items };
};

// ------------------ Checkout ----------------
const checkout = async (userId) => {
  const cart = await cartRepo.getActiveCart(userId);
  if (!cart) {
    throw new Error("No active cart found");
  }
  const total = await cartRepo.calculateTotal(cart.id);
  if (total === 0) {
    throw new Error("Cart is empty");
  }
  const order = await cartRepo.checkoutCart(cart.id, total);
  return {
    orderId: order.id,
    totalAmount: order.total_amount,
    status: order.status,
  };
};


module.exports = {
  addToCart,
  getCart,
  checkout,
};
