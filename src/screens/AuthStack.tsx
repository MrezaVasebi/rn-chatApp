import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

import { AppText } from "@/components/texts";
import React from "react";
import Auth from "./Auth";
import UserProfile from "./UserProfile";
import Users from "./Users";

export type RootStackParamList = {
  Auth: undefined;
  Users: undefined;
  UserProfile: undefined;
};

export type PropsAuth = NativeStackScreenProps<RootStackParamList, "Auth">;

export type PropsUsers = NativeStackScreenProps<RootStackParamList, "Users">;

export type PropsUserProfile = NativeStackScreenProps<
  RootStackParamList,
  "UserProfile"
>;

const Stack = createStackNavigator<RootStackParamList>();

export default function AuthStack() {
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
      initialRouteName="Auth"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Users" component={Users} />
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
