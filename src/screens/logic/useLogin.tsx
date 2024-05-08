import { AsyncStorageClass, Utility } from "classes";
import { useContext, useEffect, useState } from "react";

import auth from "@react-native-firebase/auth";
import { UserContext } from "context-api";

export const useLogin = () => {
  const utility = new Utility();
  const storage = new AsyncStorageClass();
  const { handleSetUser } = useContext(UserContext);

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
          // sign in with created user email and password
          .signInWithEmailAndPassword(email, password)
          .then((response) => {
            handleSetUser(response.user); // save user info in contextApi

            // ts for after one hour
            const ts: number = new Date().getTime() + 1 * 60 * 60 * 1000;

            storage.storeData({
              email,
              password,
              ts,
            });
          })
          .catch((error: any) => {
            setMsg("User not found.");
          });
      } catch (error) {
        console.log("error in login: ", error);
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
