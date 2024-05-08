import auth from "@react-native-firebase/auth";
import { AsyncStorageClass } from "classes";
import { UserContext } from "context-api";
import { useContext, useEffect, useState } from "react";

export const useRootStack = () => {
  const storage = new AsyncStorageClass();
  const { handleSetUser, user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    checkIsUSerValid();
  }, []);

  // useEffect(() => {
  //   setIsLoading(true);
  //   const unsubscribeAuth = auth().onAuthStateChanged(
  //     async (authenticatedUser) => {
  //       if (authenticatedUser) {
  //         handleSetUser(authenticatedUser);
  //       } // save user info in contextApi
  //       else {
  //         handleSetUser(null);
  //       }

  //       setIsLoading(false);
  //     }
  //   );

  //   // unsubscribe auth listener on unmount
  //   return unsubscribeAuth;
  // }, [user]);

  function checkIsUSerValid() {
    setIsLoading(true);
    storage
      .getData()
      .then(async (value) => {
        if (value) {
          if (Object.keys(value).length !== 0) {
            const { email, password, ts } = value;

            if (parseInt(ts) > +new Date()) {
              // sign in with created user email and password
              await auth()
                .signInWithEmailAndPassword(email, password)
                .then((response) => {
                  handleSetUser(response.user);
                })
                .catch((error) => {});
            }
          }
        } else {
          handleSetUser(null); // no data for user info
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }

  return {
    user,
    isLoading,
  };
};
