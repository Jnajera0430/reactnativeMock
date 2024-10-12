import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";
import useUserLogged from "../hooks/useUserLogged";
import { TouchableOpacity } from "react-native";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingLeft: 10,
    backgroundColor: "#24292e",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    width: "auto",
  },
  button: {},
});

const AppBar = () => {
  const { user } = useUserLogged();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handleLogout = async () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ flexGrow: 1, display: "flex", gap: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        <Link to='/'>
          <Text
            color={"primary"}
            fontWeight={"bold"}
            style={{
              color: "white",
            }}
          >
            Repositories
          </Text>
        </Link>
        {!user ? (
          <Link to='/signin'>
            <Text
              color={"primary"}
              fontWeight={"bold"}
              style={{
                color: "white",
              }}
            >
              Sign in
            </Text>
          </Link>
        ) : (
          <TouchableOpacity onPress={handleLogout}>
            <Text
              color={"primary"}
              fontWeight={"bold"}
              style={{
                color: "white",
              }}
            >
              Log out
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
