import axios from "axios";

const API =
"http://localhost:8080/agents";

export const getAgents = () =>
axios.get(API);

export const saveAgent = (agent) =>
axios.post(API, agent);

export const updateAgent = (
id,
agent
) =>
axios.put(
`${API}/${id}`,
agent
);

export const deleteAgent = (id) =>
axios.delete(
`${API}/${id}`
);
