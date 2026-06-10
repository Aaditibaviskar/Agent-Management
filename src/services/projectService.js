import axios from "axios";

const API =
"http://localhost:8080/projects";

export const getProjects = () =>
axios.get(API);

export const saveProject = (
project
) =>
axios.post(
API,
project
);

export const updateProject = (
id,
project
) =>
axios.put(
`${API}/${id}`,
project
);

export const deleteProject = (
id
) =>
axios.delete(
`${API}/${id}`
);
