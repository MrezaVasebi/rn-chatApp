import auth from "@react-native-firebase/auth";
import { AsyncStorageClass } from "classes";
import { UserContext } from "context-api";
import { useContext } from "react";

export const useUserProfile = () => {
  let currentUser = auth().currentUser;

  const storage = new AsyncStorageClass();
  const { handleSetUser } = useContext(UserContext);

  const handleLogout = async () => {
    await auth()
      .signOut()
      .then((response) => {
        handleSetUser(null); // clear user info from contextApi
        storage.removeValue(); // remove item from storage
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  return { handleLogout, currentUser };
};
