import auth from "@react-native-firebase/auth";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Firestore, Utility } from "classes";
import { UserContext } from "context-api";
import { useContext, useEffect, useState } from "react";

export const useUsers = () => {
  const utility = new Utility();
  const userCtx = useContext(UserContext);

  const firestoreIns = new Firestore();
  const loggedInUser = auth().currentUser;

  const [users, setUsers] = useState<
    FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[]
  >([]);

  const [msg, setMsg] = useState<string>("");
  const [msgStatus, setMsgStatus] = useState<"success" | "error">("error");

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (msgStatus === "success") {
      setTimeout(() => {
        setMsg("");
        setMsgStatus("error");
      }, 1500);
    }
  }, [msg]);

  const handleLogout = async () => {
    await auth()
      .signOut()
      .then((response) => {
        // utility.logValue("response in logging out: ", response);
        // navigation.replace("Login");
        // set 'null' to user in context
        // userCtx.handleSetUser(null);
      })
      .catch((err) => {
        utility.logValue("logout error:", err);
      })
      .finally(() => {});
  };

  const getAllUsers = async () => {
    setLoading(true);
    try {
      let users = await firestoreIns.getAllDocsOfCollection("users");

      // do not show the users who has logged in.
      let others = [];
      if (users.length !== 0) {
        for (const iterator of users) {
          if (iterator.id !== loggedInUser?.uid) others.push(iterator);
        }
        setUsers(others);
      }
    } catch (error) {
      console.log("error in getting all users: ", error);
    } finally {
      setLoading(false);
    }
  };

  let fields = {
    msg,
    users,
    loading,
    msgStatus,
  };

  return {
    fields,
    handleLogout,
  };
};
