
import axios from "axios";

<<<<<<< HEAD
const API_URL = "http://localhost:8080/users";

export const getManagers = () =>
  axios.get(`${API_URL}/managers`);
=======
const API =
"http://localhost:8080/users";
const REGION_API =
"http://localhost:8080/regions";

export const getManagers = () =>
axios.get(`${API}/managers`);

export const getRegions = () =>
axios.get(REGION_API);
>>>>>>> 8897e1870ba13f82afe4661dabb07e0754fc0ca5

export const getManagerById = (id) =>
  axios.get(`${API_URL}/${id}`);

export const createManager = (manager) =>
  axios.post(API_URL, manager);

export const updateManager = (id, manager) =>
  axios.put(`${API_URL}/${id}`, manager);

export const deleteManager = (id) =>
<<<<<<< HEAD
  axios.delete(`${API_URL}/${id}`);

export const getRegions = () =>
  axios.get("http://localhost:8080/regions");
=======
axios.delete(
`${API}/${id}`
);
>>>>>>> 8897e1870ba13f82afe4661dabb07e0754fc0ca5
