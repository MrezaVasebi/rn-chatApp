import { Utility } from "classes";
import { useEffect, useState } from "react";
import { PropsAuth } from "../AuthStack";

import auth from "@react-native-firebase/auth";

export const useAuth = (props: PropsAuth) => {
  const utility = new Utility();
  let { navigation, route } = props;

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

  const handleInput = (value: string, identifier: "email" | "password") => {
    if (identifier === "email") setEmail(value);
    else if (identifier === "password") setPassword(value);
  };

  const handleLoginSignUp = () => {
    if (utility.validateFields(email)) {
      if (utility.validateFields(password)) {
        if (tabName === "login") {
          setLoading(true);
          handleLogin().then((res) => {
            if (res) {
              setMsgStatus("success");
              setMsg("User logged in.");

              setEmail("");
              setPassword("");

              setLoading(false);

              setTimeout(() => {
                navigation.navigate("Groups");
              }, 1500);
            } else {
              setLoading(false);
              setMsg("User not found.");
            }
          });
        } else if (tabName === "signUp") {
          setLoading(true);
          handleSignUp().then((response) => {
            if (response.status) {
              setMsgStatus("success");
              setMsg(response.msg);

              setEmail("");
              setPassword("");

              setLoading(false);

              setTimeout(() => {
                navigation.navigate("Groups");
              }, 1500);
            } else {
              setLoading(false);

              if (response.msg === "auth/email-already-in-use") {
                setMsg("That email address is already in use!");
              }

              if (response.msg === "auth/invalid-email") {
                setMsg("That email address is invalid!");
              }
            }
          });
        }
      } else {
        setMsg("Error in password.");
      }
    } else {
      setMsg("Error in email address.");
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
        .catch((error: any) => {
          status = false;
        });
    } catch (error) {
      status = false;
    }

    return status;
  };

  const handleSignUp = async (): Promise<{
    status: boolean;
    msg: string;
  }> => {
    let errMsg: string = "";
    let status: boolean = false;
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          // console.log({ response });
          status = true;
          errMsg = "User account created & signed in!";
        })
        .catch((error) => {
          errMsg = error.code;
        });
    } catch (error) {
      errMsg = "Error in creating user";
    }

    return { status, msg: errMsg };
  };

  const handleTabName = (value: "login" | "signUp") => {
    setTabName(value);
  };

  let fields = {
    msg,
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
