import axios from "axios";

const API =
"http://localhost:8080/regions";

export const getRegions = () =>
axios.get(API);

export const saveRegion = (region) =>
axios.post(API, region);

export const updateRegion = (
id,
region
) =>
axios.put(
`${API}/${id}`,
region
);

export const deleteRegion = (id) =>
axios.delete(
`${API}/${id}`
);
