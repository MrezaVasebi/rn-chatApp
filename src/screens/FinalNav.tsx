import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import RootStack from "./RootStack";

export default function FinalNav() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
