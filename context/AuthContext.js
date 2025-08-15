// context/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import { checkLogin, login, logout } from '../helpers/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 新增：用來控制初始載入狀態

  useEffect(() => {
    // 這個 effect 只在 App 啟動時檢查一次
    checkLogin()
      .then(userData => {
        setUser(userData);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setUser(null);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsLoading(false); // 無論成功或失敗，都表示初始檢查已完成
      });
  }, []);

  const authContextValue = {
    // 這是修正的核心部分
    login: async (username, password) => {
      // 步驟 1: 呼叫原本的 login helper，它會處理 API 請求並儲存 token
      await login(username, password);

      // 步驟 2: 登入成功後，立刻呼叫 checkLogin 來取得完整的使用者資料
      const userData = await checkLogin(); // <--- 這是關鍵的新增步驟
      console.log("User data after login:", userData); // 可以用來檢查取得的資料

      // 步驟 3: 使用從 checkLogin 取得的資料來更新狀態
      setUser(userData);
      setIsLoggedIn(true);

      return userData; // 將使用者資料回傳給呼叫方（例如 LoginScreen）
    },
    logout: async () => {
      await logout(); // 呼叫後端或清除 token
      setUser(null);
      setIsLoggedIn(false);
    },
    user,
    isLoggedIn,
    isLoading, // 將 isLoading 也提供出去，根佈局可以用它來控制啟動畫面
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
