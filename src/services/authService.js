import axios from "axios";

const API = "http://localhost:8080/auth";
const USER_KEY = "crmUser";

axios.interceptors.request.use((config) => {
  const user = getCurrentUser();

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

export const login = async (email, password) => {
  const response = await axios.post(`${API}/login`, { email, password });
  localStorage.setItem(USER_KEY, JSON.stringify(response.data));
  return response.data;
};

export const logout = () => {
  localStorage.removeItem(USER_KEY);
};

export const getCurrentUser = () => {
  const value = localStorage.getItem(USER_KEY);
  return value ? JSON.parse(value) : null;
};

export const hasRole = (roles) => {
  const user = getCurrentUser();
  return Boolean(user && roles.includes(user.role));
};
