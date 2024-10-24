import { FlatList } from "react-native";
import ReviewItem from "./ReviewItem";
import useUserLogged from "../../hooks/useUserLogged";

const Reviews = () => {
  const { user, refetch, fetchMore } = useUserLogged({
    includeReviews: true,
    first: 2,
  });

  if (!user) {
    return null;
  }

  const reviews = user ? user.reviews.edges.map((e) => e.node) : [];
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} viewReviews={true} getData={refetch} />
      )}
      contentContainerStyle={{
        display: "flex",
        gap: 10,
      }}
      keyExtractor={({ id }) => id}
      onEndReached={() => {
        fetchMore();
      }}
      onEndReachedThreshold={0.5}
      scrollEnabled={true}
    />
  );
};

export default Reviews;
