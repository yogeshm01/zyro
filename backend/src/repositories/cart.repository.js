const pool = require("../config/db");

// Get active cart (order) for user
const getActiveCart = async (userId) => {
  const query = `
    SELECT * FROM orders
    WHERE user_id = $1 AND status = 'CREATED'
    LIMIT 1
  `;
  const { rows } = await pool.query(query, [userId]);
  return rows[0];
};

// Create new cart
const createCart = async (userId) => {
  const query = `
    INSERT INTO orders (user_id, status, total_amount)
    VALUES ($1, 'CREATED', 0)
    RETURNING *
  `;
  const { rows } = await pool.query(query, [userId]);
  return rows[0];
};

// Add item to cart
const addItemToCart = async (orderId, productId, quantity, price) => {
  const query = `
    INSERT INTO order_items (order_id, product_id, quantity, price)
    VALUES ($1, $2, $3, $4)
  `;
  await pool.query(query, [orderId, productId, quantity, price]);
};

// Get cart items
const getCartItems = async (orderId) => {
  const query = `
    SELECT
      oi.id,
      p.name,
      p.price,
      oi.quantity
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = $1
  `;
  const { rows } = await pool.query(query, [orderId]);
  return rows;
};

const calculateTotal = async (orderId) => {
  const query = `
    SELECT SUM(quantity * price) AS total
    FROM order_items
    WHERE order_id = $1
  `;
  const { rows } = await pool.query(query, [orderId]);
  return rows[0].total || 0;
};

const checkoutCart = async (orderId, totalAmount) => {
  const query = `
    UPDATE orders
    SET status = 'PLACED', total_amount = $1
    WHERE id = $2
    RETURNING *
  `;
  const { rows } = await pool.query(query, [totalAmount, orderId]);
  return rows[0];
};


module.exports = {
  getActiveCart,
  createCart,
  addItemToCart,
  getCartItems,
  calculateTotal,
  checkoutCart,
};

