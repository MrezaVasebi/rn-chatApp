import { MainScreen } from "@/components";
import { AppText } from "@/components/texts";
import auth from "@react-native-firebase/auth";
import React from "react";
import { View } from "react-native";
import { PropsUserProfile } from "./RootStack";

const UserProfile = (props: PropsUserProfile) => {
  let { navigation, route } = props;
  let currentUser = auth().currentUser;

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
