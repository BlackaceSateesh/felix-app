import axios from "axios";
import { backendConfig } from "../constants/content/MainContent";

const userApi = backendConfig.base;
const token = localStorage.getItem("token");

export async function requestPromoter(payload) {
  const response = await axios.post(`${userApi}/promoter-request`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data;
}
