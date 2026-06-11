import axios from "axios";

const API_URL = "http://localhost:8080/users";

export const getManagers = () =>
  axios.get(`${API_URL}/managers`);

export const getManagerById = (id) =>
  axios.get(`${API_URL}/${id}`);

export const createManager = (manager) =>
  axios.post(API_URL, manager);

export const updateManager = (id, manager) =>
  axios.put(`${API_URL}/${id}`, manager);

export const deleteManager = (id) =>
  axios.delete(`${API_URL}/${id}`);

export const getRegions = () =>
  axios.get("http://localhost:8080/regions");