const pool = require("../config/db");

// -------------- Get all products --------------

const getAllProducts = async () => {
  const query = `
    SELECT id, name, description, price, model_url, thumbnail_url, stock
    FROM products
    ORDER BY created_at DESC
  `;
  const { rows } = await pool.query(query);
  return rows;
};

module.exports = {
  getAllProducts,
};

// -------------- Get product by ID --------------

const getProductById = async (id) => {
  const query = `
    SELECT id, name, description, price, model_url, thumbnail_url, stock
    FROM products
    WHERE id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  getAllProducts,
  getProductById,
};
