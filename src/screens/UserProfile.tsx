import { MainScreen } from "@/components";
import { AppText } from "@/components/texts";
import { MaterialIcons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import React, { useLayoutEffect } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { appColors } from "utility";
import { PropsUserProfile } from "./RootStack";

const UserProfile = (props: PropsUserProfile) => {
  let { navigation, route } = props;
  let currentUser = auth().currentUser;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={{}}>
            <TouchableOpacity
              onPress={handleLogout}
              style={{ marginRight: 15 }}
            >
              <MaterialIcons name="logout" size={25} color={appColors.purple} />
            </TouchableOpacity>
          </View>
        );
      },
      headerTitle: () => {
        return <AppText lbl={route.name} />;
      },
      headerShown: true,
    });
  }, [navigation]);

  const handleLogout = async () => {
    await auth()
      .signOut()
      .then((response) => {
        // utility.logValue("response in logging out: ", response);
      })
      .catch((err) => {
        // utility.logValue("logout error 37: ", err);
      })
      .finally(() => {});
  };

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
