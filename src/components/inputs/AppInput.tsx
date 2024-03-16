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
    fontSize: 16,
    marginTop: 10,
    paddingLeft: 10,
    borderWidth: 0.5,
    marginBottom: 10,
    borderRadius: 10,
    width: width / 1.5,
    height: height / 20,
    fontFamily: "myFont",
  },
});
