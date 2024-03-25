import { Loading, MainScreen, NoData } from "@/components";
import { AppText } from "@/components/texts";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useLayoutEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { appColors } from "utility";
import LoadingModal from "./LoadingModal";
import { useUsers } from "./logic";
import { PropsUsers } from "./RootStack";

const Users = (props: PropsUsers) => {
  const hooks = useUsers(props);
  let { navigation, route } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.headerLeftStyle}>
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate("UserProfile")}
            >
              <MaterialIcons name="account-circle" size={25} color={"black"} />
            </TouchableOpacity>

            <TouchableOpacity onPress={hooks.handleLogout}>
              <AntDesign name="logout" size={20} color={appColors.red} />
            </TouchableOpacity>
          </View>
        );
      },
      headerTitle: () => {
        return <AppText lbl={route.name} />;
      },
      headerShown: true,
    });
  }, [navigation]);

  return (
    <MainScreen rootStyle={styles.rootStyle}>
      {hooks.fields.loading ? (
        <Loading />
      ) : hooks.fields.users.length === 0 ? (
        <NoData />
      ) : (
        <FlatList
          data={hooks.fields.users}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {}}
              style={styles.cardStyle}
            >
              <View style={styles.mainStyle}>
                <View style={styles.avatarStyle}>
                  <Feather name="user" color={appColors.purple} size={30} />
                </View>

                <View>
                  <AppText lbl={item.data()?.name} />
                  <AppText
                    lbl={item.data()?.email}
                    lblStyle={{ color: appColors.grey }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {hooks.fields.showLoadingModal && <LoadingModal />}
    </MainScreen>
  );
};

export default Users;

const styles = StyleSheet.create({
  rootStyle: {
    padding: 20,
  },
  headerLeftStyle: {
    marginRight: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  cardStyle: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: appColors.white,
  },
  mainStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarStyle: {
    width: 50,
    height: 50,
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
