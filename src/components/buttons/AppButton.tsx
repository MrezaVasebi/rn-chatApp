import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { AppText } from "../texts";

const AppButton = (
  props: TouchableOpacityProps & {
    lbl: string;
    lblStyle?: object;
    btnStyle?: object;
  }
) => {
  return (
    <TouchableOpacity
      style={{ ...styles.btnStyle, ...props.btnStyle }}
      activeOpacity={0.5}
      onPress={props.onPress}
    >
      <AppText lbl={props.lbl} lblStyle={{ ...props.lblStyle }} />
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  btnStyle: {},
});
