import axios from "axios";

const API_URL = "http://localhost:8080/api/leads";

export const getAllLeads = () => {
  return axios.get(API_URL);
};

export const assignLead = (
  leadId,
  agentId,
  managerId
) => {
  return axios.put(
    `${API_URL}/${leadId}/assign`,
    null,
    {
      params: {
        agentId,
        managerId
      }
    }
  );
};