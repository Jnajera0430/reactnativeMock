import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Text from "./utils/Text";
import { Link, useNavigate } from "react-router-native";
import useUserLogged from "../hooks/useUserLogged";
import { TouchableOpacity } from "react-native";
import useAuthStorage from "../hooks/useAuthStorage";

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
  const { user } = useUserLogged({ includeReviews: false });
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const handleLogout = async () => {
    authStorage.removeAccessToken();
    navigate("/signin");
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
          <>
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

            <Link to='/signup'>
              <Text
                color={"primary"}
                fontWeight={"bold"}
                style={{
                  color: "white",
                }}
              >
                Sign up
              </Text>
            </Link>
          </>
        ) : (
          <>
            <Link to='/createreview'>
              <Text
                color={"primary"}
                fontWeight={"bold"}
                style={{
                  color: "white",
                }}
              >
                Create a review
              </Text>
            </Link>
            <Link to='/reviews'>
              <Text
                color={"primary"}
                fontWeight={"bold"}
                style={{
                  color: "white",
                }}
              >
                My reviews
              </Text>
            </Link>
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
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
