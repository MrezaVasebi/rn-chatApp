import React from "react";
import { StatusBar, StyleSheet, View, ViewProps } from "react-native";

const MainScreen = (props: ViewProps & { rootStyle?: object }) => {
  return (
    <View style={{ ...styles.rootStyle, ...props.rootStyle }}>
      {props.children}
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: StatusBar.currentHeight,
  },
});
