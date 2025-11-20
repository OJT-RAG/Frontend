// src/api/httpClient.js
import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:5220/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Nếu backend yêu cầu token thì thêm interceptor
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default httpClient;
