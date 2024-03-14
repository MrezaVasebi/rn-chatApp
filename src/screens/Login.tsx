import { MainScreen } from "@/components";
import { AppButton, LoadingButton } from "@/components/buttons";
import { AppInput } from "@/components/inputs";
import { AppText } from "@/components/texts";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useLogin } from "./logic";

const Login = (navigation: any) => {
  const hooks = useLogin();

  return (
    <MainScreen rootStyle={styles.container}>
      <AppText lblStyle={styles.titleText} lbl="Welcome!" />

      <View>
        <AppText lbl="Email" />
        <AppInput
          value={hooks.email}
          placeholder="Enter email"
          onChangeText={(value) => hooks.handleInput(value, "email")}
        />
      </View>

      <View style={{ marginTop: 10 }}>
        <AppText lbl="Password" />
        <AppInput
          value={hooks.password}
          secureTextEntry={true}
          placeholder="Enter password"
          onChangeText={(value) => hooks.handleInput(value, "password")}
        />
      </View>

      <LoadingButton
        lbl="Login"
        loading={hooks.loading}
        btnStyle={styles.loginButtonLabel}
        onPress={() => {}}
      />

      <AppButton
        lbl="Sign up here"
        lblStyle={styles.navButtonText}
        onPress={() => {}}
      />
    </MainScreen>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    marginBottom: 10,
  },
  loginButtonLabel: {
    height: 45,
    width: "25%",
    fontSize: 22,
    borderRadius: 10,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  navButtonText: {
    fontSize: 16,
    marginTop: 15,
  },
});
