import axios from "axios";

const API =
"http://localhost:8080/properties";

export const getProperties = () =>
axios.get(API);

export const saveProperty = (
property
) =>
axios.post(
API,
property
);

export const updateProperty = (
id,
property
) =>
axios.put(
`${API}/${id}`,
property
);

export const deleteProperty = (
id
) =>
axios.delete(
`${API}/${id}`
);
