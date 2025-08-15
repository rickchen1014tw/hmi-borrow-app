# HMI/PLC 借還管理 App (HMI Borrow App)

這是一個專為 Weintek 公司內部設計的行動應用程式，旨在簡化 HMI (人機介面) 和 PLC (可編程邏輯控制器) 的借用與歸還流程。
員工可以透過手機 App 快速掃描 QR Code 完成借還操作。

---

## 專案預覽 (App Preview)

建議在此處放上 App 的實際操作截圖或 GIF，可以讓使用者更直觀地了解 App 的樣貌。

| 登入頁面 | 登入後首頁 | HMI列表 | 設備詳情 |
| :------: | :----: | :----: |:----: |
| <img width="316" height="645" alt="image" src="https://github.com/user-attachments/assets/64d9dd5e-e9a9-41c8-8636-c9bd732fe5d0" />|<img width="311" height="643" alt="image" src="https://github.com/user-attachments/assets/51b6fdcf-c92c-429b-9226-a3758709970d" />|<img width="322" height="645" alt="image" src="https://github.com/user-attachments/assets/3e6fc61b-d080-4b72-a662-08d4503e0e43" />|<img width="313" height="641" alt="image" src="https://github.com/user-attachments/assets/dda268ff-3921-46a3-b396-4f0a1fb10ad1" />


---

## ✨ 主要功能 (Features)

* **QR Code 掃描**：整合相機功能，快速掃描 HMI/PLC 上的 QR Code 進行操作。
* **借用與歸還**：簡潔的介面，讓使用者可以輕鬆完成借用或歸還。
* **歷史紀錄**：查詢個人的借還歷史，方便追蹤。
* **使用者驗證**：確保只有公司員工可以進行操作。

---

## 🛠️ 技術棧 (Tech Stack)

* **Frontend:** React Native, Expo (SDK 49)
* **QR Code Scanner:** `expo-camera`
* **HTTP Client:** Axios
* **Linting:** ESLint

---

## 📋 環境需求 (Prerequisites)

在開始之前，請確保你的開發環境中已安裝以下軟體：

* [Node.js](https://nodejs.org/) (建議版本 v18.x 或以上)
* [NPM](https://www.npmjs.com/) (或 Yarn)
* 手機上安裝 [Expo Go App](https://expo.dev/client) (iOS/Android)

---

## 🚀 安裝與啟動 (Installation & Getting Started)

#### **重要：此專案為前端 App，必須先啟動後端服務！**

請先前往後端專案 [`hmi-plc-borrow-return-backend`](https://github.com/rickchen1014tw/hmi-plc-borrow-return-backend)，
並依照其 `README.md` 的指示完成設定並啟動後端伺服器。

在後端服務正常運作後，再依照以下步驟啟動本專案 (前端 App)：

1.  **複製專案到本地**
    ```bash
    git clone [https://github.com/rickchen1014tw/hmi-borrow-app.git](https://github.com/rickchen1014tw/hmi-borrow-app.git)
    cd hmi-borrow-app
    ```

2.  **安裝依賴套件**
    ```bash
    npm install
    ```

3.  **設定環境變數**
    * 在專案的根目錄下，config/config.js 設定環境變數
    
    **`config.js` 檔案內容：**
    ```javascript
    export const API_BASE_URL = "http://192.168.2.26";
    ```

4.  **啟動專案**
    ```bash
    npx expo start
    ```
    啟動後，終端機會顯示一個 QR code。使用你手機上的 Expo Go App 掃描此 QR code，即可在手機上預覽並操作 App。

---

## 📜 可用的腳本 (Available Scripts)

在專案目錄中，你可以執行以下幾個常用指令：

* `npm start`: 啟動 Metro Bundler，等同於 `npx expo start`。
* `npm run android`: 在連接的 Android 裝置或模擬器上執行 App。
* `npm run ios`: 在 iOS 模擬器上執行 App (僅限 macOS)。
* `npm run web`: 在網頁瀏覽器中執行 App。

---

## 📄 授權條款 (License)

本專案採用 [MIT License](https://opensource.org/licenses/MIT) 授權。
