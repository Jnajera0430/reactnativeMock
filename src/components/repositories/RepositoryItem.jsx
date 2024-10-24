import React from "react";
import { Image, Linking, Pressable, StyleSheet, View } from "react-native";
import Text from "../utils/Text";
import { TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 10,
    backgroundColor: "white",
    padding: 10,
  },
  containerSection1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    gap: 15,
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

export const convertDataNum = (data) => {
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
      const firtsNumber = numberSplit.splice(0, rollbackIndexCounter).join("");

      const decimalNumber = numberSplit[0];

      formattedData = `${firtsNumber}${formattedData}.${decimalNumber}k`;
      break;
    }

    counterIndex += 1;
  }

  return formattedData;
};
const RepositoryItem = ({ repository, isViewItem }) => {
  const navigate = useNavigate();
  if (!repository) {
    return null;
  }
  return (
    <Pressable
      style={styles.separator}
      testID='repositoryItem'
      onPress={() => {
        navigate(`/${repository.id}`);
      }}
    >
      <View style={styles.containerSection1}>
        <View style={styles.containerImage}>
          <Image
            style={styles.tinyLogo}
            source={{ uri: repository.ownerAvatarUrl }}
          />
        </View>
        <View style={styles.containerInfoRespository}>
          <View
            style={{
              width: "95%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text fontWeight={"bold"} fontSize={"subheading"}>
                {repository.fullName}
              </Text>
            </View>
            <View>
              {!isViewItem ? (
                <Text color={"primary"}>View</Text>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    navigate("/");
                  }}
                >
                  <Text color={"primary"}>repositories</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
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
      {isViewItem && (
        <TouchableOpacity
          style={{
            width: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            backgroundColor: "#0366d6",
            borderRadius: 5,
          }}
          onPress={() => Linking.openURL(repository.url)}
        >
          <Text
            fontWeight={"bold"}
            style={{
              color: "white",
            }}
          >
            Open in github
          </Text>
        </TouchableOpacity>
      )}
    </Pressable>
  );
};

export default RepositoryItem;
