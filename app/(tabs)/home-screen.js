// app/(tabs)/home-screen.js
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext'; // 引用 hook
import { router } from "expo-router";

export default function HomeScreen() {
  const { user, logout } = useAuth(); // 取得 user 和 logout 函式

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={{ marginBottom: 16 }}>
        Wentek HMI Borrow System
      </Text>
      {/* 顯示歡迎訊息 */}
      <Text variant="titleLarge" style={{ marginBottom: 16 }}>
        Welcome, {user ? user : 'Guest'}!
      </Text>

      <Button
        mode="contained"
        onPress={() => router.push('/ScanScreen')}
        icon="qrcode-scan" // 加上圖示
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
      >
        Scan QR Code
      </Button>

      {/* 登出按鈕 */}
      {/* <Button mode="outlined" onPress={logout} style={{ marginTop: 20 }}>
        Logout
      </Button> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});