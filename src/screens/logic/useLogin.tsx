import { Utility } from "classes";
import { useEffect, useState } from "react";

import auth from "@react-native-firebase/auth";

export const useLogin = () => {
  const utility = new Utility();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (msg.length !== 0) {
      setTimeout(() => {
        setMsg("");
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
    if (!utility.validateObjectField({ email, password })) {
      setMsg("Some input value is wrong.");
      return;
    } else {
      setLoading(true);
      try {
        await auth()
          .signInWithEmailAndPassword(email, password)
          .then((response) => {
            // console.log("User logged in.", response);
          })
          .catch((error: any) => {
            setMsg("User not found.");
          });
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
  };

  let fields = {
    msg,
    email,
    loading,
    password,
  };

  return {
    fields,
    handleInput,
    handleLogin,
  };
};
