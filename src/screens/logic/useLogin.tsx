import { useState } from "react";

export const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleInput = (value: string, identifier: "email" | "password") => {
    if (identifier === "email") setEmail(value);
    else if (identifier === "password") setPassword(value);
  };

  return {
    handleInput,
    loading,
    email,
    password,
  };
};
