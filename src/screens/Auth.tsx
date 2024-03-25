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
      <AppText
        lblStyle={styles.titleText}
        lbl={hooks.fields.tabName === "login" ? "Login" : "Sign Up"}
      />

      {hooks.fields.tabName === "signUp" && (
        <View style={{ marginTop: 10 }}>
          <AppText lbl="Name" />
          <AppInput
            value={hooks.fields.name}
            placeholder="Enter name"
            onChangeText={(value) => hooks.handleInput(value, "name")}
          />
        </View>
      )}

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
      </View>
    </MainScreen>
  );
};

export default Auth;

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
    width: "25%",
    fontSize: 22,
    borderRadius: 5,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  navButtonText: {
    fontSize: 20,
    marginTop: 15,
  },
});
