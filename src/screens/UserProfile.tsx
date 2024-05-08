import { MainScreen } from "@/components";
import { AppText } from "@/components/texts";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useLayoutEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { appColors } from "utility";
import { PropsUserProfile } from "./RootStack";
import { useUserProfile } from "./logic";

const UserProfile = (props: PropsUserProfile) => {
  let { navigation, route } = props;
  const { handleLogout, currentUser } = useUserProfile();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleLogout}
            style={{ marginRight: 15 }}
          >
            <MaterialIcons name="logout" size={25} color={appColors.purple} />
          </TouchableOpacity>
        );
      },
      headerTitle: () => {
        return <AppText lbl={route.name} />;
      },
      headerShown: true,
    });
  }, [navigation]);

  const handleUserValues = (lbl: string, value: any) => {
    return (
      <View style={{ marginBottom: 10 }}>
        <AppText lbl={`${lbl}:`} lblStyle={{ color: "grey" }} />
        <AppText lbl={value ?? ""} lblStyle={{ marginTop: 5 }} />
      </View>
    );
  };

  return (
    <MainScreen rootStyle={{ padding: 10 }}>
      {handleUserValues("Email", currentUser?.email)}
      {handleUserValues("uid", currentUser?.uid)}
      {handleUserValues(
        "Creation time",
        currentUser?.metadata.creationTime &&
          new Date(currentUser?.metadata?.creationTime).toDateString()
      )}
      {handleUserValues(
        "Last sign in time",
        currentUser?.metadata?.lastSignInTime &&
          new Date(currentUser.metadata.lastSignInTime).toDateString()
      )}
    </MainScreen>
  );
};

export default UserProfile;
