import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

import React from "react";
import Auth from "./Auth";
import Groups from "./Groups";

export type RootStackParamList = {
  Auth: undefined;
  Groups: undefined;
};

export type PropsAuth = NativeStackScreenProps<RootStackParamList, "Auth">;
export type PropsGroups = NativeStackScreenProps<RootStackParamList, "Groups">;

const Stack = createStackNavigator<RootStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Groups" component={Groups} />
    </Stack.Navigator>
  );
}
