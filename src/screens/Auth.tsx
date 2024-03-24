import { MainScreen } from "@/components";
import { AppButton, LoadingButton } from "@/components/buttons";
import { AppInput } from "@/components/inputs";
import { AppText } from "@/components/texts";
import React from "react";
import { StyleSheet, View } from "react-native";
import { appColors } from "utility";
import { PropsAuth } from "./AuthStack";
import { useAuth } from "./logic";

const Auth = (props: PropsAuth) => {
  const hooks = useAuth(props);

  return (
    <MainScreen rootStyle={styles.container}>
      <AppText lblStyle={styles.titleText} lbl="Welcome!" />

      <View>
        <AppText lbl="Email" />
        <AppInput
          value={hooks.fields.email}
          placeholder="Enter email"
          onChangeText={(value) => hooks.handleInput(value, "email")}
        />
      </View>

      <View style={{ marginVertical: 15 }}>
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
            marginBottom: 15,
            color:
              hooks.fields.msgStatus === "error"
                ? appColors.red
                : appColors.green,
          }}
        />
      )}

      <LoadingButton
        loading={hooks.fields.loading}
        onPress={hooks.handleLoginSignUp}
        btnStyle={styles.loginButtonLabel}
        lbl={hooks.fields.tabName === "login" ? "Login" : "Sign Up"}
      />

      <AppButton
        lbl={
          hooks.fields.tabName === "login"
            ? "Do not have an account? Signup."
            : "Have an account. Login"
        }
        lblStyle={styles.navButtonText}
        onPress={() =>
          hooks.handleTabName(
            hooks.fields.tabName === "login" ? "signUp" : "login"
          )
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
