import { MainScreen } from "@/components";
import { LoadingButton } from "@/components/buttons";
import { AppInput } from "@/components/inputs";
import { AppText } from "@/components/texts";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { appColors } from "utility";
import { useSignUp } from "./logic";
import { PropsSignUp } from "./RootStack";

const SignUp = (props: PropsSignUp) => {
  const hooks = useSignUp();

  return (
    <MainScreen rootStyle={styles.rootStyle}>
      <View style={styles.returnStyle}>
        <TouchableOpacity
          style={{ marginRight: 25 }}
          onPress={() => props.navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={25} color={appColors.purple} />
        </TouchableOpacity>

        <AppText lblStyle={styles.titleText} lbl={"Sign Up"} />
      </View>

      <View style={{ marginTop: 10 }}>
        <AppText lbl="Name" />
        <AppInput
          value={hooks.fields.name}
          placeholder="Enter name"
          onChangeText={(value) => hooks.handleInput(value, "name")}
        />
      </View>

      <View style={{ marginVertical: 10 }}>
        <AppText lbl="Email" />
        <AppInput
          value={hooks.fields.email}
          placeholder="Enter email"
          onChangeText={(value) => hooks.handleInput(value, "email")}
        />
      </View>

      <View style={{ marginBottom: 10 }}>
        <AppText lbl="Password" />
        <AppInput
          value={hooks.fields.password}
          secureTextEntry={true}
          placeholder="Enter password"
          onChangeText={(value) => hooks.handleInput(value, "password")}
        />
      </View>

      {hooks.fields.msg.length !== 0 && (
        <AppText
          lbl={hooks.fields.msg}
          lblStyle={{
            marginBottom: 10,
            color:
              hooks.fields.msgStatus === "error"
                ? appColors.red
                : appColors.green,
          }}
        />
      )}

      <View style={{ alignItems: "center" }}>
        <LoadingButton
          lbl={"Signup"}
          onPress={hooks.handleSignUp}
          loading={hooks.fields.loading}
          btnStyle={styles.signUpStyle}
          lblStyle={{ color: appColors.white }}
        />
      </View>
    </MainScreen>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  rootStyle: {
    padding: 20,
  },
  returnStyle: { flexDirection: "row", alignItems: "center" },
  titleText: {
    fontSize: 30,
    marginBottom: 15,
    color: appColors.purple,
  },
  signUpStyle: {
    padding: 10,
    fontSize: 20,
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: appColors.purple,
  },
});
