import axios from "axios";

const API =
"http://localhost:8080/users";

export const getManagers =
() =>
axios.get(
`${API}/managers`
);

export const getAgents =
() =>
axios.get(
`${API}/agents`
);

export const getUsers =
() =>
axios.get(API);

export const saveUser =
(user) =>
axios.post(
API,
user
);

export const updateUser =
(id, user) =>
axios.put(
`${API}/${id}`,
user
);

export const deleteUser =
(id) =>
axios.delete(
`${API}/${id}`
);
