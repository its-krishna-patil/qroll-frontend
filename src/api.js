import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // optional: only if backend uses cookies
});

export default API;
