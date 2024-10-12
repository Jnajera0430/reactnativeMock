import { FlatList, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
});

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();
  if (loading) {
    return null;
  }
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      style={style.container}
      contentContainerStyle={{
        display: "flex",
        flex: 1,
        justifyContent: "space-between",
      }}
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
