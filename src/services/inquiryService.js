import axios from "axios";

const API_URL = "http://localhost:8080/api/inquiries";

export const saveInquiry = (data) => {
  return axios.post(API_URL, data);
};

export const getAllInquiries = () => {
  return axios.get(API_URL);
};