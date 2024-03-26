import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

import { AppText } from "@/components/texts";
import auth from "@react-native-firebase/auth";
import { UserContext } from "context-api";
import React, { useContext, useEffect, useState } from "react";
import ChatScreen from "./ChatScreen";
import LoadingModal from "./LoadingModal";
import Login from "./Login";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile";
import Users from "./Users";

export type RootStackParamList = {
  Login: undefined;
  Users: undefined;
  SignUp: undefined;
  UserProfile: undefined;
  ChatScreen: {
    selectedName: string;
    selectedUid: string;
  };
};

export type PropsLogin = NativeStackScreenProps<RootStackParamList, "Login">;

export type PropsSignUp = NativeStackScreenProps<RootStackParamList, "SignUp">;

export type PropsUsers = NativeStackScreenProps<RootStackParamList, "Users">;

export type PropsChatScree = NativeStackScreenProps<
  RootStackParamList,
  "ChatScreen"
>;

export type PropsUserProfile = NativeStackScreenProps<
  RootStackParamList,
  "UserProfile"
>;

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  const { user, handleSetUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribeAuth = auth().onAuthStateChanged(
      async (authenticatedUser) => {
        authenticatedUser
          ? handleSetUser(authenticatedUser)
          : handleSetUser(null);
        setIsLoading(false);
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);

  if (isLoading) return <LoadingModal />;

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      {!user ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerShown: false,
              // headerTitle: () => {
              //   return <AppText lbl="Signup" />;
              // },
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Users" component={Users} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={({ navigation, route }) => ({
              headerShown: true,
              headerTitle: () => {
                return <AppText lbl={"Profile"} />;
              },
            })}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
