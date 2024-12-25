import axios from "axios";
import { backendConfig } from "../constants/content/MainContent";

const userApi = backendConfig.base;
const token = localStorage.getItem("token");

export async function loginWithWallet(payload) {
  const response = await axios.post(
    `${userApi}/metamask/authenticate`,
    payload
  );
  return response;
}
export async function buyPlanPackage(payload) {
  const response = await axios.post(`${userApi}/add-package`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data;
}
export async function checkWithdrawEligibility(payload) {
  const response = await axios.post(`${userApi}/withdrawal-amount`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data;
}
export async function setWithdrawalTransaction(payload) {
  const response = await axios.post(`${userApi}/withdrawal-handle`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data;
}
