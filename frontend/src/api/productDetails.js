import { apiFetch } from "./config";

export const getProductById = (id) => {
  return apiFetch(`/products/${id}`);
};
