import { API_BASE_URL } from "../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 取得所有 HMI 裝置列表（使用 POST 方法）
export const fetchHmiList = async () => {
  const token = await AsyncStorage.getItem("token");
  console.log("Token:", token);

  const response = await fetch(`${API_BASE_URL}/api/device/hmi/list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`
    },
    body: JSON.stringify({}), // 可根據需要傳遞的資料修改這裡
  });

  const result = await response.json();
  console.log("HMI list response:", result);

  if (result.code !== 0) {
    throw new Error(result.msg || "無法取得 HMI 列表");
  }

  return result.data || [];
};

// 取得所有 PLC 裝置列表（使用 POST 方法）
export const fetchPlcList = async () => {
  const token = await AsyncStorage.getItem("token");
  console.log("Token:", token);

  const response = await fetch(`${API_BASE_URL}/api/device/plc/list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`
    },
    body: JSON.stringify({}), // 可根據需要傳遞的資料修改這裡
  });

  const result = await response.json();
  console.log("PLC list response:", result);

  if (result.code !== 0) {
    throw new Error(result.msg || "無法取得 PLC 列表");
  }

  return result.data || [];
};

// 取得裝置詳細資訊（使用 POST 方法）
export const fetchDeviceDetail = async (serialNumber) => {
  const token = await AsyncStorage.getItem("token");
  console.log("Token:", token);

  const response = await fetch(`${API_BASE_URL}/api/device/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`
    },
    body: JSON.stringify({ serialNumber }), // 傳遞序列號以查詢裝置
  });

  const result = await response.json();
  console.log("Device detail response:", result);

  if (result.code !== 0) {
    throw new Error(result.msg || "無法取得裝置詳細資訊");
  }

  return result.data || {};
}


// 借出HMI設備
export const borrowHmiDevice = async (device) => {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/api/device/hmi/borrow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(device),
  });

  const result = await response.json();
  console.log("Borrow response:", result);

  if (result.code !== 0) {
    throw new Error(result.msg || "借出失敗");
  }

  return result;
};

// 歸還HMI設備
export const returnHmiDevice = async (device) => {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/api/device/hmi/return`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(device),
  });

  const result = await response.json();
  console.log("Return response:", result);

  if (result.code !== 0) {
    throw new Error(result.msg || "歸還失敗");
  }

  return result;
};


// 借出PLC設備
export const borrowPlcDevice = async (device) => {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/api/device/plc/borrow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(device),
  });

  const result = await response.json();
  console.log("Borrow response:", result);

  if (result.code !== 0) {
    throw new Error(result.msg || "借出失敗");
  }

  return result;
};

// 歸還PLC設備
export const returnPlcDevice = async (device) => {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/api/device/plc/return`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(device),
  });

  const result = await response.json();
  console.log("Return response:", result);

  if (result.code !== 0) {
    throw new Error(result.msg || "歸還失敗");
  }

  return result;
};



// 查詢已借出的HMI 裝置列表
export const fetchBorrowedHmiList = async () => {
  const token = await AsyncStorage.getItem("token");
  console.log("Token:", token);

  const response = await fetch(`${API_BASE_URL}/api/device/hmi/borrowedlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`
    },
    body: JSON.stringify({}), // 可根據需要傳遞的資料修改這裡
  });

  const result = await response.json();
  console.log("Borrowed HMI list response:", result);

  if (result.code !== 0) {
    throw new Error(result.msg || "無法取得已借出的 HMI 列表");
  }

  return result.data || [];
}

// 查詢已借出的PLC 裝置列表
export const fetchBorrowedPlcList = async () => {
  const token = await AsyncStorage.getItem("token");
  console.log("Token:", token);

  const response = await fetch(`${API_BASE_URL}/api/device/plc/borrowedlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`
    },
    body: JSON.stringify({}), // 可根據需要傳遞的資料修改這裡
  });

  const result = await response.json();
  console.log("Borrowed PLC list response:", result);

  if (result.code !== 0) {
    throw new Error(result.msg || "無法取得已借出的 PLC 列表");
  }

  return result.data || [];
}