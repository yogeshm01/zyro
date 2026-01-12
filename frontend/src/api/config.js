const API_BASE_URL = "https://zyro-iuxz.onrender.com/api";
export const MEDIA_BASE_URL = "https://zyro-iuxz.onrender.com";

export const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API Error");
  }
  return response.json();
};