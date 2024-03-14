import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { AppText } from "../texts";

const LoadingButton = (
  props: TouchableOpacityProps & {
    lbl: string;
    loading: boolean;
    lblStyle?: object;
    btnStyle?: object;
  }
) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.5}
      style={{ ...styles.btnStyle, ...props.btnStyle }}
    >
      {props.loading ? (
        <ActivityIndicator size={"small"} color={"black"} />
      ) : (
        <AppText lbl={props.lbl} lblStyle={{ ...props.lblStyle }} />
      )}
    </TouchableOpacity>
  );
};

export default LoadingButton;

const styles = StyleSheet.create({
  btnStyle: {},
});
