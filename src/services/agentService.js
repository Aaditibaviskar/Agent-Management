import axios from "axios";

const API = "http://localhost:8080/users";

export const getAgents = () =>
  axios.get(`${API}/agents`);

export const getAgentById = (id) =>
  axios.get(`${API}/${id}`);

export const saveAgent = (agent) =>
  axios.post(API, agent);

export const updateAgent = (id, agent) =>
  axios.put(`${API}/${id}`, agent);

export const deleteAgent = (id) =>
  axios.delete(`${API}/${id}`);

export const getRegions = () =>
  axios.get("http://localhost:8080/regions");