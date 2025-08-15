import { API_BASE_URL } from "../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const authFetch = async (url, options = {}) => {
  const token = await AsyncStorage.getItem("token");

  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });
};