import axios from "axios";
import { backendConfig } from "../constants/content/MainContent";

const userApi = backendConfig.base;
// const token = localStorage.getItem("token");

export async function getPendingPromoters(payload) {
  const response = await axios.get(`${userApi}/promoter-requests`, payload);
  return response?.data?.pendingPromoters;
}
export async function approvePromoter(id) {
  const response = await axios.patch(`${userApi}/promoter/${id}/accept`);
  return response;
}
export async function rejectPromoter(id) {
  const response = await axios.patch(`${userApi}/promoter/${id}/reject`);
  return response;
}

export async function getTodayTransactions() {
  const response = await axios.get(`${userApi}/admin/transactions/today`);
  return response?.data;
}