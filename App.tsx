import { FinalNav } from "@/screens";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    myFont: require("./assets/fonts/Medium.ttf"),
  });

  if (!loaded) return null;

  return <FinalNav />;
}
