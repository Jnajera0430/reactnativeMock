import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import { convertDataNum } from "./RepositoryItem";
import theme from "../theme";
const styles = StyleSheet.create({
  separator: {
    display: "flex",
    flexDirection: "column",
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
  containerReview: {
    padding: 5,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  reviewRating: {
    padding: 10,
    borderStyle: "solid",
    borderColor: theme.colors.primary,
    borderWidth: 2,
    height: 50,
    width: 50,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});

const transforDate = (date) => {
  if (!date) {
    return null;
  }
  const dateToTransfor = new Date(date);
  const day =
    dateToTransfor.getDay() > 9
      ? `${dateToTransfor.getDay()}`
      : `0${dateToTransfor.getDay()}`;
  const month =
    dateToTransfor.getMonth() > 9
      ? `${dateToTransfor.getMonth()}`
      : `0${dateToTransfor.getMonth()}`;
  return `${day}.${month}.${dateToTransfor.getFullYear()}`;
};
const RepositoryInfo = ({ repository, isViewItem }) => {
  const navigate = useNavigate();

  return (
    <View
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
                <Text color={"primary"}>See</Text>
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
    </View>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.containerReview}>
      <View>
        <View style={styles.reviewRating}>
          <Text color={"primary"}>{review.rating}</Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          flex: 1,
        }}
      >
        <View>
          <View>
            <Text fontWeight={"bold"} fontSize={"subheading"}>
              {review.user.username}
            </Text>
          </View>
          <View>
            <Text color={"textSecondary"}>
              {transforDate(review.createdAt)}
            </Text>
          </View>
        </View>
        <View>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};
const SingleRepository = ({ repository, isViewItem }) => {
  if (!repository) {
    return null;
  }
  const reviews = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      contentContainerStyle={{
        display: "flex",
        flex: 1,
        gap: 10,
      }}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryInfo repository={repository} isViewItem={isViewItem} />
      )}
    />
  );
};

export default SingleRepository;
