import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 10,
    backgroundColor: "white",
  },
  containerSection1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    gap: 15,
    paddingTop: 10,
  },
  containerImage: {
    flexGrow: 0,
    height: "auto",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  containerInfoRespository: {
    flexGrow: 1,
    width: "80%",
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  //
  containerSection2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 10,
  },
  info: {
    padding: 10,
    alignItems: "center",
  },
});

const RepositoryItem = ({ repository }) => {
  const convertDataNum = (data) => {
    if (isNaN(data)) {
      return null;
    }

    const numberSplit = data.toString().split("");

    if (numberSplit.length < 4) {
      return data;
    }

    let rollbackIndexCounter = numberSplit.length;
    let counterIndex = 1;
    let formattedData = "";
    while (rollbackIndexCounter > 0) {
      rollbackIndexCounter -= 1;

      if (counterIndex === 3) {
        const firtsNumber = numberSplit
          .splice(0, rollbackIndexCounter)
          .join("");

        const decimalNumber = numberSplit[0];

        formattedData = `${firtsNumber}${formattedData}.${decimalNumber}k`;
        break;
      }

      counterIndex += 1;
    }

    return formattedData;
  };
  return (
    <View style={styles.separator}>
      <View style={styles.containerSection1}>
        <View style={styles.containerImage}>
          <Image
            style={styles.tinyLogo}
            source={{ uri: repository.ownerAvatarUrl }}
          />
        </View>
        <View style={styles.containerInfoRespository}>
          <Text fontWeight={"bold"} fontSize={"subheading"}>
            {repository.fullName}
          </Text>
          <Text color='textSecondary'>{repository.description}</Text>
          <Text
            style={{
              padding: 5,
              backgroundColor: "#0366d6",
              color: "white",
              borderRadius: 5,
              alignSelf: "flex-start",
            }}
          >
            {repository.language}
          </Text>
        </View>
      </View>
      <View style={styles.containerSection2}>
        <View style={styles.info}>
          <Text fontWeight={"bold"}>
            {convertDataNum(repository.stargazersCount)}
          </Text>
          <Text>Start</Text>
        </View>
        <View style={styles.info}>
          <Text fontWeight={"bold"}>
            {convertDataNum(repository.forksCount)}
          </Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.info}>
          <Text fontWeight={"bold"}>
            {convertDataNum(repository.reviewCount)}
          </Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.info}>
          <Text fontWeight={"bold"}>
            {convertDataNum(repository.ratingAverage)}
          </Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
