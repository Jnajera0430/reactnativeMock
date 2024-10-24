import { Alert, StyleSheet, View } from "react-native";
import Text from "../utils/Text";
import theme from "../../theme";
import { TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../../hooks/useDeleteReview";

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
  containerReviewInfo: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  container: {
    backgroundColor: "white",
    display: "flex",
    padding: 15,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
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
  containerButton: {
    paddingVertical: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    width: "50%",
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

const ReviewItem = ({ review, viewReviews = false, getData }) => {
  const { deleteReview } = useDeleteReview();
  const navigate = useNavigate();
  const handleDeleteReview = () => {
    Alert.alert("Delete review", "Are you sure want to delete this?", [
      { text: "cancel" },
      {
        text: "delete",
        onPress: async () => {
          const result = await deleteReview(review.id);
          if (result) {
            getData({ includeReviews: true });
          }
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerReviewInfo}>
        <View>
          <View style={styles.reviewRating}>
            <Text color={"primary"} fontWeight={"bold"}>
              {review.rating}
            </Text>
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
                {viewReviews
                  ? review.repository.fullName
                  : review.user.username}
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
      {viewReviews && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <TouchableOpacity
            style={[styles.containerButton]}
            onPress={() => navigate(`/${review.repository.id}`)}
          >
            <Text fontWeight={"bold"} style={{ color: "white" }}>
              View repository
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.containerButton,
              { backgroundColor: theme.colors.colorError },
            ]}
            onPress={handleDeleteReview}
          >
            <Text fontWeight={"bold"} style={{ color: "white" }}>
              Delete repository
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
