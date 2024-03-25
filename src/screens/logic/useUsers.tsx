import auth from "@react-native-firebase/auth";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Firestore } from "classes";
import { useEffect, useState } from "react";
import { PropsUsers } from "../RootStack";

export const useUsers = (props: PropsUsers) => {
  const { navigation, route } = props;

  const loggedInUser = auth().currentUser;
  const firestoreIns = new Firestore();

  const [users, setUsers] = useState<
    FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[]
  >([]);

  const [msg, setMsg] = useState<string>("");
  const [msgStatus, setMsgStatus] = useState<"success" | "error">("error");

  const [loading, setLoading] = useState<boolean>(false);

  const [showLoadingModal, setShowLoadingModal] = useState<boolean>(false);

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
    setShowLoadingModal(true);
    await auth()
      .signOut()
      .then((response) => {
        // utility.logValue("response in logging out: ", response);
        navigation.replace("Login");
      })
      .catch((err) => {
        // utility.logValue("logout error 37: ", err);
      })
      .finally(() => {
        setShowLoadingModal(false);
      });
  };

  const getAllUsers = async () => {
    setLoading(true);
    let users = await firestoreIns.getAllDocsOfCollection("users");

    // do not show the users who has logged in.
    let others = [];
    if (users.length !== 0) {
      for (const iterator of users) {
        if (iterator.id !== loggedInUser?.uid) others.push(iterator);
      }

      setLoading(false);
      setUsers(others);
    }
  };

  let fields = {
    msg,
    users,
    loading,
    msgStatus,
    showLoadingModal,
  };

  return {
    fields,
    handleLogout,
  };
};
