import axios from "axios";

const API =
"http://localhost:8080/managers";

export const getManagers = () =>
axios.get(API);

export const getManagerById = (id) =>
axios.get(`${API}/${id}`);

export const saveManager = (manager) =>
axios.post(API, manager);

export const updateManager = (
id,
manager
) =>
axios.put(
`${API}/${id}`,
manager
);

export const deleteManager = (id) =>
axios.delete(
`${API}/${id}`
);
