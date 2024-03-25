import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

import { AppText } from "@/components/texts";
import React from "react";
import ChatScreen from "./ChatScreen";
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
  // const [isUserExisted, setIsUserExisted] = useState<boolean>(false);

  // useEffect(() => {
  //   const userCheck = auth().onAuthStateChanged((userExist) => {
  //     if (userExist) return true;
  //     else return false;
  //   });

  //   return userCheck();
  // }, []);

  // if (!isUserExisted)
  //   return <ActivityIndicator color={appColors.purple} size={"large"} />;

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
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

      <Stack.Screen name="Users" component={Users} />

      <Stack.Screen name="ChatScreen" component={ChatScreen} />

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
