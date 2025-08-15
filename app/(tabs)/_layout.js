import { Tabs } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

// 1. 引入 useAuth Hook
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../theme/theme'; // 假設您的主題色在這裡

// 2. 建立右上角的自訂元件
function HeaderRight() {
  const { user, logout } = useAuth();

  // 如果還在載入使用者資訊，可以顯示一個讀取中的圖示
  if (!user) {
    return <ActivityIndicator color={theme.colors.primary} style={{ marginRight: 15 }} />;
  }

  return (
    <View style={styles.headerRightContainer}>
      <Text style={styles.usernameText}>{user}</Text>
      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={26} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );
}


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarLabelStyle: { fontSize: 12 },
        // 3. 將自訂元件應用到所有 Tab 畫面的 headerRight
        headerRight: () => <HeaderRight />,
      }}
    >
      <Tabs.Screen
        name="home-screen"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="hmi-list"
        options={{
          title: 'HMI List',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" color={color} size={size} />
          ),
        }}
      />
      {/* ... 您其他的 Tabs.Screen ... */}
      <Tabs.Screen
        name="borrowed-hmi-list"
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, textAlign: 'center' }}>
              {'Borrowed\nHMI'}
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkmark-done-outline" color={color} size={size} />
          ),
          title: 'Borrowed HMI List',
        }}
      />
      <Tabs.Screen
        name="plc-list"
        options={{
          title: 'PLC List',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ellipsis-horizontal" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="borrowed-plc-list"
        options={{
          title: 'Borrowed PLC List',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

// 4. 為自訂元件新增樣式
const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  usernameText: {
    marginRight: 12,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    padding: 4,
  },
});
