import {
  Dimensions,
  StyleSheet,
  TextInput,
  TextInputProps,
} from "react-native";

let { height, width } = Dimensions.get("window");

const AppInput = (props: TextInputProps & { inputStyle?: object }) => {
  return (
    <TextInput
      value={props.value}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      secureTextEntry={props.secureTextEntry}
      style={{ ...styles.inputStyle, ...props.inputStyle }}
    />
  );
};

export default AppInput;

const styles = StyleSheet.create({
  inputStyle: {
    height: 45,
    fontSize: 16,
    marginTop: 8,
    paddingLeft: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    fontFamily: "myFont",
  },
});
