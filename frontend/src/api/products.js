import { apiFetch } from "./config";

export const getAllProducts = () => {
  return apiFetch("/products");
};
