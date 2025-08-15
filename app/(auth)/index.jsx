import { useState } from "react";
import { router } from "expo-router";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

// 1. 引入 useAuth Hook
import { useAuth } from "../../context/AuthContext";

import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { theme } from "../../theme/theme";

export default function LoginScreen({}) {
  // 呼叫 useAuth 取得 login 方法
  const { login } = useAuth();

  const [username, setUsername] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const onLoginPressed = async () => {
    if (loading) return;
    setLoading(true);
    setGeneralError(""); // 清除舊的錯誤

    try {
      // 使用從 Context 拿到的 login 函式
      await login(username.value, password.value);
      // 登入成功後不需要手動跳轉頁面！
      // RootLayout 會自動偵測到 isLoggedIn 變為 true 並導向 (tabs)
      // router.replace("/(tabs)/home-screen"); // <--- 這行可以刪除了
    } catch (error) {
      console.error("Login failed", error);
      setGeneralError("Invalid username or password");
    }
  };

  return (
    <Background>
      <Logo />
      <Header>HMI Borrow System</Header>
      <TextInput
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: "" })}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      {generalError ? (
        <Text style={styles.errorText}>{generalError}</Text>
      ) : null}

      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => router.push("/ResetPasswordScreen")}>
          <Text style={styles.forgot}>Forgot your password ?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Log in
      </Button>
      <View style={styles.row}>
        <Text>You do not have an account yet ?</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => router.push("/RegisterScreen")}>
          <Text style={styles.link}>Create !</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
