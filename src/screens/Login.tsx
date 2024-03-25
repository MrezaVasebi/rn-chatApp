import { MainScreen } from "@/components";
import { AppButton, LoadingButton } from "@/components/buttons";
import { AppInput } from "@/components/inputs";
import { AppText } from "@/components/texts";
import React from "react";
import { StyleSheet, View } from "react-native";
import { appColors } from "utility";
import { useLogin } from "./logic";
import { PropsLogin } from "./RootStack";

const Login = (props: PropsLogin) => {
  const hooks = useLogin(props);

  return (
    <MainScreen rootStyle={styles.container}>
      <AppText lblStyle={styles.titleText} lbl={"Login"} />

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

      <View style={{ alignItems: "center", marginTop: 10 }}>
        <LoadingButton
          lbl={"Login"}
          loading={hooks.fields.loading}
          onPress={hooks.handleLoginSignUp}
          btnStyle={styles.loginButtonLabel}
          lblStyle={{ color: appColors.white }}
        />

        <AppText lbl="Or" lblStyle={{ color: appColors.grey, marginTop: 20 }} />

        <AppButton
          lbl={"Sign Up"}
          lblStyle={styles.btnText}
          onPress={() => props.navigation.navigate("SignUp")}
        />
      </View>
    </MainScreen>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 45,
    marginBottom: 15,
    color: appColors.purple,
  },
  loginButtonLabel: {
    height: 45,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: appColors.purple,
  },
  btnText: {
    fontSize: 20,
    marginTop: 15,
    color: appColors.purple,
  },
});
