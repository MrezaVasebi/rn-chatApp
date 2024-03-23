import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

import { AppText } from "@/components/texts";
import React from "react";
import Auth from "./Auth";
import Groups from "./Groups";
import UserProfile from "./UserProfile";

export type RootStackParamList = {
  Auth: undefined;
  Groups: undefined;
  UserProfile: undefined;
};

export type PropsAuth = NativeStackScreenProps<RootStackParamList, "Auth">;

export type PropsGroups = NativeStackScreenProps<RootStackParamList, "Groups">;

export type PropsUserProfile = NativeStackScreenProps<
  RootStackParamList,
  "UserProfile"
>;

const Stack = createStackNavigator<RootStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Groups" component={Groups} />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={({ navigation, route }) => ({
          headerShown: true,
          headerTitle: () => {
            return <AppText lbl={"User Profile"} />;
          },
        })}
      />
    </Stack.Navigator>
  );
}
