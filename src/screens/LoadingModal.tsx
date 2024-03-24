import React from "react";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";

const LoadingModal = () => {
  return (
    <Modal animationType="fade" statusBarTranslucent transparent>
      <View style={styles.mainStyle}>
        <ActivityIndicator size={"large"} color={"white"} />
      </View>
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.5)",
  },
});
