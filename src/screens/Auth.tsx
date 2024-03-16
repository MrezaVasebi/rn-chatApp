import { MainScreen } from "@/components";
import { AppButton, LoadingButton } from "@/components/buttons";
import { AppInput } from "@/components/inputs";
import { AppText } from "@/components/texts";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useAuth } from "./logic";

const Auth = (navigation: any) => {
  const hooks = useAuth(navigation);

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

      <View style={{ marginVertical: 15 }}>
        <AppText lbl="Password" />
        <AppInput
          value={hooks.password}
          secureTextEntry={true}
          placeholder="Enter password"
          onChangeText={(value) => hooks.handleInput(value, "password")}
        />
      </View>

      {hooks.msg.length !== 0 && (
        <AppText
          lbl={hooks.msg}
          lblStyle={{
            marginBottom: 15,
            color: hooks.msgStatus === "error" ? "red" : "green",
          }}
        />
      )}

      <LoadingButton
        loading={hooks.loading}
        onPress={hooks.handleLoginSignUp}
        btnStyle={styles.loginButtonLabel}
        lbl={hooks.tabName === "login" ? "Login" : "Sign Up"}
      />

      <AppButton
        lbl={
          hooks.tabName === "login"
            ? "Do not have an account? Signup."
            : "Have an account. Login"
        }
        lblStyle={styles.navButtonText}
        onPress={() =>
          hooks.handleTabName(hooks.tabName === "login" ? "signUp" : "login")
        }
      />
    </MainScreen>
  );
};

export default Auth;

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
    fontSize: 20,
    marginTop: 15,
  },
});
