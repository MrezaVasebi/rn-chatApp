import { Firestore, Utility } from "classes";
import { useEffect, useState } from "react";
import { PropsAuth } from "../AuthStack";

import auth from "@react-native-firebase/auth";

export const useAuth = (props: PropsAuth) => {
  let { navigation, route } = props;

  const utility = new Utility();
  const firestoreIns = new Firestore();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [msg, setMsg] = useState<string>("");
  const [msgStatus, setMsgStatus] = useState<"error" | "success">("error");

  const [tabName, setTabName] = useState<"login" | "signUp">("login");

  useEffect(() => {
    if (msg.length !== 0) {
      setTimeout(() => {
        setMsg("");
        setMsgStatus("error");
      }, 1500);
    }
  }, [msg]);

  const handleInput = (
    value: string,
    identifier: "email" | "password" | "name"
  ) => {
    if (identifier === "email") setEmail(value);
    else if (identifier === "password") setPassword(value);
    else if (identifier === "name") setName(value);
  };

  const handleLoginSignUp = () => {
    let isValid = true;
    let fields = { ...(tabName === "signUp" && { name }), email, password };
    for (const key in fields) {
      if (!utility.validateFields(fields[key as keyof typeof fields])) {
        isValid = false;
      }

      if (!isValid) break;
    }

    if (!isValid) {
      handleMsgAndStatus("Some input value is wrong.");
      return;
    } else {
      setLoading(true);
      if (tabName === "login") {
        handleLogin().then((res) => {
          if (res) {
            handleMsgAndStatus("User logged in.", "success");

            clearFieldValue();

            setLoading(false);

            handleNavigation();
          } else {
            setLoading(false);
            handleMsgAndStatus("User not found.");
          }
        });
      } else if (tabName === "signUp") {
        handleSignUp().then((response) => {
          if (response.status) {
            handleMsgAndStatus(response.msg, "success");

            clearFieldValue();

            setLoading(false);

            handleNavigation();
          } else {
            setLoading(false);

            if (response.msg === "auth/email-already-in-use")
              handleMsgAndStatus("That email address is already in use!");

            if (response.msg === "auth/invalid-email")
              handleMsgAndStatus("That email address is invalid!");
          }
        });
      }
    }
  };

  const handleLogin = async (): Promise<boolean> => {
    let status: boolean = false;
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          status = true;
        })
        .catch((error: any) => {});
    } catch (error) {}

    return status;
  };

  const handleSignUp = async (): Promise<{
    status: boolean;
    msg: string;
  }> => {
    let result: { msg: string; status: boolean } = {
      msg: "",
      status: false,
    };
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (response) => {
          // console.log({ response });
          const user = response.user;
          await firestoreIns
            .onCreateCollectionWithDocId("users", user.uid, {
              name: name,
              email: user.email,
              userId: user.uid,
            })
            .then((response) => {
              if (response.status) {
                result = {
                  msg: "User account created & signed in!",
                  status: true,
                };
              } else {
                result = {
                  msg: "User account not created!",
                  status: false,
                };
              }
            });
        })
        .catch((error) => {
          result = {
            msg: error.code,
            status: false,
          };
        });
    } catch (error) {
      result = {
        status: false,
        msg: "Error in creating user",
      };
    }

    return result;
  };

  const handleTabName = (value: "login" | "signUp") => {
    setTabName(value);
    clearFieldValue();
  };

  function clearFieldValue() {
    setName("");
    setEmail("");
    setPassword("");
  }

  function handleMsgAndStatus(
    msg: string,
    status: "error" | "success" = "error"
  ) {
    setMsg(msg);
    setMsgStatus(status);
  }

  function handleNavigation() {
    setTimeout(() => {
      navigation.navigate("Groups");
    }, 1500);
  }

  let fields = {
    msg,
    name,
    email,
    tabName,
    loading,
    password,
    msgStatus,
  };

  return {
    fields,
    handleTabName,
    handleInput,
    handleLoginSignUp,
  };
};
