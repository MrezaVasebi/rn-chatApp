import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Auth from "./Auth";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Auth" component={Auth} />
    </Stack.Navigator>
  );
}
