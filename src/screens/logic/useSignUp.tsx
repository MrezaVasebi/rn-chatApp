import auth from "@react-native-firebase/auth";
import { Firestore, Utility } from "classes";
import { useEffect, useState } from "react";

export const useSignUp = () => {
  const utility = new Utility();
  const firestoreIns = new Firestore();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [msg, setMsg] = useState<string>("");

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
    else if (identifier === "name") setName(value);
  };

  const handleSignUp = async () => {
    if (!utility.validateObjectField({ name, email, password })) {
      setMsg("Some input value is wrong.");
      return;
    } else {
      setLoading(true);
      try {
        await auth()
          // create user with email and password
          .createUserWithEmailAndPassword(email, password)
          .then(async (response) => {
            const user = response.user;

            await firestoreIns
              // create collection with specific doc id
              .onCreateCollectionWithDocId("users", user.uid, {
                name: name,
                email: user.email,
                userId: user.uid,
              })
              .then((res) => {
                setMsg("User account created.");
              })
              .catch((err) => {
                setMsg("User account not created!");
              });
          })
          .catch((error) => {
            if (error.code === "auth/email-already-in-use")
              setMsg("That email address is already in use!");

            if (error.code === "auth/invalid-email")
              setMsg("That email address is invalid!");
          });
      } catch (error) {
        console.log("error in signup:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  let fields = {
    msg,
    name,
    email,
    loading,
    password,
  };

  return {
    fields,
    handleInput,
    handleSignUp,
  };
};
