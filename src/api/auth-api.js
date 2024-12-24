import axios from "axios";
import { backendConfig } from "../constants/content/MainContent";

const loginApiBaseAUrl = backendConfig.base;
const token = localStorage.getItem("token");

export async function loginWithEmailApi(payload) {
  const response = await axios.post(`${loginApiBaseAUrl}/login`, payload);
  return response?.data;
}
export async function registerWithEmailApi(payload, ref) {
  const response = await axios.post(
    `${loginApiBaseAUrl}/register?referral=${ref}`,
    payload
  );
  return response?.data;
}
export async function getUserInfo() {
  const response = await axios.get(`${loginApiBaseAUrl}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data?.user;
}
