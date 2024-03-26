import { AppText } from "@/components/texts";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { appColors } from "utility";
import { PropsChatScree } from "./RootStack";

const ChatScreen = (props: PropsChatScree) => {
  const loggedInUser = auth()?.currentUser;

  let { selectedName, selectedUid } = props?.route?.params;
  const [messages, setMessages] = useState<any[]>([]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: ({ children, tintColor }) => {
        return (
          <AppText
            lbl={"Chat Screen"}
            lblStyle={{ color: appColors.orange, fontSize: 25 }}
          />
        );
      },
      headerShown: true,
    });
  }, []);

  const onSend = useCallback(async (messages = []) => {
    // setMessages((previousMessages) =>
    //   GiftedChat.append(previousMessages, messages)
    // );

    const msg: any = messages[0];
    const userMsg = {
      ...msg,
      sentTo: selectedUid,
      createdAt: new Date(),
      sentBy: loggedInUser?.uid,
    };

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, userMsg)
    );

    if (loggedInUser) {
      const chatId =
        selectedUid > loggedInUser?.uid
          ? loggedInUser?.uid + "-" + selectedUid
          : selectedUid + "-" + loggedInUser?.uid;

      await firestore()
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .add({
          ...userMsg,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
    }
  }, []);

  useEffect(() => {
    getAllMessage();
  }, []);

  async function getAllMessage() {
    if (loggedInUser) {
      const chatId =
        selectedUid > loggedInUser.uid
          ? loggedInUser.uid + "-" + selectedUid
          : selectedUid + "-" + loggedInUser.uid;

      const msgResponse = await firestore()
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("createdAt", "desc")
        .get();

      if (msgResponse.size !== 0) {
        const allMsgs = msgResponse.docs.map((docSnap) => {
          return {
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt.toDate(),
          };
        });

        setMessages(allMsgs);
      }
    }
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages as any)}
      user={{
        _id: loggedInUser?.uid as string,
      }}
    />
  );
};

export default ChatScreen;
