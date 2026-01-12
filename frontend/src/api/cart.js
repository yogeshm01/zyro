const API_BASE_URL = "https://zyro-iuxz.onrender.com/api";

// ------------------ Auth Headers ----------------
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// ------------------ Get Cart ----------------
export const getCart = async () => {
  const res = await fetch(`${API_BASE_URL}/cart`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};

// ------------------ Checkout Cart ----------------
export const checkoutCart = async () => {
  const res = await fetch(`${API_BASE_URL}/cart/checkout`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  return res.json();
};

// ------------------ Add to Cart ----------------
export const addToCart = async (productId, quantity) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });
  return res.json();
};
