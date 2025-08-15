// app/_layout.js
import { Slot, SplashScreen, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider, useAuth } from '../context/AuthContext';

// 引入 GestureHandlerRootView
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

function MainLayout() {
  const { isLoggedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inTabsGroup = segments[0] === '(tabs)';

    // 如果登入狀態改變，進行重導向
    if (isLoggedIn && !inTabsGroup) {
      router.replace('/(tabs)/home-screen');
    } else if (!isLoggedIn && inTabsGroup) {
      router.replace('/(auth)');
    }

    // 驗證完畢後隱藏啟動畫面
    SplashScreen.hideAsync();

  }, [isLoggedIn]); // 當 isLoggedIn 改變時觸發

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider>
        <MainLayout />
      </PaperProvider>
    </AuthProvider>
  );
}