
import { API_BASE_URL } from "../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (username, password) => {
  const res = await fetch(`${API_BASE_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const result = await res.json();
  console.log("Login response:", result);

  if (result.code !== 0) {
    throw new Error(result.msg || "Login failed");
  }

  const token = result.data?.token;
  if (!token) {
    throw new Error("Token missing in response");
  }

  // ✅ 儲存 token 到 AsyncStorage
  await AsyncStorage.setItem("token", token);
};

export const logout = async () => {
  await AsyncStorage.removeItem("token");
};

export const checkLogin = async () => {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/user/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`
    },
    body: JSON.stringify({}), // 可根據需要傳遞的資料修改這裡
  });
  const result = await response.json();
  console.log("Check login response:", result);
  if (result.code !== 0) {
    throw new Error(result.msg || "無法檢查登入狀態");
  }
  // result.data為用戶名稱
  return result.data || "";
}