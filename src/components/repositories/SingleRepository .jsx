import { FlatList } from "react-native";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "../reviews/ReviewItem";

const RepositoryInfo = ({ repository, isViewItem }) => {
  return <RepositoryItem isViewItem={isViewItem} repository={repository} />;
};

const SingleRepository = ({ repository, isViewItem, onEndReach }) => {
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
        gap: 10,
      }}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryInfo repository={repository} isViewItem={isViewItem} />
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
