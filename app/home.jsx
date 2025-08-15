import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { router } from "expo-router";

export default function HomeScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Welcome 💫</Header>
      <Paragraph>Congratulations you are logged in.</Paragraph>
      <Button mode="outlined" onPress={() => router.push("/")}>
        Sign out
      </Button>
    </Background>
  );
}
