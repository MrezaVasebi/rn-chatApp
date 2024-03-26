import { FinalNav } from "@/screens";
import { UserProvider } from "context-api";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    myFont: require("./assets/fonts/Medium.ttf"),
  });

  if (!loaded) return null;

  return (
    <UserProvider>
      <FinalNav />
    </UserProvider>
  );
}
