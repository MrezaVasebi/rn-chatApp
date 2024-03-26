import { Utility } from "classes";
import { useContext, useEffect, useState } from "react";
import { PropsLogin } from "../RootStack";

import auth from "@react-native-firebase/auth";
import { UserContext } from "context-api";

export const useLogin = (props: PropsLogin) => {
  let { navigation, route } = props;

  const utility = new Utility();
  const userCtx = useContext(UserContext);

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

  const handleLogin = async () => {
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
      try {
        await auth()
          .signInWithEmailAndPassword(email, password)
          .then((response) => {
            handleMsgAndStatus("User logged in.", "success");

            clearFieldValue();

            // set user in context
            userCtx.handleSetUser(response.user);

            setTimeout(() => {
              navigation.navigate("Users");
            }, 1500);
          })
          .catch((error: any) => {
            handleMsgAndStatus("User not found.");
          });
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
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
    handleLogin,
  };
};
