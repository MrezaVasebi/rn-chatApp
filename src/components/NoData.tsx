import React from "react";
import { StyleSheet, View } from "react-native";
import { appColors } from "utility";
import { AppText } from "./texts";

const NoData = ({ rootStyle }: { rootStyle?: object }) => {
  return (
    <View style={{ ...styles.rootStye, ...rootStyle }}>
      <AppText lbl="No data" lblStyle={{ color: appColors.grey }} />
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  rootStye: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
