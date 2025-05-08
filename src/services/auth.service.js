import axios from 'axios';
import jwt_decode from 'jwt-decode';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export async function signup(credentials){
    const res = await axios.post(`${API}/auth/signup`, credentials);
    const token = res.data.token;
    localStorage.setItem
    return token;
}

export async function login(credentials){
    const res = await axios.post(`${API}/auth/login`, credentials);
    const token = res.data.token;
    localStorage.setItem('token', token);
    return token;
}

export async function logout(){
    localStorage.removeItem('token');
}

export function getToken(){
    return localStorage.getItem('token');
}

export function getLoggedInUser() {
    const token = getToken();
    if (!token) return null;
  
    try {
      return jwt_decode(token); 
    } catch {
      return null;
    }
  }
  
  export function isLoggedIn() {
    return !!getLoggedInUser();
  }