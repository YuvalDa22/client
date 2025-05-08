import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export async function signup(credentials) {
  const res = await axios.post(`${API}/auth/signup`, credentials);
  const token = res.data.token;

  if (!token) throw new Error("No token received");

  localStorage.setItem("token", token);
  const user = jwtDecode(token);
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

export async function login(credentials) {
  const res = await axios.post(`${API}/auth/login`, credentials);
  const token = res.data.token;

  localStorage.setItem("token", token);
  const user = jwtDecode(token);
  localStorage.setItem("user", JSON.stringify(user)); 
  return user;
}

export async function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user"); 
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getLoggedInUser() {
  const userJson = localStorage.getItem("user");
  return userJson ? JSON.parse(userJson) : null;
}

export function isLoggedIn() {
  return !!getLoggedInUser();
}
