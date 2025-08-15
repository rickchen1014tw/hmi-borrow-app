import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native-paper";

import { fetchDeviceDetail } from "../helpers/device";
import { theme } from "../theme/theme";

// 載入中的覆蓋層元件
const LoadingOverlay = () => (
  <View style={styles.overlayContainer}>
    <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />
    <Text style={styles.overlayText}>正在獲取設備資訊...</Text>
  </View>
);

export default function ScanScreen() {
  const router = useRouter();
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scanError, setScanError] = useState(null);

  // --- 功能相關狀態 ---
  const [zoom, setZoom] = useState(0);
  const [torch, setTorch] = useState(false);

  // 處理權限狀態
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>我們需要您的授權才能使用相機</Text>
        <Button title="授權" onPress={requestPermission} color={theme.colors.primary} />
      </View>
    );
  }

  // 處理掃描邏輯
  const handleScan = async ({ data }) => {
    if (scanned) return;

    setScanned(true);
    setIsLoading(true);
    setScanError(null);

    try {
      const serialNumber = data.split("/").pop();
      if (!serialNumber) {
        throw new Error("無效的 QR Code 格式");
      }
      const res = await fetchDeviceDetail(serialNumber);
      const deviceInfo = { ...res, ...(res.data || {}) };
      delete deviceInfo.data;

      router.push({
        pathname: "/hmi-detail",
        params: { device: JSON.stringify(deviceInfo) },
      });

    } catch (e) {
      console.error(e);
      setScanError(e.message || "無法獲取設備資訊，請確認 QR Code 是否正確。");
      setTimeout(() => {
        setScanned(false);
        setScanError(null);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // 縮放功能
  const changeZoom = (direction) => {
    const step = 0.1;
    if (direction === 'in') {
      setZoom(prev => Math.min(prev + step, 1));
    } else {
      setZoom(prev => Math.max(prev - step, 0));
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{ barcodeTypes: ["qr", "code128"] }}
        onBarcodeScanned={scanned ? undefined : handleScan}
        zoom={zoom}
        enableTorch={torch}
      >
        <SafeAreaView style={styles.cameraOverlay}>
          {/* 頂部按鈕 */}
          <View style={styles.topBar}>
            <IconButton icon="arrow-left" size={28} iconColor="white" onPress={() => router.back()} style={styles.iconButtonBackground} />
            <View style={{ flexDirection: 'row' }}>
              <IconButton icon={torch ? "flash" : "flash-off"} size={28} iconColor="white" onPress={() => setTorch(prev => !prev)} style={styles.iconButtonBackground} />
              <IconButton icon="camera-flip" size={28} iconColor="white" onPress={() => setFacing(p => (p === "back" ? "front" : "back"))} style={styles.iconButtonBackground} />
            </View>
          </View>

          {/* 掃描框 */}
          <View style={styles.scanAreaContainer}>
            <View style={[styles.scanArea, scanError && { borderColor: theme.colors.error }]} />
            {scanError && <Text style={styles.errorText}>{scanError}</Text>}
          </View>

          {/* 縮放控制 */}
          <View style={styles.zoomContainer}>
            <IconButton icon="minus" size={28} iconColor="white" onPress={() => changeZoom('out')} style={styles.iconButtonBackground} />
            <Text style={styles.zoomText}>{Math.round(zoom * 100)}%</Text>
            <IconButton icon="plus" size={28} iconColor="white" onPress={() => changeZoom('in')} style={styles.iconButtonBackground} />
          </View>
        </SafeAreaView>
      </CameraView>

      {isLoading && <LoadingOverlay />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  permissionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  permissionText: { textAlign: 'center', fontSize: 18, marginBottom: 20 },
  camera: { flex: 1 },
  cameraOverlay: { flex: 1, backgroundColor: 'transparent', justifyContent: 'space-between' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  iconButtonBackground: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginHorizontal: 5,
  },
  scanAreaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 12,
  },
  errorText: {
    position: 'absolute',
    bottom: -50,
    color: 'white',
    backgroundColor: theme.colors.error,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    textAlign: 'center',
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
  zoomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  zoomText: {
    color: 'white',
    fontSize: 16,
    width: 60,
    textAlign: 'center',
  },
});
