import React, { useState } from "react";
// 移除了 Stack，因為我們將手動建立 Header
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Portal,
  Dialog,
  Button as PaperButton,
  Snackbar,
  Card,
  Title,
  Paragraph,
  Text,
  Divider,
  IconButton, // 引入 IconButton 用於返回按鈕
} from "react-native-paper";

import { borrowHmiDevice, returnHmiDevice } from "../helpers/device";
import { theme } from "../theme/theme";

// 格式化日期時間的輔助函式
const formatDateTime = (isoString) => {
  if (!isoString) return "N/A";
  try {
    const date = new Date(isoString);
    return date.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    return "Invalid Date";
  }
};

// 1. 手動建立的 Header 元件
const ManualHeader = ({ title, onBackPress }) => (
  <View style={styles.headerContainer}>
    <IconButton
      icon="arrow-left"
      size={24}
      onPress={onBackPress}
      style={styles.backButton}
    />
    <Text style={styles.headerTitle}>{title}</Text>
    <View style={{ width: 40 }} />{/* 佔位符，讓標題置中 */}
  </View>
);


export default function HmiDetailScreen() {
  const { device } = useLocalSearchParams();
  const deviceData = JSON.parse(device);
  const { serialNumber, modelName, status, createdTime, borrower } = deviceData;
  const router = useRouter();

  const [dialogVisible, setDialogVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ visible: false, message: "", isError: false });

  const handleToggleBorrow = () => setDialogVisible(true);
  const cancelToggle = () => setDialogVisible(false);

  const confirmToggle = async () => {
    setDialogVisible(false);
    setLoading(true);

    try {
      const apiCall = status === 0 ? borrowHmiDevice : returnHmiDevice;
      await apiCall(deviceData);

      const message = status === 0 ? "HMI 已成功借出" : "HMI 已成功歸還";
      setSnackbar({ visible: true, message, isError: false });

      // 修改導航行為：成功後跳轉到已借出列表
      setTimeout(() => router.replace('/(tabs)/borrowed-hmi-list'), 2000);

    } catch (error) {
      console.error("API 錯誤:", error);
      const message = error.message || "操作失敗，請稍後再試";
      setSnackbar({ visible: true, message, isError: true });
    } finally {
      setLoading(false);
    }
  };

  const onDismissSnackbar = () => setSnackbar({ ...snackbar, visible: false });

  return (
    <SafeAreaView style={styles.container}>
      {/* 2. 修改 onBackPress 的行為 */}
      <ManualHeader title="設備詳情" onBackPress={() => router.replace('/(tabs)/home-screen')} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>{modelName}</Title>
            <Paragraph style={styles.serialNumber}>SN: {serialNumber}</Paragraph>
            <Divider style={styles.divider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>狀態</Text>
              <Text style={[styles.status, status === 0 ? styles.statusIdle : styles.statusInUse]}>
                {status === 0 ? "在庫 (Idle)" : "使用中 (In Use)"}
              </Text>
            </View>

            {status !== 0 && borrower && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>借用人</Text>
                <Text style={styles.detailValue}>{borrower.name}</Text>
              </View>
            )}

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>建立時間</Text>
              <Text style={styles.detailValue}>{formatDateTime(createdTime)}</Text>
            </View>

          </Card.Content>
          <Card.Actions>
            <PaperButton
              mode="contained"
              onPress={handleToggleBorrow}
              loading={loading}
              disabled={loading}
              icon={status === 0 ? "arrow-up-circle" : "arrow-down-circle"}
              color={status === 0 ? theme.colors.primary : theme.colors.error}
              style={styles.actionButton}
              labelStyle={styles.buttonLabel}
            >
              {status === 0 ? "借出設備" : "歸還設備"}
            </PaperButton>
          </Card.Actions>
        </Card>
      </ScrollView>

      {/* Dialog */}
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={cancelToggle}>
          <Dialog.Title>{status === 0 ? "確認借出" : "確認歸還"}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              您確定要{status === 0 ? "借出" : "歸還"}這台 HMI 嗎？
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={cancelToggle}>取消</PaperButton>
            <PaperButton onPress={confirmToggle} loading={loading}>確定</PaperButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Snackbar */}
      <Snackbar
        visible={snackbar.visible}
        onDismiss={onDismissSnackbar}
        duration={3000}
        style={{ backgroundColor: snackbar.isError ? theme.colors.error : '#323232' }}
      >
        {snackbar.message}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  // 3. 新增 Header 相關樣式
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 60,
    backgroundColor: '#f0f2f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    margin: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    borderRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  serialNumber: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  divider: {
    marginVertical: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#555',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    overflow: 'hidden',
  },
  statusIdle: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  statusInUse: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  actionButton: {
    flex: 1,
    margin: 8,
  },
  buttonLabel: {
    fontSize: 16,
    paddingVertical: 4,
  }
});
