import { FlatList, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import useRepository from "../hooks/useRepository";
import { useEffect } from "react";
import { useParams } from "react-router-native";
import SingleRepository from "./SingleRepository ";
const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
});

//Ahora este componente no es muy puro.
export const RepositoryListContainer = ({ repositories }) => {
  const { getRepository, repository } = useRepository();
  const { id } = useParams();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  useEffect(() => {
    if (id) {
      getRepository(id);
    }
  }, [id]);

  return id ? (
    <SingleRepository repository={repository} isViewItem={id !== undefined} />
  ) : (
    <FlatList
      style={style.container}
      contentContainerStyle={{
        display: "flex",
        flex: 1,
        justifyContent: "space-between",
      }}
      data={repositoryNodes}
      renderItem={({ item }) => (
        <RepositoryItem repository={item} isViewItem={id !== undefined} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

//una tecnica para volver un componente pure
const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
