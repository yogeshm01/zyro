import { apiFetch } from "./config";

export const login = async (email, password) => {
  return apiFetch(`/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const signup = async (name, email, password) => {
  return apiFetch(`/auth/register`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
};
