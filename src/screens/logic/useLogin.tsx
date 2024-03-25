import { Utility } from "classes";
import { useEffect, useState } from "react";
import { PropsLogin } from "../RootStack";

import auth from "@react-native-firebase/auth";

export const useLogin = (props: PropsLogin) => {
  let { navigation, route } = props;

  const utility = new Utility();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [msg, setMsg] = useState<string>("");
  const [msgStatus, setMsgStatus] = useState<"error" | "success">("error");

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
  };

  const handleLoginSignUp = () => {
    let isValid = true;
    let fields = { email, password };
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
      handleLogin().then((res) => {
        if (res) {
          handleMsgAndStatus("User logged in.", "success");

          clearFieldValue();

          setLoading(false);

          setTimeout(() => {
            navigation.navigate("Users");
          }, 1500);
        } else {
          setLoading(false);
          handleMsgAndStatus("User not found.");
        }
      });
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

  function clearFieldValue() {
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

  let fields = {
    msg,
    email,
    loading,
    password,
    msgStatus,
  };

  return {
    fields,
    handleInput,
    handleLoginSignUp,
  };
};
