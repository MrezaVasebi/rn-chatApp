import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { appColors } from "utility";

const Loading = ({ rootStyle }: { rootStyle?: object }) => {
  return (
    <View style={{ ...styles.rootStyle, ...rootStyle }}>
      <ActivityIndicator color={appColors.purple} size={"large"} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
