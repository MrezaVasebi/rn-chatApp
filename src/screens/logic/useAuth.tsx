import { Utility } from "classes";
import { useEffect, useState } from "react";

export const useAuth = (navigation: any) => {
  const utility = new Utility();

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
        if (tabName === "login") handleLogin();
        else if (tabName === "signUp") handleSignUp();
      } else {
        setMsg("Error in password.");
      }
    } else {
      setMsg("Error in email address.");
    }
  };

  const handleLogin = () => {
    try {
      setLoading(true);
    } catch (error) {
      utility.logValue("error 47: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    try {
      setLoading(true);
    } catch (error) {
      utility.logValue("error: 57", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabName = (value: "login" | "signUp") => {
    setTabName(value);
  };

  return {
    tabName,
    handleTabName,
    handleInput,
    handleLoginSignUp,
    loading,
    msg,
    msgStatus,
    email,
    password,
  };
};
