import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";

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
        <Link to='/form'>
          <Text
            color={"primary"}
            fontWeight={"bold"}
            style={{
              color: "white",
            }}
          >
            form
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
