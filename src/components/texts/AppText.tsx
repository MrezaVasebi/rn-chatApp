import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

const AppText = (props: TextProps & { lbl: string; lblStyle?: {} }) => {
  return (
    <Text style={{ ...styles.lblStyle, ...props.lblStyle }}>{props.lbl}</Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  lblStyle: {
    fontFamily: "myFont",
  },
});